using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services.Description;
using HCMS.Business.Enum;
using HCMS.Data.Identity;
using HCMS.Data.Migrations.ApplicationDbContext;
using HCMS.Data.Migrations.DB;
using HCMS.Web.Filters;

namespace HCMS.Web.Areas.Manage.Controllers
{

  // [BasicAuthentication("mohsen","0214470")]
    public class MaintenanceController : Controller
    {
  
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Update()
        {

            Response.Write("OK");
            HCMS.Business.DbInitializer.InitSystemContext();

            return new EmptyResult();

        }
        
    }
}