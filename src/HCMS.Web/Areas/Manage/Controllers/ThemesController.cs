using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using HCMS.Dynamics.Themes.Models;
using System.Xml.Linq;
using HCMS.Dynamics;
using HCMS.Security.Infrastructer;
using HCMS.Dynamics.Localization;
namespace HCMS.Web.Areas.Manage.Controllers
{
    [MyAuthorize("developer,admin")]
    public class ThemesController : ManageBaseController
    {

      
        // GET: Manage/Themes
        public ActionResult Index()
        {
            var model = new Theme().GetThemes(Server.MapPath("~/Themes/"));
            return View(model);
        }

        public ActionResult Set(string Name)
        {
            Settings.Set("Dynamics.System.Theme",Name, new Guid());
            MvcApplication.currentTheme = Name;
            MvcApplication.RefreshViewEngines();
            return RedirectToAction("Index");
        }
    }
}