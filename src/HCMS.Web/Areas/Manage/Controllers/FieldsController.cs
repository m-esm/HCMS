using HCMS.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using HCMS.Dynamics.Forms.Models;
using MoreLinq;
using HCMS.Security.Infrastructer;
using HCMS.Dynamics.Localization;
using Newtonsoft.Json;
using HCMS.Dynamics.Forms;
namespace HCMS.Web.Areas.Manage.Controllers
{
    [MyAuthorize("developer,admin")]
    public class FieldsController : ManageBaseController
    {
        // GET: Manage/Fields
        private GenericRepository<Field> fieldsDb = new GenericRepository<Field>();
        private GenericRepository<Form> formsDb = new GenericRepository<Form>();

        public ActionResult GetForms()
        {
            var model = formsDb.GetAll().Select(p => new
            {
                key = p.ID,
                value = p.Caption
            });

            return Json(model, JsonRequestBehavior.AllowGet);

        }

        public IEnumerable<Field> GetFieldsFromJsonObject(object fields, int formId)
        {
            var json = JsonConvert.DeserializeObject<dynamic>(fields.ToString());
            var fieldsOutput = new List<Field>();

            foreach (var field in json)
            {
                fieldsOutput.Add(new Field
                {
                    ID = field.ID,
                    Label = field.Label,
                    Name = ((string)field.Name).Replace(" ", "_"),
                    InputType = field.InputType,
                    GroupWith = field.GroupWith,
                    InputDivCssClass = field.InputDivCssClass,
                    Required = field.Required,
                    CssClass = field.CssClass,
                    FormID = formId,
                    Localize = field.Localize,
                    DataURL = field.Source,
                    ShowInGrid = field.ShowInGrid,
                    OrderID = field.OrderID,
                    AllowMultipleEntry = field.Multiple
                });
            }
            return fieldsOutput;
        }
        public ActionResult GetFormPreview(object fields, int formId)
        {
            try
            {
                var formFields = GetFieldsFromJsonObject(fields, formId);
                var formBuilderRepository = new FormBuilderRepository(formId, ManualFieldsInput: formFields);
                return PartialView("Forms/_FormRender", formBuilderRepository);
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
                return new EmptyResult();
            }

        }

        public ActionResult Save(object fields, int formId)
        {
            IEnumerable<Field> formFields = GetFieldsFromJsonObject(fields, formId);

            foreach (Field ff in formsDb.Find(formId).Fields.AsEnumerable())
            {
                if (!formFields.Any(p => p.ID == ff.ID))
                {
                    var gg = new GenericRepository<Field>(true);
                    gg.Remove(gg.Find(ff.ID));
                }
            }

            foreach (var f in formFields)
            {
                if (f.ID == 0)
                {
                    f.FormID = formId;
                    fieldsDb.Add(f);
                }
                else
                {
                    fieldsDb.Update(f, f.ID);
                }
            }

            return new EmptyResult();
        }


        public ActionResult insertDefaults(int sectionId = 0)
        {


            Field[] defaultFields = {
              new Field { Label= "نام مدل",  InputType=  0,  InputDivCssClass= "col-sm-12", Required= true, Name= "name", GroupWith= "", ShowInGrid= true,  OrderID= 0, AllowMultipleEntry= false },
              new Field {Label= "قیمت پیش فرض",  InputType = 0,  InputDivCssClass= "col-sm-12", Required= true, Name= "DefaultPrice", GroupWith= "", ShowInGrid= true,  OrderID= 0, AllowMultipleEntry= false },
              new Field {Label= "نام ویژگی",  InputType= 0,  InputDivCssClass= "col-xs-6", Required= false, Name= "field", GroupWith= "other", ShowInGrid= false,  OrderID= 400, AllowMultipleEntry= true },
              new Field {Label= "مقدار",  InputType= 2,  InputDivCssClass= "col-xs-6", Required= false, Name= "value", GroupWith= "other", ShowInGrid= false,  OrderID= 401, AllowMultipleEntry= true },
              new Field {Label= "عکس",  InputType= 21,  InputDivCssClass= "col-sm-12", Required= true, Name= "image", GroupWith= "img", ShowInGrid= false,  OrderID= 1, AllowMultipleEntry= true },
              new Field {Label= "توضیحات",  InputType= 2,  InputDivCssClass= "col-sm-12", Required= true, Name= "description", GroupWith= "", ShowInGrid= false,  OrderID= 0, AllowMultipleEntry= false }};


            GenericRepository<Section> sections = new GenericRepository<Section>();
            GenericRepository<Field> formFields = new GenericRepository<Field>();

            var section = sections.Find(sectionId);

            foreach (var form in section.Forms)
            {

                foreach (var field in form.Fields)
                {
                    if (!defaultFields.Select(p => p.Name).Contains(field.Name))
                        if (field.OrderID == 0)
                        {
                            field.OrderID = 10;
                            formFields.Update(field, field.ID);
                        }

                    if (field.InputType == (int)InputTypes.Image)
                    {
                        field.InputType = (int)InputTypes.UploadControl;
                        formFields.Update(field, field.ID);
                    }

                    if (field.Name == "DefaultPrice")
                    {
                        field.CssClass = "money-input";
                        formFields.Update(field, field.ID);

                    }


                }

                foreach (var item in defaultFields)
                {
                    if (!form.Fields.Any(p => p.Name == item.Name))
                    {
                        item.FormID = form.ID;
                        formFields.Add(item);
                    }

                }

            }


            return new EmptyResult();

        }


