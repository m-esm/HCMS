using HCMS.Business;
using HCMS.Dynamics.Forms;
using HCMS.Dynamics.Forms.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using MoreLinq;
using HCMS.Data.Identity;
using HCMS.Security.Infrastructer;
using System.IO;
using HCMS.Dynamics.Data;
using HCMS.Business.Auth;
using HCMS.Dynamics.Localization;
namespace HCMS.Web.Areas.Manage.Controllers
{
    [Authorize]
    public class DataController : Controller
    {

        GenericRepository<Form> FormsDB = new GenericRepository<Form>();
        GenericRepository<FormFieldValue> ValuesDB = new GenericRepository<FormFieldValue>();

        #region Written For Everyone

        public JsonResult YesNo(string yes = "Yes", string no = "No")
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();

            dic.Add("true", yes);
            dic.Add("false", no);

            return Json(dic.Select(p => new
            {
                key = p.Key,
                value = p.Value
            }), JsonRequestBehavior.AllowGet);

        }

        /// <param name="formID">Dynamic Form ID</param>
        /// <param name="label">Could be Sum of Field Names EX : "Name+Description" Or Just "Name"</param>
        /// <param name="spliter">Spliter Which Split row values like "name : description" in output when param value is " : " </param>
        /// <returns>Json object of dynamicDB Rows with Customized Value and standard Key(RowId)</returns>
        public JsonResult GetDynamicsRows(int formID, int? CultureId = null, string label = "name", string spliter = " ")
        {

            Form form = FormsDB.Find(formID);
            string[] LabelsToShow = label.Split("*".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);

            var Rows = DDB.GetTable(form.Section.Name, form.Name, CultureId).DRows;

            Dictionary<int, string> model = new Dictionary<int, string>();

            foreach (var row in Rows.DistinctBy(p => p.RowID))
            {

                string value = "";
                foreach (string fieldName in LabelsToShow)
                    if (form.Fields.Any(p => p.Name.Equals(fieldName, StringComparison.CurrentCultureIgnoreCase)))
                        value += spliter + row.GetValue(fieldName).Value;

                if (value.StartsWith(spliter))
                    value = value.Remove(0, spliter.Length);

                model.Add(row.RowID, value);

            }

            return Json(model.Select(p => new { key = p.Key, value = p.Value }), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Users(string role)
        {
            List<ApplicationUser> users = new List<ApplicationUser>();
            if (string.IsNullOrWhiteSpace(role))
                users = UserRepository.GetAllUsers().ToList();
            else
                users = UserRepository.GetUsersInRole(role).ToList();

            if (!User.IsInRole("admin") && !User.IsInRole("developer"))
                users = users.Where(p => p.Email == User.Identity.Name).ToList();

            return Json(users.Select(p => new { key = p.Id, value = p.FirstName + " " + p.LastName + " | " + p.Email }), JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult UploadFiles(string FolderName)
        {
            string _FolderName = FolderName.Trim();
            string _Url = "/Content/FileManager/userfiles/" + _FolderName;
            string _Path = Server.MapPath("~/" + _Url);

            if (!Directory.Exists(_Path))
                Directory.CreateDirectory(_Path);

            var r = new List<UploadFilesResult>();

            foreach (string file in Request.Files)
            {
                HttpPostedFileBase hpf = Request.Files[file] as HttpPostedFileBase;
                if (hpf.ContentLength == 0)
                    continue;

                string savedFileName = Path.Combine(_Path, Path.GetFileName(hpf.FileName));

                hpf.SaveAs(savedFileName);

                r.Add(new UploadFilesResult()
                {
                    Name = hpf.FileName,
                    Length = hpf.ContentLength,
                    Type = hpf.ContentType,
                    Url = _Url + hpf.FileName
                });
            }
            return Json(r);
            //            return Content("{\"name\":\"" + r[0].Name + "\",\"type\":\"" + r[0].Type + "\",\"size\":\"" + string.Format("{0} bytes", r[0].Length) + "\"}", "application/json");
        }


        #endregion


        #region Written For Dynamics Development

        [MyAuthorize("developer")]
        public ActionResult GetEnumJson(string EnumName)
        {

            if (string.IsNullOrWhiteSpace(EnumName))
                return new EmptyResult();


            var assems = Directory.GetFiles(Server.MapPath("~/bin/"), "HCMS*.dll");
            Type t = null;
            foreach (var item in assems)
            {
                Assembly assem = Assembly.LoadFile(item);
                try
                {
                    t = assem.GetTypes().Where(p => p.IsEnum).FirstOrDefault(p => p.Name.ToLower() == EnumName.ToLower());
                }
                catch
                {

                }
                if (t != null)
                    break;
            }


            var model = new Dictionary<int, string>();

            foreach (var enm in Enum.GetValues(t))
                model.Add((int)enm, enm.ToString());


            return Json(model.Select(p => new { key = p.Key, value = p.Value }), JsonRequestBehavior.AllowGet);



        }

        [MyAuthorize("developer")]
        public ActionResult GetFieldsForInputDependencies(int Depend, string spliter)
        {
            var model = FormsDB.Find(Depend).Fields.Select(p => new
            {
                key = p.Name,
                value = p.Name + spliter + p.Label
            });
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [MyAuthorize("developer")]
        public ActionResult Forms()
        {
            var model = new GenericRepository<Form>()
                .GetAll()
                .Select(p => new { key = p.ID, value = p.Section.Name + " > " + p.Caption });

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [MyAuthorize("developer")]
        public ActionResult Sections()
        {
            var model = new GenericRepository<Section>()
                .GetAll()
                .Select(p => new { key = p.ID, value = p.Caption });

            return Json(model, JsonRequestBehavior.AllowGet);
        }


        #endregion

    }
}