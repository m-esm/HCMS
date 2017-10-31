using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Grids.Models
{


    public class GridUserSettingsModel
    {

        [Key]
        public int ID { get; set; }

        /// <summary>
        /// Total row showing in each page
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// Name Of grid will be used in html and jquery as #id
        /// </summary>
        public string Name { get; set; }

        public Guid UserID { get; set;  }

    }

    public class GridUserSettingsMap : EntityTypeConfiguration<GridUserSettingsModel>
    {
        public GridUserSettingsMap()
        {
            
            this.ToTable("Dynamics_Grid_UserSettings");
        }
    }

    [NotMapped]
    public class GridModel : GridUserSettingsModel
    {
        /// <summary>
        /// Defines the caption for the grid. This caption appears in the caption layer, which is above the header layer (see How It Works). If the string is empty the caption does not appear.
        /// </summary>
        public string Caption { get; set; }

        public string DataURL { get; set; }

        /// <summary>
        /// mtype :Defines the type of request to make
        /// (“POST” or “GET”)
        /// </summary>
        public string AjaxMethod { get; set; }


        public virtual IEnumerable<GridColModel> ColModels { get; set; }

    }

 


}
