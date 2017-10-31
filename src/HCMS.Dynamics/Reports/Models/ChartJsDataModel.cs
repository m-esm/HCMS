using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Reports.Models
{
    public class ChartJsDataModel
    {
        public string[] labels { get; set; }
        public ChartJsDataSetModel[] datasets { get; set; }
    }
}
