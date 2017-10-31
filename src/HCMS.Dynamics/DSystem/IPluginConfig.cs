using HCMS.Dynamics.DSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.DSystem
{
    public interface IPluginConfig 
    {
        /// <summary>
        /// Install Default Database Values ,
        /// </summary>
        void InstallDefaultValues();

        /// <summary>
        /// Doing Actions Like Configuring Filters , etc ...
        /// </summary>
        void ApplicationStart();

        void ApplicationEnd();

        void PluginUninstall();


        PluginManageMenu GetManageMenu();

        /// <summary>
        /// Return Set Of Properties in Module Object Defind By developer
        /// </summary>
        Plugin GetProperties();

        /// <summary>
        /// Return Array of HCMS.Dynamics.System.Models.Bundle object which will be set in App_Start/BundleConfig.cs
        /// </summary>
        Bundle[] GetOptimizationBundles();

        /// <summary>
        /// Return Array of HCMS.Dynamics.System.Models.Route in App_Start/RouteConfig.cs
        /// </summary>
        RouteModel[] GetUrlRoutes();

    }
}
