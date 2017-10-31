using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using HCMS.Data;
using HCMS.Data.Identity;
using HCMS.Business.Models;


namespace HCMS.Business.Logger
{
    class AuditUserLog : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            bool isActionSucceeded = filterContext.Exception == null;
            string host = Dns.GetHostName();
            IPHostEntry ip = Dns.GetHostEntry(host);
            string strLog = "";
            if (isActionSucceeded)
            {
                using (var db = new ApplicationDbContext())
                {
                    UserLogModel model = new UserLogModel()
                    {
                        UserName = filterContext.HttpContext.User.Identity.Name,
                        Browser = filterContext.HttpContext.Request.Browser.Version,
                        Ip = ip.ToString(),
                        LogInDate = DateTime.Now
                    };

                    //db.UserLogs.Add(model);
                    db.SaveChanges();
                }
            }
            // Write the information to "Audit Log"
            //Debug.WriteLine(String.Format("ActionExecuted - {0} ActionType: {1}; Executed successfully:{2}; User:{3}"
            //  , routeInfo, ActionType, isActionSucceeded, user), "Audit Log");

            base.OnActionExecuted(filterContext);
        }
    }
}
