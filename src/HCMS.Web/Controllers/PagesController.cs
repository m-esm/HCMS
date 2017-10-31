using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Reflection;
using HCMS.Web.Filters;
using HCMS.Dynamics.Localization;

namespace HCMS.Web.Controllers
{


    /// <summary>
    /// Pages Controller
    /// </summary>
    public class PagesController : Controller
    {
        [DPageCachingActionFilter]
        public ActionResult Index(string ViewName)
        {
            ViewBag.Phrases = new Phrases(ControllerContext);

            if (ViewName != "404" && !System.IO.File.Exists(Server.MapPath(string.Format("~/Themes/{0}/Pages/{1}.cshtml", MvcApplication.currentTheme, ViewName))))
                return View("404");

                return View(ViewName);
        }

    }


}