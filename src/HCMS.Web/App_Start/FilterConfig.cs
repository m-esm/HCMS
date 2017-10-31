using System.Web.Mvc;
using HCMS.Web.Filters;
namespace HCMS.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        //     filters.Add(new DPageCachingActionFilter());
        }
    }
}
