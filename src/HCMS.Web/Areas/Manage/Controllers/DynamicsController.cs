using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using HCMS.Business;
using HCMS.Dynamics.Forms.Models;
using HCMS.Dynamics;
using HCMS.Security.Infrastructer;
using HCMS.Dynamics.Forms;
using HCMS.Dynamics.Data;
using HCMS.Dynamics.Grids;
using HCMS.Dynamics.Grids.Models;
using HCMS.Business.Auth;
using HCMS.Dynamics.Localization.Entities;
using HCMS.Dynamics.Localization;
using System.IO;
namespace HCMS.Web.Areas.Manage.Controllers
{
    [MyAuthorize("developer,admin,user")]
    public class DynamicsController : ManageBaseController
    {
        DynamicDB dynamicDB = new DynamicDB();
        // GET: /Manage/Dynamics
        GenericRepository<Section> Sections = new GenericRepository<Section>();
        GenericRepository<GridUserSettingsModel> GridUserSettings = new GenericRepository<GridUserSettingsModel>();
        GenericRepository<GridColUserSettingsModel> GridColUserSettings = new GenericRepository<GridColUserSettingsModel>();

        Culture[] Cultures = new GenericRepository<Culture>().GetAll().ToArray();

        public ActionResult UploadControl()
        {
            return View();
        }

        [HttpPost]
        [MyAuthorize]
        public string UploadControl(FormCollection form)
        {
            HttpPostedFileBase file = Request.Files[0];
            string[] AllowedImageExtensions = { "jpg", "png", "jpeg", "doc", "pdf", "docx", "xls", "xlsx", "tif", "gif" };

            string fileExt = file.FileName.Split('.').Last().Trim();
            var uid = UserRepository.GetUserIdByUsername(User.Identity.Name);

            var originalDirectory =
new DirectoryInfo(Server.MapPath("~/Files/" + uid));


            string pathString = originalDirectory.ToString();

            // Path.GetFileName(DateTime.Now + file.FileName);

            bool isExists = System.IO.Directory.Exists(pathString);

            if (!isExists)
                System.IO.Directory.CreateDirectory(pathString);


            var fileNameRes = originalDirectory.GetFiles().Count() + "_" + file.FileName;


            var path = string.Format("{0}\\{1}", pathString, fileNameRes);

            file.SaveAs(path);

            var url = "/Files/" + uid + "/" + fileNameRes;


            return url;

        }

        public ActionResult Index(string Section, string Form, int? ID)
        {

            int pagesize = 20;

            Section _Section = Sections.Get(p => p.Name == Section);
            if (_Section == null)
                return new HttpNotFoundResult();

            var _Form = _Section.Forms.FirstOrDefault(p => p.Name == Form);

            ViewBag.section = _Section.Caption;

            if (_Form == null)
                return new HttpNotFoundResult();

            ViewBag.Layout = "~/SharedViews/Admin/_Layout.cshtml";
            ViewBag.DynamicsForm = _Form;

            string userid = UserRepository.GetUserIdByUsername(User.Identity.Name);
            var GridUserSetting = GridUserSettings.Get(p => p.Name == _Section.Name + "_" + _Form.Name && p.UserID.ToString() == userid);
            if (GridUserSetting != null)
                pagesize = GridUserSetting.PageSize;


            if (_Form.GridType == (int)GridTypes.DynaimcsGrid)
            {
                var gridModel = new GridModel()
                {
                    Name = _Section.Name + "_" + _Form.Name,
                    AjaxMethod = "POST",
                    PageSize = pagesize,
                    Caption = _Form.GetCaption(CaptionModes.List, Phrases),
                    DataURL = string.Format("/Manage/Dynamics/{0}/{1}/DynamicsGridData", _Section.Name, _Form.Name),
                    ColModels = _Form.Fields
                    .Where(p => p.ShowInGrid)
                    .OrderBy(p => p.OrderID)
                    .Select(p => new GridColModel()
                    {
                        CssClasses = p.CssClass,
                        Name = p.Name,
                        Label = p.Label
                    })
                };

                return View("Grids/DynamicsGrid", gridModel);

            }

            var formValues = new GenericRepository<FormFieldValue>().Where(p => p.Field.FormID == _Form.ID);
            var data = formValues.OrderByDescending(p => p.RowID).GroupBy(p => p.RowID).AsEnumerable();

            return View("Grids/Standard", data);

        }

