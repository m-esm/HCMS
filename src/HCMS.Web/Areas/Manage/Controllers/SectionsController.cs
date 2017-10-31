using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HCMS.Business;
using HCMS.Dynamics.Forms.Models;
using HCMS.Security.Infrastructer;
using PagedList;
using Newtonsoft.Json;
using HCMS.Dynamics.Tools;
using HCMS.Dynamics.Localization;
namespace HCMS.Web.Areas.Manage.Controllers
{
  [MyAuthorize("developer,admin")]
    public class SectionsController : ManageBaseController
    {
        // GET: Manage/Sections
        private GenericRepository<Section> sections_context = new GenericRepository<Section>();
        private GenericRepository<Form> forms_context = new GenericRepository<Form>();
        private GenericRepository<Field> fields_context = new GenericRepository<Field>();
        private GenericRepository<FormFieldValue> values_context = new GenericRepository<FormFieldValue>();


        public ActionResult Export(int[] sectionIDs)
        {
            var model = sections_context.GetAll().AsEnumerable();

            if (sectionIDs != null)
                model = sections_context.Where(p => sectionIDs.Contains(p.ID)).AsEnumerable();

            return View(model);
        }


        public ActionResult Import()
        {
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Import(string Input)
        {
          
            dynamic data = Newtonsoft.Json.JsonConvert.DeserializeObject(Input);
            if (data == null)
            {
                ViewBag.Input = Input;
                ModelState.AddModelError("1","داده ورودی خالی می باشد !");
                return View();
            }


            foreach (var s in data)
            {
                Section _section = new Section() { Name = s.Name, Caption = s.Caption };

                if (sections_context.GetAll().AsEnumerable().Any(p => p.Name.TrimLower() == _section.Name.TrimLower()))
                {
                    ViewBag.Input = Input;
                    ModelState.AddModelError("", "سکشن های ورودی موجود می باشند !");
                    return View();
                }

                sections_context.Add(_section);
                ModelState.AddModelError("success", _section.Caption + " ایجاد شد !");
                foreach (var f in s.Forms)
                {
                    var _form = new Form()
                    {
                        Name = f.Name,
                        Caption = f.Caption,
                        Method = f.Method,
                        CreatAccessRole = f.CreatAccessRole,
                        DeleteAccessRole = f.DeleteAccessRole,
                        EditAccessRole = f.EditAccessRole,
                        ReadAccessRole = f.ReadAccessRole,
                        ActionURL = f.ActionURL,
                        SectionID = _section.ID
                    };

                    forms_context.Add(_form);

                    foreach (var i in f.Fields)
                    {
                        var _field = new Field()
                        {
                            Name = i.Name,
                            AllowMultipleEntry = i.AllowMultipleEntry,
                            CreatAccessRole = i.CreatAccessRole,
                            CssClass = i.CssClass,
                            CustomRegEx = i.CustomRegEx,
                            DataURL = i.DataURL,
                            DeleteAccessRole = i.DeleteAccessRole,
                            DependOnProperty = i.DependOnProperty,
                            EditAccessRole = i.EditAccessRole,
                            GroupWith = i.GroupWith,
                            InputDivCssClass = i.InputDivCssClass,
                            InputFilter = i.InputFilter,
                            InputType = i.InputType,
                            Label = i.Label,
                            Mask = i.Mask,
                            Max = i.Max,
                            Min = i.Min,
                            MultipleEntrySpliter = i.MultipleEntrySpliter,
                            OrderID = i.OrderID,
                            Placeholder = i.Placeholder,
                            ReadAccessRole = i.ReadAccessRole,
                            Related = i.Related,
                            Required = i.Required,
                            RichTextEditorLanguage = i.RichTextEditorLanguage,
                            RichTextEditorMode = i.RichTextEditorMode,
                            RichTextEditorSkin = i.RichTextEditorSkin,
                            SavePath = i.SavePath,
                            SearchPath = i.SearchPath,
                            ShowInGrid = i.ShowInGrid,
                            FormID = _form.ID
                        };

                        fields_context.Add(_field);
                    }
                }
            }
       
            ModelState.AddModelError("", "ورود اطلاعات انجام شد !");
            return View();
        }


        public ViewResult Index(int? page)
        {
            var pageNumber = page ?? 1;
            var model = sections_context.GetAll();
            return View(model);
        }

        //
        // GET: /Forms/Details/5

        public ViewResult Details(int id)
        {
            var model = sections_context.Find(id);
            return View(model);
        }

        //
        // GET: /Forms/Create

        public ActionResult Create()
        {
            return View(new Section());
        }

        //
        // POST: /Forms/Create

        [HttpPost]
        public ActionResult Create(Section model)
        {
            if (ModelState.IsValid)
            {
                sections_context.Add(model);

                return RedirectToAction("Index");
            }

            return View(model);
        }

        //
        // GET: /Forms/Edit/5

        public ActionResult Edit(int id)
        {
            var model = sections_context.Find(id);
            return View(model);
        }

        //
        // POST: /Forms/Edit/5

        [HttpPost]
        public ActionResult Edit(Section model)
        {
            if (ModelState.IsValid)
            {
                sections_context.Update(model, model.ID);
                return RedirectToAction("Index");
            }

            return View(model);
        }

        //
        // GET: /Forms/Delete/5

        public ActionResult Delete(int id)
        {
            var model = sections_context.Find(id);
            return View(model);
        }

        //
        // POST: /Forms/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            sections_context.Remove(sections_context.Find(id));
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                sections_context.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}