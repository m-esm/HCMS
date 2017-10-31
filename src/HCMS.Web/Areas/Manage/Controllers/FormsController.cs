using HCMS.Business;
using HCMS.Dynamics.Forms.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HCMS.Security.Infrastructer;
using PagedList;
using HCMS.Dynamics.Localization;

namespace HCMS.Web.Areas.Manage.Controllers
{
    [MyAuthorize("developer,admin")]
    public class FormsController : ManageBaseController
    {
        // GET: Manage/Forms
        private GenericRepository<Form> context = new GenericRepository<Form>();

        public ViewResult Index(int? page,int? SectionID)
        {

            var pageNumber = page ?? 1;
            var model = context.GetAll().AsEnumerable();
            if (SectionID.HasValue)
                model = model.Where(p => p.SectionID == SectionID.Value);
            
            return View(model);
        }

        //
        // GET: /Forms/Details/5

        public ViewResult Details(int id)
        {
            var model = context.Find(id);
            return View(model);
        }

        //
        // GET: /Forms/Create

        public ActionResult Create(int? SectionID)
        {
            var model = new Form();
         
            //if (SectionID.HasValue)
            //    model.SectionID = SectionID.Value;
           
            return View(model);
        }

        //
        // POST: /Forms/Create

        [HttpPost]
        public ActionResult Create(Form model)
        {
            if (ModelState.IsValid)
            {
                context.Add(model);

                return RedirectToAction("Index", new { SectionID = model.SectionID });
            }

            return View(model);
        }

        //
        // GET: /Forms/Edit/5

        public ActionResult Edit(int id)
        {
            var model = context.Find(id);
            return View(model);
        }

        //
        // POST: /Forms/Edit/5

        [HttpPost]
        public ActionResult Edit(Form model)
        {
            if (ModelState.IsValid)
            {
                context.Update(model, model.ID);
                return RedirectToAction("Index", new { SectionID = model.SectionID });
            }

            return View(model);
        }

        //
        // GET: /Forms/Delete/5

        public ActionResult Delete(int id)
        {
            var model = context.Find(id);
            return View(model);
        }

        //
        // POST: /Forms/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            context.Remove(context.Find(id));
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                context.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}