        public ActionResult GetFields(int formId = 0)
        {
            var model = fieldsDb.Where(p => p.FormID == formId).Select(p => new
            {
                p.ID,
                p.Label,
                Source = p.DataURL,
                p.InputType,
                p.CssClass,
                p.InputDivCssClass,
                p.Required,
                p.Name,
                p.GroupWith,
                p.ShowInGrid,
                p.Localize,
                p.OrderID,
                Multiple = p.AllowMultipleEntry
            });

            return Json(model, JsonRequestBehavior.AllowGet);

        }
        public ViewResult Index(int? page, int? FormID)
        {

            var pageNumber = page ?? 1;
            var model = fieldsDb.GetAll().AsEnumerable();
            if (FormID.HasValue)
                model = model.Where(p => p.FormID == FormID.Value);

            return View(model);
        }

        //
        // GET: /Fields/Details/5

        public ViewResult Details(int id)
        {
            var model = fieldsDb.Find(id);
            return View(model);
        }

        //
        // GET: /Fields/Create

        public ActionResult Create(int? FormID)
        {
            var model = new Field();
            model.FormID = FormID ?? 0;
            return View(model);
        }

        //
        // POST: /Fields/Create

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(Field model)
        {
            GenericRepository<FormFieldValue> ValuesDB = new GenericRepository<FormFieldValue>();
            if (ModelState.IsValid)
            {
                var field = fieldsDb.Add(model);

                if (field.AllowMultipleEntry)
                {
                    var _field = fieldsDb.Find(field.ID);

                    var select = ValuesDB.Where(p => p.Field.FormID == _field.FormID)
                        .Where(p => p.Field.GroupWith == _field.GroupWith)
                        .GroupBy(p => p.RowID);

                    foreach (var group in select)
                    {
                        var relatedVals = group.DistinctBy(p => p.RelatedToID);
                        foreach (var item in group)
                        {
                            if (!ValuesDB.Where(p => p.Field.FormID == _field.FormID).Any(p => p.FieldID == _field.ID && p.RowID == item.RowID && p.RelatedToID == item.RelatedToID))
                                ValuesDB.Add(new FormFieldValue()
                                {
                                    ChangeDate = DateTime.Now,
                                    FieldID = _field.ID,
                                    RelatedToID = item.RelatedToID,
                                    RowID = item.RowID,
                                    Value = ""
                                });
                        }

                    }
                }



                return RedirectToAction("Index", new { formID = model.FormID });
            }
            else
            {

            }


            return View(model);
        }

        //
        // GET: /Fields/Edit/5

        public ActionResult Edit(int id)
        {
            var model = fieldsDb.Find(id);
            return View(model);
        }

        //
        // POST: /Fields/Edit/5

        [ValidateInput(false)]
        [HttpPost]
        public ActionResult Edit(Field model)
        {
            if (ModelState.IsValid)
            {
                fieldsDb.Update(model, model.ID);
                return RedirectToAction("Index", new { formID = model.FormID });
            }

            return View(model);
        }

        //
        // GET: /Fields/Delete/5

        public ActionResult Delete(int id)
        {
            var model = fieldsDb.Find(id);
            return View(model);
        }

        //
        // POST: /Fields/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            fieldsDb.Remove(fieldsDb.Find(id));
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                fieldsDb.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}