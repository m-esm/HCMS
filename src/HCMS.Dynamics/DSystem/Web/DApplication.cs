using HCMS.Dynamics.DSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.DSystem.Web
{
    public  class DApplication : System.Web.HttpApplication
    {
        protected static string _currentTheme;
        public static string currentTheme
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_currentTheme))
                    _currentTheme = Settings.Get("Dynamics.System.Theme");

                return _currentTheme;

            }
            set
            {
                _currentTheme = value;
            }
        }

        protected static Plugin[] _Plugins;
        public static Plugin[] Plugins
        {
            get
            {

                if (_Plugins == null)
                    _Plugins = Plugable.GetModules(System.Web.HttpRuntime.BinDirectory, true).Where(p => p.IsPlugin).ToArray();

                return _Plugins;

            }
        }

       // public static List<System.Web.Routing.Route> RegistredRoutes { get; set; }
        public void DApplication_Start()
        {

            HCMS.Dynamics.Stats.StatsTimer.Start();

            HCMS.Business.DbInitializer.Init();

            foreach (HCMS.Dynamics.DSystem.Models.Plugin plugin in Plugins)
            {
                plugin.ApplicationStart();
            }

        }

        public void DApplication_End()
        {

            foreach (Plugin plugin in Plugins)
            {
                plugin.ApplicationEnd();
            }
        }
    }
}
