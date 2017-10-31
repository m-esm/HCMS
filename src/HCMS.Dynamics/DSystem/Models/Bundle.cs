using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.DSystem.Models
{
    public class Bundle
    {
        public string virtualPath { get; set; }
        public BundleTypes RoutType { get; set; }
        public string[] Paths { get; set; }

    }
    public enum BundleTypes
    {
        Script,
        Style
    }
}
