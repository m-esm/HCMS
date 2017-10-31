using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.DSystem.Models
{
    public class PluginManageMenu
    {
        public PluginManageMenu()
        {
            Link = "#";
            Items = new List<PluginManageMenu>();
            SortId = -1;
        }

        public string CssClass { get; set; }
        public string Name { get; set; }
        public string Link { get; set; }
        public string Icon { get; set; }
        public int SortId { get; set; }
        public IEnumerable<PluginManageMenu> Items { get; set; }
    }
}
