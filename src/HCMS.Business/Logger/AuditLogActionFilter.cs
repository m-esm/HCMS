using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Routing;
using HCMS.Data.Identity;
using HCMS.Business.Models;

namespace HCMS.Business.Logger
{
    public class AuditLogActionFilter : ActionFilterAttribute
    {
        public string ActionType { get; set; }

        //اگر بخواهیم تمام حرکات کاربر را لاگ کنیم از متد زیر استفاده میکنیم
        //public override void OnActionExecuting(ActionExecutingContext filterContext)
        //{
        //    // Retrieve the information we need to log
        //    string routeInfo = GetRouteData(filterContext.RouteData);
        //    string user = filterContext.HttpContext.User.Identity.Name;

        //    // Write the information to "Audit Log"
        //    var strLog = string.Format("test {0}", 10);
        //    //Debug.WriteLine(String.Format("ActionExecuting - {0} ActionType: {1}; User:{2}"
        //    //  , routeInfo, ActionType, user), "Audit Log");

        //    base.OnActionExecuting(filterContext);
        //}

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            // Retrieve the information we need to log
           // string routeInfo = GetRouteData(filterContext.RouteData);
            bool isActionSucceeded = filterContext.Exception == null;
            string user = filterContext.HttpContext.User.Identity.Name;
            
            string strLog = "";
            if (isActionSucceeded)
            {
                using (var db = ApplicationDbContext.Create())
                {
                    SystemLogModel model = new SystemLogModel
                    {
                        GuidId = Guid.NewGuid(),
                        UserName = user,
                        Controller = filterContext.RouteData.Values["controller"].ToString(),
                        Action = filterContext.RouteData.Values["action"].ToString(),
                        LogDate = DateTime.Now,
                        Descrp1 = ""
                    };
                    //db.SystemLogs.Add(model);
                    db.SaveChanges();
                }
            }
            // Write the information to "Audit Log"
            //Debug.WriteLine(String.Format("ActionExecuted - {0} ActionType: {1}; Executed successfully:{2}; User:{3}"
            //  , routeInfo, ActionType, isActionSucceeded, user), "Audit Log");

            base.OnActionExecuted(filterContext);
        }

        //private string GetRouteData(RouteData routeData)
        //{
        //    var controller = routeData.Values["controller"];
        //    var action = routeData.Values["action"];

        //    return String.Format("Controller:{0}; Action:{1};", controller, action);
        //}
    }
}
