using HCMS.Business;
using HCMS.Dynamics.DSystem.Models;
using System.Web.Mvc;
using System.Web.Routing;
using System.Diagnostics;
using System;
using System.Linq;
using System.Collections.Generic;

namespace HCMS.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {


            var routesToAdd = new List<RouteModel>();


            try
            {
                GenericRepository<RouteModel> RoutesDB = new GenericRepository<RouteModel>();

                foreach (var item in RoutesDB.GetAll())
                    routesToAdd.Add(item);

                foreach (Plugin plugin in MvcApplication.Plugins)
                {
                    string pluginName = plugin.FileName.Replace(".dll", "").Replace("HCMS.", "");

                    RouteTable.Routes.Remove(RouteTable.Routes[pluginName + "_default"]);

                    if (!plugin.PreventDefaultRoute)
                    {
                        routes.MapRoute(
                               name: pluginName + "_default",
                               url: "{ln}-{cn}/" + pluginName + "/{controller}/{action}/{id}",
                               namespaces: new string[] { string.Format("HCMS.{0}.Controllers", pluginName) },
                               defaults: new { plugin = pluginName, controller = "Home", action = "Index", ln = "en", cn = "us", id = UrlParameter.Optional }
                                      );

                        routes.MapRoute(
                           name: pluginName + "_Default_Localized",
                           url: pluginName + "/{controller}/{action}/{id}",
                           namespaces: new string[] { string.Format("HCMS.{0}.Controllers", pluginName) },
                           defaults: new { plugin = pluginName, controller = "Home", action = "Index", ln = "en", cn = "us", id = UrlParameter.Optional }
                                  );
                    }


                    foreach (var route in plugin.GetUrlRoutes())
                    {
                        route.Name = plugin.Name + "_" + route.Name;
                        routesToAdd.Add(route);
                    }
                }

            }
            catch
            {

            }

            try
            {
                foreach (var route in routesToAdd.OrderBy(p => p.SortId))
                {

                    if (RouteTable.Routes[route.Name] != null)
                        RouteTable.Routes.Remove(RouteTable.Routes[route.Name]);

                    if (route.Enable)
                    {
                        var routeDefaults = new RouteValueDictionary();
                        var nameSpaces = new List<string>();

                        if (!string.IsNullOrWhiteSpace(route.Namespaces))
                            nameSpaces = route.Namespaces.Split(',').ToList();

                        if (!string.IsNullOrWhiteSpace(route.Defaults))
                        {
                            route.Defaults = route.Defaults.Replace("\r\n", "");
                            foreach (string dline in route.Defaults.Split(','))
                                if (dline.Split("=".ToCharArray()).Length == 2)
                                    routeDefaults.Add(dline.Split('=')[0].Trim(), dline.Split('=')[1].Trim());
                        }

                        routes.MapRoute(name: route.Name,
                            url: route.URL,
                            defaults: routeDefaults,
                            namespaces: nameSpaces.ToArray());
                    }

                }
            }
            catch
            {

            }

        }
    }

}

