using System.Web.Mvc;

namespace HCMS.Web.Areas.Manage
{
    public class ManageAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Manage";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {




            context.MapRoute(
                            "Manage_dynamics",
                            "{ln}-{cn}/Manage/Dynamics/{section}/{form}/{action}/{ID}",
                            new { controller = "Dynamics", AreaName = "Manage", ln = "en", cn = "us", action = "Index", id = UrlParameter.Optional }
                            );

            context.MapRoute(
                            "Manage_dynamics_set_grid_settings",
                            "Manage/Dynamics/SetUserGridPageSize",
                            new { controller = "Dynamics", action = "SetUserGridPageSize" }
                            );

            context.MapRoute(
                            "Manage_dynamics_set_grid_col_settings",
                            "Manage/Dynamics/SetUserGridCol",
                            new { controller = "Dynamics", action = "SetUserGridCol" }
                            );



            context.MapRoute(
                                "Manage_default_localized",
                                "{ln}-{cn}/Manage/{controller}/{action}/{id}",
                                new { controller = "Dashboard", AreaName = "Manage", ln = "en", cn = "us", action = "Index", id = UrlParameter.Optional }
                            );

            context.MapRoute(
                    "Manage_default",
                    "Manage/{controller}/{action}/{id}",
                    new { controller = "Dashboard", AreaName = "Manage", ln = "en", cn = "us", action = "Index", id = UrlParameter.Optional }
                );


            context.MapRoute(
                                    "Manage_FileManager",
                                    "Manage/ElFinder/{action}",
                                    new { controller = "ElFinder", action = "Index", id = UrlParameter.Optional }
                                );

            context.MapRoute(
                                 "Stats_Submit",
                                 "Stats/Submit",
                                 new { ln = "en", cn = "us", controller = "Stats", action = "Submit" }
                             );

            context.MapRoute(
                        "DataController",
                        "DataController/{action}/{id}",
                        new { controller = "Data", AreaName = "Manage", action = "Index", id = UrlParameter.Optional }
                        );

        }
    }
}