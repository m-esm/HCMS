using HCMS.Dynamics.Forms;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.DSystem.Models
{

    [Form(Caption = "Routes")]
    public class RouteModel
    {
        [Input(InputType = InputTypes.Hidden)]
        public int ID { get; set; }


        /// <summary>
        /// Route Name
        /// </summary>
        [Input(Required = true, InputType = InputTypes.SingleLineText, InputDivCssClass = "col-md-6", Label = "Route name", CssClass = "en")]
        public string Name { get; set; }


        /// <summary>
        /// EX : "{controller}/{action}/{id}"
        /// </summary>
        [Input(Required = true, InputType = InputTypes.SingleLineText, InputDivCssClass = "col-md-6", Label = "URL", CssClass = "en")]
        public string URL { get; set; }


        /// <summary>
        /// EX : [ controller = "Pages", action = "Index", ViewName = "Home" ]
        /// </summary>
        [Input(Required = true, InputType = InputTypes.TextArea, Placeholder = "", InputDivCssClass = "col-md-6", Label = "Defaults", CssClass = "en")]
        public string Defaults { get; set; }

        /// <summary>
        /// EX : HCMS.Module1
        /// </summary>
        [Input(InputType = InputTypes.TextArea, Placeholder = "", InputDivCssClass = "col-md-6", Label = "Namespaces", CssClass = "en")]
        public string Namespaces { get; set; }

        [Input(InputType = InputTypes.CheckBox, Placeholder = "", InputDivCssClass = "col-md-2", Label = "Enable", CssClass = "en")]
        public bool Enable { get; set; }

        [Input(InputType = InputTypes.Number, Placeholder = "", InputDivCssClass = "col-md-2", Label = "Sort number", CssClass = "en")]
        public int SortId { get; set; }
    }

    public class RouteMap : EntityTypeConfiguration<RouteModel>
    {
        public RouteMap()
        {
            this.ToTable("Dynamics_System_Routes");
            this.HasKey(p => p.ID);
            this.Property(p => p.ID).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }

}
