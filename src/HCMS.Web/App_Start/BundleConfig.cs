using HCMS.Dynamics.DSystem.Models;
using System;
using System.Collections.Generic;
using System.Web.Optimization;

namespace HCMS.Web
{

    class AsIsBundleOrderer : IBundleOrderer
    {
        public IEnumerable<BundleFile> OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
        {
            return files;
        }
    }
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            foreach (Plugin plugin in MvcApplication.Plugins)
            {
                try
                {
                    foreach (var item in plugin.GetOptimizationBundles())
                    {
                        if (item.RoutType == BundleTypes.Style)
                            bundles.Add(new StyleBundle(item.virtualPath).Include(item.Paths));

                        if (item.RoutType == BundleTypes.Script)
                            bundles.Add(new ScriptBundle(item.virtualPath).Include(item.Paths));
                    }
                }
                catch (Exception ex)
                {

                }
               
            }
           
           BundleTable.EnableOptimizations = true;
        }
    }
}