        public bool SetUserGridPageSize(string gridname, int pagesize)
        {
            if (gridname.Split('_').Count() != 2)
                return false;

            string sectionName = gridname.Split('_')[0];
            string gridName = gridname.Split('_')[1];
            var _section = Sections.Get(p => p.Name == sectionName);
            if (_section != null)
            {
                if (_section.Forms.Any(p => p.Name == gridname))
                    return false;
            }
            else
            {
                return false;
            }


            string userid = UserRepository.GetUserIdByUsername(User.Identity.Name);

            var GridUserSetting = GridUserSettings.Get(p => p.Name == gridname && p.UserID.ToString() == userid);
            if (GridUserSetting != null)
            {
                GridUserSetting.PageSize = pagesize;
                GridUserSettings.Update(GridUserSetting, GridUserSetting.ID);
            }
            else
            {
                GridUserSettings.Add(new GridUserSettingsModel()
                {
                    Name = gridname,
                    UserID = Guid.Parse(UserRepository.GetUserIdByUsername(User.Identity.Name)),
                    PageSize = pagesize
                });
            }

            return true;
        }

        public ActionResult DynamicsGridData(string Section, string Form, int pagesize, int cpage = 1)
        {
            Section _Section = Sections.Get(p => p.Name == Section);
            if (_Section == null)
                return new HttpNotFoundResult();

            var _Form = _Section.Forms.FirstOrDefault(p => p.Name == Form);

            ViewBag.section = _Section.Caption;

            if (_Form == null)
                return new HttpNotFoundResult();

            var formValues = new GenericRepository<FormFieldValue>()
                .Where(p => p.Field.FormID == _Form.ID)
                .Where(p => p.Field.ShowInGrid);


            var data = formValues.OrderByDescending(p => p.RowID).GroupBy(p => p.RowID).AsEnumerable();

            var _fields = _Form.Fields.Where(p => p.ShowInGrid).OrderBy(p => p.OrderID);
            List<GridDataRowModel> jqrows = new List<GridDataRowModel>();
            IEnumerable<DRow> drows = DDB.GetTable(_Section.Name, _Form.Name).DRows;
            drows = drows.ToPagedList(cpage, pagesize);
            foreach (DRow row in drows)
            {
                var jqrow = new GridDataRowModel() { ID = row.RowID };
                List<string> cell = new List<string>();
                foreach (var f in _fields)
                {
                    if (f.Name.ToLower().EndsWith("id"))
                        f.Name = f.Name.ToLower().Replace("id", "") + ".name";
                    cell.Add(row.GetValue(f.Name).Value);
                }
                jqrow.Cells = cell.ToArray();
                jqrows.Add(jqrow);
            }


            var model = new GridDataModel()
            {
                CurrentPage = cpage,
                TotalRecords = data.Count(),
                Rows = jqrows
            };


            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Delete(string Section, string Form, int RowID)
        {

            Section _Section = Sections.Get(p => p.Name == Section);

            if (_Section == null)
                return new HttpNotFoundResult();

            var _Form = _Section.Forms.FirstOrDefault(p => p.Name == Form);

            ViewBag.section = _Form.GetCaption(CaptionModes.List, Phrases);


            if (_Form == null)
                return new HttpNotFoundResult();

            ViewBag.RowID = RowID;
            return View(_Form);

        }
        [HttpPost]
        public ActionResult Delete(string Section, string Form, int RowID, FormCollection _formData)
        {
            GenericRepository<FormFieldValue> Values = new GenericRepository<FormFieldValue>();

            Section _Section = Sections.Get(p => p.Name == Section);

            if (_Section == null)
                return new HttpNotFoundResult();

            var _Form = _Section.Forms.FirstOrDefault(p => p.Name == Form);

            if (_Form == null)
                return new HttpNotFoundResult();

            new DCache().DeleteCache(RowID);
            dynamicDB.Delete(RowID);

            string RedirectUrl = "~/" + Phrases.CurrentCulture.CultureName() + "/Manage/Dynamics/" + Section + "/" + Form + "/Index";
            if (!string.IsNullOrWhiteSpace(_Form.SubmitRedirectURL))
                RedirectUrl = _Form.SubmitRedirectURL.Replace("@cc", Phrases.CurrentCulture.CultureName());

            return Redirect(RedirectUrl);
        }

        [ValidateInput(false)]
        public ActionResult Validate(string Section, string Form, FormCollection formData)
        {


            GenericRepository<FormFieldValue> Values = new GenericRepository<FormFieldValue>();

            Section _Section = Sections.Get(p => p.Name.ToLower().Trim() == Section.ToLower().Trim());

            if (_Section == null)
                return new HttpNotFoundResult();

            Form _Form = _Section.Forms.FirstOrDefault(p => p.Name.ToLower().Trim() == Form.ToLower().Trim());

            if (_Form == null)
                return new HttpNotFoundResult();


            List<ValidationErrorModel> model = new List<ValidationErrorModel>();

            foreach (var item in formData.AllKeys.Where(p => string.IsNullOrWhiteSpace(p) == false).Where(p => p.StartsWith("__") == false))
            {
                string Normalized_fieldName = item;

                if (item.Contains("_add_"))
                    Normalized_fieldName = item.Remove(item.IndexOf("_add_"));

                if (item.Contains("_edit_"))
                    Normalized_fieldName = item.Remove(item.IndexOf("_edit_"));

                if (item.Contains("_"))
                    Normalized_fieldName = item.Remove(item.IndexOf("_"));



                Field _field = _Form.Fields.FirstOrDefault(p => p.Name.ToLower().Trim() == Normalized_fieldName.ToLower().Trim());




                if (_field.Required || _field.InputType == (int)InputTypes.Number)
                    if (string.IsNullOrWhiteSpace(formData[item]))
                    {
                        string errorMsg = string.Format("{0} {1} !", _field.Label, Phrases.Get("Is Required"));
                        if (!model.Any(p => p.ErrorMessage == errorMsg))
                            model.Add(new ValidationErrorModel()
                            {
                                FieldID = _field.ID,
                                HtmlFieldName = item,
                                ErrorMessage = errorMsg
                            });

                    }


            }


            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Details(string Section, string Form, int RowID)
        {

            GenericRepository<FormFieldValue> Values = new GenericRepository<FormFieldValue>();

            Section _Section = Sections.Get(p => p.Name == Section);

            if (_Section == null)
                return new HttpNotFoundResult();

            var _Form = _Section.Forms.FirstOrDefault(p => p.Name == Form);


            if (_Form == null)
                return new HttpNotFoundResult();

            ViewBag.SectionName = _Section.Name;
            ViewBag.FormName = _Form.Name;
            ViewBag.FormCaption = _Form.GetCaption(CaptionModes.List, Phrases);
            ViewBag.sectionName = _Form.Section.Name;
            ViewBag.section = _Form.GetCaption(CaptionModes.List, Phrases);


            var model = Values.Where(p => p.Field.FormID == _Form.ID).Where(p => p.RowID == RowID);

            ViewBag.RowID = RowID;

            return View(model);

        }



        public ActionResult Edit(string Section, string Form, int RowID)
        {

            Section _Section = Sections.Get(p => p.Name == Section);

            if (_Section == null)
                return new HttpNotFoundResult();

            var _Form = _Section.Forms.FirstOrDefault(p => p.Name == Form);

            ViewBag.section = _Form.GetCaption(CaptionModes.List, Phrases);
            ViewBag.sectionName = _Form.Section.Name;

            if (_Form == null)
                return new HttpNotFoundResult();

            return View(_Form);

        }

        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult Edit(string Section, string Form, int RowID, FormCollection _formData)
        {




            GenericRepository<FormFieldValue> Values = new GenericRepository<FormFieldValue>();
            Section _Section = Sections.Get(p => p.Name == Section);

            if (_Section == null)
                return new HttpNotFoundResult();

            var _Form = _Section.Forms.FirstOrDefault(p => p.Name == Form);
            ViewBag.sectionName = _Form.Section.Name;
            if (_Form == null)
                return new HttpNotFoundResult();

            new DCache().DeleteCache(RowID);

            dynamicDB.Edit(_Form.ID, RowID, _formData, UserRepository.GetUserIdByUsername(User.Identity.Name));

            string RedirectUrl = "~/" + Phrases.CurrentCulture.CultureName() + "/Manage/Dynamics/" + Section + "/" + Form + "/Index";
            if (!string.IsNullOrWhiteSpace(_Form.SubmitRedirectURL))
                RedirectUrl = _Form.SubmitRedirectURL.Replace("@cc", Phrases.CurrentCulture.CultureName());

            return Redirect(RedirectUrl);

        }


        public ActionResult Create(string Section, string Form)
        {

            Section _Section = Sections.Get(p => p.Name == Section);

            if (_Section == null)
                return new HttpNotFoundResult();

            var _Form = _Section.Forms.FirstOrDefault(p => p.Name == Form);
            ViewBag.section = _Form.GetCaption(CaptionModes.List, Phrases);
            ViewBag.sectionName = _Form.Section.Name;
            if (_Form == null)
                return new HttpNotFoundResult();

            return View(_Form);

        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Create(string Section, string Form, FormCollection _formData)
        {

            GenericRepository<FormFieldValue> Values = new GenericRepository<FormFieldValue>();
            Section _Section = Sections.Get(p => p.Name == Section);

            if (_Section == null)
                return new HttpNotFoundResult();

            var _Form = _Section.Forms.FirstOrDefault(p => p.Name == Form);
            ViewBag.sectionName = _Form.Section.Name;
            if (_Form == null)
                return new HttpNotFoundResult();


            dynamicDB.Create(_Form.ID, _formData, UserRepository.GetUserIdByUsername(User.Identity.Name));
            new DCache().DeleteCache(0);


                string RedirectUrl = "~/" + Phrases.CurrentCulture.CultureName() + "/Manage/Dynamics/" + Section + "/" + Form + "/Index";
            if (!string.IsNullOrWhiteSpace(_Form.SubmitRedirectURL))
                RedirectUrl = _Form.SubmitRedirectURL.Replace("@cc", Phrases.CurrentCulture.CultureName());

            return Redirect(RedirectUrl);

        }





    }
}