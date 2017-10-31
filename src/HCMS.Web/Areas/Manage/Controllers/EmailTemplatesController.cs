using HCMS.Business;
using HCMS.Dynamics.Localization;
using HCMS.Dynamics.Tools;
using HCMS.Security.Infrastructer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Mvc;

namespace HCMS.Web.Areas.Manage.Controllers
{
    [MyAuthorize("developer,admin")]

    public class EmailTemplatesController : ManageBaseController
    {
        GenericRepository<MailTemplate> mailTemplateRepo = new GenericRepository<MailTemplate>();
        public ActionResult Index()
        {
            var model = mailTemplateRepo.GetAll();
            return View(model);
        }


        public ActionResult Create(int? SectionID)
        {
            var model = new MailTemplate();


            return View(model);
        }

        //
        // POST: /Forms/Create

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(MailTemplate model)
        {
            if (ModelState.IsValid)
            {
                mailTemplateRepo.Add(model);

                return RedirectToAction("Index");
            }

            return View(model);
        }


        public ActionResult Edit(int id)
        {
            var model = mailTemplateRepo.Find(id);
            return View(model);
        }

        [ValidateInput(false)]
        [HttpPost]
        public ActionResult Edit(MailTemplate model)
        {
            mailTemplateRepo.Update(model, model.ID);

            return RedirectToAction("Index");
        }


        public ActionResult Delete(int id)
        {
            mailTemplateRepo.Remove(mailTemplateRepo.Find(id));
            return RedirectToAction("index");
        }

    }
}
