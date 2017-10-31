using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace HCMS.Dynamics.DSystem.Models
{
    public class Plugin
    {
        /// <summary>
        /// Is DLL file in Bin folder 
        /// </summary>
        /// 
        public string PluginRegisterName()
        {
            return FileName.Replace("HCMS.", "").Replace(".dll", "");
        }
        public bool Active { get; set; }

        public bool PreventDefaultRoute { get; set; }

        public string AssemblyFilePath { get; set; }
        public string FileName { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public string developer { get; set; }
        public string developerLink { get; set; }
        public string Version { get; set; }
        public string IconURL { get; set; }
        public string[] Dependencies { get; set; }

        protected Assembly _PluginAssembly;
        protected Assembly PlguinAssembly
        {
            get
            {
                if (_PluginAssembly == null)
                    _PluginAssembly = Plugable.GetPluginAssembly(new FileInfo(this.AssemblyFilePath));

                return _PluginAssembly;
            }
        }
        /// <summary>
        /// Is it Written By Happy developers For HCMS or not ?
        /// </summary>
        public bool IsPlugin { get; set; }
        public Dictionary<string, string> FoldersAndPaths { get; set; }


        public void InstallDefaultValues()
        {
            Plugable.RunPluginConfigMethod(this.PlguinAssembly, "InstallDefaultValues", null);
        }

        public void ApplicationStart()
        {
            Plugable.RunPluginConfigMethod(this.PlguinAssembly, "ApplicationStart", null);
        }

        public void ApplicationEnd()
        {
            Plugable.RunPluginConfigMethod(this.PlguinAssembly, "ApplicationEnd", null);

        }

        public void PluginUninstall()
        {
            Plugable.RunPluginConfigMethod(this.PlguinAssembly, "PluginUninstall", null);

        }

        public Plugin GetProperties()
        {
            return this;
        }


        protected PluginManageMenu _manageMenu;

        public PluginManageMenu GetManageMenu()
        {
            if (_manageMenu == null)
                _manageMenu = Plugable.InvokeManageMenu(this.PlguinAssembly);

            return _manageMenu;
        }


        public Bundle[] GetOptimizationBundles()
        {
            return Plugable.InvokeBundles(this.PlguinAssembly);
        }
        public RouteModel[] GetUrlRoutes()
        {
            var routes = Plugable.InvokeRoutes(this.PlguinAssembly);
            if (routes == null)
                routes = new List<RouteModel>().ToArray();

            return routes;

        }
    }
}
