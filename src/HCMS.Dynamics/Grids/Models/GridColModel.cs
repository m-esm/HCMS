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


    public class GridColUserSettingsModel {

        [Key]
        public int ID { get; set; }

        public string GridName { get; set; }

        public Guid UserID { get; set; }

        /// <summary>
        /// Defines the alignment of the cell in the Body layer, not in header cell. Possible values: left, center, right.
        /// <para>Default : left</para>
        /// </summary>
        public string Align { get; set; }

        /// <summary>
        /// Ascending || Descending || Null
        /// </summary>
        public string DefaultSortType { get; set; }

        public int OrderID { get; set; }
   
        /// <summary>
        /// Using When rendering columns - server side
        /// </summary>
        public GridColFormats ColFormat { get; set; }

        /// <summary>
        /// Set the unique name in the grid for the column. This property is required. As well as other words used as property/event names, the reserved words (which cannot be used for names) include subgrid, cb and rn.
        /// <para>Required</para>
        /// </summary>
        public string Name { get; set; }

    }

    public class GridColUserSettingsMap : EntityTypeConfiguration<GridColUserSettingsModel>
    {
        public GridColUserSettingsMap()
        {
            this.ToTable("Dynamics_Grid_Column_UserSettings");
        }
    }

       [NotMapped]
    public class GridColModel : GridColUserSettingsModel
    {
    

        /// <summary>
        /// This option allow to add classes to the column. If more than one class will be used a space should be set. By example classes:'class1 class2' will set a class1 and class2 to every cell on that column. In the grid css there is a predefined class ui-ellipsis which allow to attach ellipsis to a particular row. Also this will work in FireFox too.
        /// <para>Default : empty string </para>
        /// </summary>
        public string CssClasses { get; set; }

        /// <summary>
        /// Defines if the field is editable. This option is used in cell, inline and form modules.
        /// <para>Default : false </para>
        /// </summary>
        public bool Editable { get; set; }

   

        /// <summary>
        /// Defines the heading for this column.
        /// Default : Property Name
        /// </summary>
        public string Label { get; set; }



        /// <summary>
        /// To get relational match
        /// </summary>
        public string GetValueMatch { get; set; }

    }

    public enum GridColFormats
    {
        Rial = 0,
        Dollar = 1,
        Time = 2
    }

}
