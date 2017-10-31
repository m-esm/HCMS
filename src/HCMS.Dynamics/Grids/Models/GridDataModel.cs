using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Grids.Models
{



    public class GridDataModel
    {

        public int CurrentPage { get; set; }
        public int TotalRecords { get; set; }
        public virtual IEnumerable<GridDataRowModel> Rows { get; set; }

    }
   
}
