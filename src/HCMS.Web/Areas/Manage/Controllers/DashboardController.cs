using HCMS.Data.Identity;
using HCMS.Security;
using HCMS.Security.Infrastructer;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Text;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using HCMS.Dynamics.Localization;
namespace HCMS.Web.Areas.Manage.Controllers
{
    //TODO : Remove vitrin
     [MyAuthorize("developer,admin")]
    public class DashboardController : ManageBaseController
    {
        // GET: Manage/Dashboard
        
        public ActionResult Index()
        {
            return View();
            //   return View("~/Areas/Manage/Views/Dashboard/Index.generated.cs");
        }


        public ActionResult Test()
        {
            return View();
        }
     
        




    }
}