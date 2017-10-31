using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Forms.Models
{
    public class SectionMap : EntityTypeConfiguration<Section>
    {
        public SectionMap()
        {
            this.ToTable("Dynamics_Forms_Section");
            this.HasKey(p => p.ID);
            this.HasMany(p => p.Forms).WithRequired(p => p.Section).HasForeignKey(p => p.SectionID);

        }
    }
    [Form(Caption="بخش")]
    public class Section
    {
        [Input(Label = "Key", InputType = InputTypes.Hidden)]
        public int ID { get; set; }
        [Input(Label = "Name(En)", InputType = InputTypes.SingleLineText, CssClass = "input-block-level", InputDivCssClass = "col-md-12")]
        public string Name { get; set; }

        [Input(Label = "Caption(En)", InputType = InputTypes.SingleLineText, CssClass = "input-block-level", InputDivCssClass = "col-md-12")]
        public string Caption { get; set; }

        [Display(Name = "Forms")]
        public virtual ICollection<Form> Forms { get; set; }

        [Input(Label = "Sort Id", InputType = InputTypes.Number, CssClass = "input-block-level", InputDivCssClass = "col-md-12")]
        public int OrderID { get; set; }

        [Input(Label = "Show In Menu", InputType = InputTypes.CheckBox, CssClass = "input-block-level", InputDivCssClass = "col-md-12")]
        public bool ShowInMenu { get; set; }

        [Input(Label = "After Save - Hook URL", InputDivCssClass = "col-md-12", InputType = InputTypes.SingleLineText)]
        public string AfterSaveHook { get; set; }

    }
}
