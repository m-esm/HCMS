using HCMS.Dynamics;
using System.Data.Entity;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using HCMS.Web.CustomViewEngines;
using HCMS.Dynamics.Data;
using System.Threading;
using HCMS.Web.Hubs;
using System;
using System.Linq;
using HCMS.Dynamics.Stats;
using System.Collections.Generic;
using HCMS.Dynamics.DSystem.Models;
using HCMS.Dynamics.DSystem;
using HCMS.Dynamics.Localization.Entities;
using HCMS.Business;
using System.Web.Http;
using System.Web;

namespace HCMS.Web
{
    // Note: For instructions on enabling IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=301868
    
    public class MvcApplication : HCMS.Dynamics.DSystem.Web.DApplication
    {
        public static void RefreshViewEngines()
        {
            RegisterViewEngine(ViewEngines.Engines);
        }
        public static void RegisterViewEngine(ViewEngineCollection viewEngines)
        {
            viewEngines.Clear();

            var themeableRazorViewEngine = new ThemeableRazorViewEngine
            {
                CurrentTheme = httpContext => currentTheme
            };

            viewEngines.Add(themeableRazorViewEngine);
        }

        protected void Application_BeginRequest()
        {
            var res = HttpContext.Current.Response;
            var req = HttpContext.Current.Request;
            res.AppendHeader("Access-Control-Allow-Origin", "*");
            res.AppendHeader("Access-Control-Allow-Credentials", "true");
            res.AppendHeader("Access-Control-Allow-Headers", "Authorization,Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name");
            res.AppendHeader("Access-Control-Allow-Methods", "POST,GET,PUT,PATCH,DELETE,OPTIONS");

            // ==== Respond to the OPTIONS verb =====
            if (req.HttpMethod == "OPTIONS")
            {
                res.StatusCode = 200;
                res.End();
            }
        }
        protected void Application_Start()
        {
         
            base.DApplication_Start();

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            GlobalConfiguration.Configure(WebApiConfig.Register);

            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            RefreshViewEngines();



        }

        protected void Application_End()
        {
            base.DApplication_End();
        }
    }

   


}
