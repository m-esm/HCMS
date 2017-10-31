using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Caching;
using System.Web.Mvc;
using System.Web.UI;
using System.Xml.Linq;

namespace HCMS.Web.Filters
{
    public class DPageCachingActionFilter : ActionFilterAttribute, IActionFilter
    {
        protected class CachingProfile
        {
            public string PageName { get; set; }
            public string[] Params { get; set; }
        }


        protected IEnumerable<CachingProfile> _CachingProfiles;
        protected IEnumerable<CachingProfile> CachingProfiles
        {
            get
            {

                string cacheKey = string.Format("dynamics_theme_caching_profiles_{0}", MvcApplication.currentTheme);

                if (_CachingProfiles != null)
                    return _CachingProfiles;

                _CachingProfiles = (IEnumerable<CachingProfile>)HttpContext.Current.Cache.Get(cacheKey);

                if (_CachingProfiles != null)
                    return _CachingProfiles;

                string theme_xml_path = HttpContext.Current.Server.MapPath(string.Format("~/Themes/{0}/theme.xml", MvcApplication.currentTheme));

                var theme_xml_document = XDocument.Load(theme_xml_path).Root;

                if (theme_xml_document.Elements().Any(p => p.Name == "Caching"))
                    _CachingProfiles = XDocument.Load(theme_xml_path)
                        .Root
                        .Element("Caching")
                        .Elements("Page")
                        .Select(p => new CachingProfile
                        {
                            PageName = p.Attribute("name").Value.ToLower(),
                            Params = p.Attribute("params").Value.Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries)
                        }).AsEnumerable();

                if (_CachingProfiles != null)
                    HttpContext.Current.Cache.Add(cacheKey, _CachingProfiles,
                        new CacheDependency(theme_xml_path),
                        DateTime.Now.AddYears(1),
                        System.Web.Caching.Cache.NoSlidingExpiration,
                        System.Web.Caching.CacheItemPriority.NotRemovable,
                        OnCachingProfilesCacheRemove);

                return _CachingProfiles;
            }
        }

        private void OnCachingProfilesCacheRemove(string key, object value, CacheItemRemovedReason reason)
        {
            _CachingProfiles = null;
        }


        protected string GenerateKey()
        {
            return string.Format("dynamics_page_cache:{0}", routeData);
        }

        private HtmlTextWriter tw;
        private StringWriter sw;
        private StringBuilder sb;
        private HttpWriter output;

        private string viewName;
        private string viewPath
        {
            get
            {
                return HttpContext.Current.Server.MapPath(string.Format("~/Themes/{0}/Pages/{1}", MvcApplication.currentTheme, viewName));
            }
        }

        private string routeData;

        private bool CachedPageExist = false;
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            sb = null;
            sw = null;
            tw = null;
            output = null;
            routeData = "";
            CachedPageExist = false;
            viewName = filterContext.RouteData.Values["ViewName"].ToString().ToLower();

            if (CachingProfiles == null)
                return;

            var CacheProfile = CachingProfiles.FirstOrDefault(p => p.PageName == viewName);

            if (CacheProfile == null)
                return;

            foreach (var rv in filterContext.RouteData.Values.Where(p => CacheProfile.Params.Contains(p.Key.ToLower())))
                routeData += rv.Key + "=" + rv.Value + "|";

            foreach (var qsKey in filterContext.HttpContext.Request.QueryString.AllKeys.Where(p => CacheProfile.Params.Contains(p)))
                routeData += qsKey + "=" + filterContext.HttpContext.Request.QueryString[qsKey].ToString() + "|";

            var CachedPage = HttpContext.Current.Cache.Get(GenerateKey());

            sb = new StringBuilder();
            sw = new StringWriter(sb);
            tw = new HtmlTextWriter(sw);
            output = (HttpWriter)filterContext.RequestContext.HttpContext.Response.Output;
            filterContext.RequestContext.HttpContext.Response.Output = tw;


            if (CachedPage != null)
            {
                //   HttpContext.Current.Response.Write((string)CachedPage);
                output.Write((string)CachedPage);
                HttpContext.Current.Response.End();
                CachedPageExist = true;
            }




            base.OnActionExecuting(filterContext);

        }

        public override void OnResultExecuted(ResultExecutedContext filterContext)
        {

            if (CachedPageExist == false)
                if (CachingProfiles != null)
                    if (CachingProfiles.Any(p => p.PageName == filterContext.RouteData.Values.FirstOrDefault(d => d.Key.ToLower() == "viewname").Value.ToString()))
                    {
                        string response = sb.ToString().Replace("\r\n", "").Replace("  ", "");
                        HttpContext.Current.Cache.Add(
                    key: GenerateKey(),
                    value: response,
                    dependencies: new System.Web.Caching.CacheDependency(viewPath),
                    absoluteExpiration: System.Web.Caching.Cache.NoAbsoluteExpiration,
                    slidingExpiration: TimeSpan.FromMinutes(20),
                    priority: System.Web.Caching.CacheItemPriority.Normal,
                    onRemoveCallback: onPageDependencyChanged);

                        output.Write(response);
                    }




            base.OnResultExecuted(filterContext);

        }

        private void onPageDependencyChanged(string key, object value, CacheItemRemovedReason reason)
        {
            string _k = key;

        }








    }
}