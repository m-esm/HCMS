using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using HCMS.Business.Auth;


namespace HCMS.Security.Infrastructer
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class MyAuthorizeAttribute : AuthorizeAttribute
    {
        private readonly string _roles;
        public MyAuthorizeAttribute(string roles)
        {
            _roles = roles;
        }

        public MyAuthorizeAttribute()
        {
            var roles = UserRepository.GetAllRole();
            foreach (var item in roles)
            {
                _roles += "," + item;
            }
            _roles = _roles.Remove(0, 1);
        }

        /// <summary>
        /// در اینجا تعیین میکنیم که کاربر با رل مورد نظر دسترسی دارد یا نه
        /// اگر دسترسی نداشت به صفحه ورود کاربران هدایت میشود
        /// </summary>
        /// <param name="filterContext"></param>

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            string currentCulture = "";

            if (filterContext.RouteData.Values["ln"] != null && filterContext.RouteData.Values["cn"] != null)
                currentCulture = "/" + filterContext.RouteData.Values["ln"].ToString() + "-" + filterContext.RouteData.Values["cn"].ToString();

            var url = new UrlHelper(filterContext.RequestContext);
            var logonUrl = currentCulture + "/manage/Auth/Login?returnUrl=" + HttpUtility.UrlEncode(filterContext.RequestContext.HttpContext.Request.Url.ToString());

            string[] roles = _roles.ToLower().Split(',');
            if (filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                if (filterContext.HttpContext.User.IsInRole("developer"))
                    logonUrl = url.Action("Index", "Dashboard", new { area = "manage" });
                else if (filterContext.HttpContext.User.IsInRole("admin"))
                    logonUrl = url.Action("Index", "Dashboard", new { area = "manage" });
                else if (filterContext.HttpContext.User.IsInRole("user"))
                    logonUrl = url.Action("Index", "Dashboard", new { area = "user" });
                else
                {
                    logonUrl = url.Action("Index", "Home", new { area = "" });
                }
            }

            if (!roles.Any(item => filterContext.HttpContext.User.IsInRole(item)))
            {
                filterContext.Result = new RedirectResult(logonUrl ?? "/manage/Auth/Login");
                filterContext.RequestContext.HttpContext.Response.Redirect(logonUrl);
            }

            //User is not premision
        }
    }
}
