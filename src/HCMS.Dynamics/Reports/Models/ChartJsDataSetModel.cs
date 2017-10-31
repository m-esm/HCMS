using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HCMS.Dynamics.Reports.Models
{

    //datasets: [
    //  {
    //      label: "My First dataset",
    //      fillColor: "rgba(220,220,220,0.2)",
    //      strokeColor: "rgba(220,220,220,1)",
    //      pointColor: "rgba(220,220,220,1)",
    //      pointStrokeColor: "#fff",
    //      pointHighlightFill: "#fff",
    //      pointHighlightStroke: "rgba(220,220,220,1)",
    //      data: [65, 59, 80, 81, 56, 55, 40]
    //  }]

    public class ChartJsDataSetModel
    {
        public string label { get; set; }
        public string fillColor { get; set; }
        public string strokeColor { get; set; }
        public string pointColor { get; set; }
        public string pointStrokeColor { get; set; }
        public string pointHighlightFill { get; set; }
        public string pointHighlightStroke { get; set; }
        public int[] data { get; set; }
    }
}
