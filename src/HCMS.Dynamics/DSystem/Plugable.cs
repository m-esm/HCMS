using HCMS.Dynamics.DSystem.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.DSystem
{
    public class Plugable
    {
        public static void Initialize()
        {

        }

        /// <summary>
        /// Getting Information Of All Modules
        /// </summary>
        /// <param name="BinDirectory">Full Address of BinDirectory Location | You can get it in mvc by Server.MapPath("~/Bin/") </param>
        /// <returns>List Of Module Objects Filled with XML Values</returns>
        public static IEnumerable<Plugin> GetModules(string DirectoryToSearch, bool IsActive)
        {
            List<Plugin> Modules = new List<Plugin>();
            var moduleFiles = new DirectoryInfo(DirectoryToSearch).GetFiles("*.dll", SearchOption.AllDirectories);
            foreach (FileInfo moduleFileInfo in moduleFiles)
            {
                Plugin module = GetModuleInfo(moduleFileInfo, IsActive);
                if (module != null)
                    Modules.Add(module);
            }

            return Modules;
        }
        public static IEnumerable<Plugin> GetModules(string BinDirectory, string PluginRepositoryPath)
        {
            IEnumerable<Plugin> ActiveModules = GetModules(BinDirectory, true);
            IEnumerable<Plugin> ReadyToInstallModules = GetModules(PluginRepositoryPath, false);
            return ActiveModules.Concat(ReadyToInstallModules);
        }

        public static Assembly GetPluginAssembly(FileInfo moduleFileInfo)
        {
            using (FileStream fs = File.Open(moduleFileInfo.FullName, FileMode.Open))
            {
                using (MemoryStream ms = new MemoryStream())
                {

                    byte[] buffer = new byte[1024];

                    int read = 0;

                    while ((read = fs.Read(buffer, 0, 1024)) > 0)

                        ms.Write(buffer, 0, read);

                    var assem = Assembly.Load(ms.ToArray());
                    return assem;
                }
            }
        }
        public static Plugin GetModuleInfo(FileInfo moduleFileInfo, bool IsActive)
        {
            if (moduleFileInfo.Exists == false)
                return null;

            try
            {

                var _module = new Plugin();
                _module.FileName = moduleFileInfo.Name;

                Assembly assem = GetPluginAssembly(moduleFileInfo);
                Plugin moduleInfo = InvokePluginInfo(assem);
                if (moduleInfo != null)
                {
                    _module = moduleInfo;
                    _module.IsPlugin = true;
                    _module.FileName = moduleFileInfo.Name;
                    _module.Active = IsActive;
                    _module.AssemblyFilePath = moduleFileInfo.FullName;

                    _module.IconURL = "/Plugins/" + _module.Name + _module.IconURL;

                    if (_module.Active == false)
                        _module.IconURL = "/App_Data/" + _module.IconURL;

                    return _module;

                }
                else
                {
                    return null;
                }

            }
            catch
            {
                return null;
            }


        }


        public static void RunPluginConfigMethod(Assembly assem,string methodName,object[] parameters)
        {
            try
            {

                var types = assem.GetTypes();
                var moduleConfigType = types.FirstOrDefault(p => p.GetInterfaces().Any(d => d == typeof(IPluginConfig)));
             
                if (moduleConfigType == null)
                {
                    MethodInfo method = moduleConfigType.GetMethod(methodName);
                    IPluginConfig classInstance = (IPluginConfig)Activator.CreateInstance(moduleConfigType, null);
                    method.Invoke(classInstance, parameters);
                }
            }
            catch
            {
            }
        }

        #region invokes
        public static RouteModel[] InvokeRoutes(Assembly assem)
        {
            try
            {

                var types = assem.GetTypes();
                var moduleConfigType = types.FirstOrDefault(p => p.GetInterfaces().Any(d => d == typeof(IPluginConfig)));
                if (moduleConfigType == null)
                    return null;

                MethodInfo getUrlRoutes = moduleConfigType.GetMethod("GetUrlRoutes");
                IPluginConfig classInstance = (IPluginConfig)Activator.CreateInstance(moduleConfigType, null);
                RouteModel[] routes = (RouteModel[])getUrlRoutes.Invoke(classInstance, null);
                return routes;

            }
            catch
            {
                return null;
            }
        }

        public static PluginManageMenu InvokeManageMenu(Assembly assem)
        {
            try
            {

                var types = assem.GetTypes();
                var moduleConfigType = types.FirstOrDefault(p => p.GetInterfaces().Any(d => d == typeof(IPluginConfig)));
                if (moduleConfigType == null)
                    return null;

                MethodInfo getUrlRoutes = moduleConfigType.GetMethod("GetManageMenu");
                IPluginConfig classInstance = (IPluginConfig)Activator.CreateInstance(moduleConfigType, null);
                PluginManageMenu routes = (PluginManageMenu)getUrlRoutes.Invoke(classInstance, null);
                return routes;

            }
            catch
            {
                return null;
            }
        }


        public static Bundle[] InvokeBundles(Assembly assem)
        {
            try
            {

                var types = assem.GetTypes();
                var moduleConfigType = types.FirstOrDefault(p => p.GetInterfaces().Any(d => d == typeof(IPluginConfig)));
                if (moduleConfigType == null)
                    return null;

                MethodInfo getOptimizationBundles = moduleConfigType.GetMethod("GetOptimizationBundles");
                IPluginConfig classInstance = (IPluginConfig)Activator.CreateInstance(moduleConfigType, null);
                Bundle[] bundles = (Bundle[])getOptimizationBundles.Invoke(classInstance, null);

                return bundles;
            }
            catch
            {
                return null;
            }
        }
        public static Plugin InvokePluginInfo(Assembly assem)
        {
            try
            {
                var types = assem.GetTypes();
                var moduleConfigType = types.FirstOrDefault(p => p.GetInterfaces().Any(d => d == typeof(IPluginConfig)));
                if (moduleConfigType == null)
                    return null;

                MethodInfo getProperties = moduleConfigType.GetMethod("GetProperties");
                IPluginConfig classInstance = (IPluginConfig)Activator.CreateInstance(moduleConfigType, null);
                Plugin moduleInfo = (Plugin)getProperties.Invoke(classInstance, null);
                return moduleInfo;
            }
            catch
            {
                return null;
            }

        }



        #endregion

    }
}
