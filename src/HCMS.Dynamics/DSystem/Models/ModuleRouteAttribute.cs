using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.DSystem.Models
{
    [AttributeUsage(AttributeTargets.Method)]
    public class ModuleRouteAttribute : Attribute
    {
        public ModuleRouteAttribute(string Controller, string Action)
        {

        }

        /// <summary>
        /// Using Like "/Modules/
        /// </summary>
        /// <param name="Route"></param>
        public ModuleRouteAttribute(string Route)
        {

        }
    }
}
