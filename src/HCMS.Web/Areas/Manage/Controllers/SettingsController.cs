using HCMS.Business;
using HCMS.Dynamics.DSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using HCMS.Dynamics;
using HCMS.Dynamics.Forms;
using HCMS.Security.Infrastructer;
using Microsoft.AspNet.Identity;
using HCMS.Dynamics.Localization;
//using HCMS.Messaging.Model.Comments;

namespace HCMS.Web.Areas.Manage.Controllers
{
    [MyAuthorize("developer,admin")]
    public class SettingsController : ManageBaseController
    {
        // GET: Manage/Settings
        readonly GenericRepository<Setting> _settingsDb = new GenericRepository<Setting>();
        public ActionResult Index()
        {
            var model = _settingsDb.GetAll();
            return View(model);
        }

        [MyAuthorize("developer")]
        public ActionResult List()
        {
            var model = _settingsDb.GetAll();
            return View(model);
        }

        [MyAuthorize("developer")]
        public ActionResult Create()
        {
            //Settings.Create(new Setting()
            //{
            //    Name = "WebSiteOffline",
            //    Caption = "بستن موقت سایت",
            //    InputType = InputTypes.CheckBox,
            //    Category = SettingCategories.General,
            //    ChangeDate = DateTime.Now,
            //    LastUserGUID = Guid.Parse(User.Identity.GetUserId())
            //});
            return View();
        }

        [MyAuthorize("developer")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Setting model)
        {
            model.LastUserGUID = User.Identity.GetUserId();
            model.ChangeDate = DateTime.Now;
            if (ModelState.IsValid)
            {
                _settingsDb.Add(model);
                return RedirectToAction("List");
            }  
            return View(model);
        }

        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var model = _settingsDb.Find(id.Value);
            if (model == null)
            {
                return HttpNotFound();
            }
           
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(Setting model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            await _settingsDb.UpdateAsync(model, model.Id);
            return RedirectToAction("List");
        }
    }
}