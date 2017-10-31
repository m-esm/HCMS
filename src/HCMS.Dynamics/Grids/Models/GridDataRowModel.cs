using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Grids.Models
{
    public class GridDataRowModel
    {
        /// <summary>
        /// Primary Key Of Row
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// Array Of Cell Values
        /// </summary>
        public IEnumerable<string> Cells { get; set; }
    }
}
