using HCMS.Dynamics.Localization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Forms.Models
{

    public class FormMap : EntityTypeConfiguration<Form>
    {
        public FormMap()
        {
            this.ToTable("Dynamics_Forms_Form");
            this.HasKey(p => p.ID);
            this.HasMany(p => p.Fields).WithRequired(p => p.Form).HasForeignKey(p => p.FormID);
       
        }
    }
    [Serializable]
    [Form(Caption = "Form")]
    public class Form
    {
        public Form()
        {
            this.Fields = new List<Field>();
            Method = "POST";
        }

        public string GetCaption(CaptionModes mode,Phrases phrases)
        {
            switch (mode)
            {
                case CaptionModes.List:
                    return string.Format( phrases.Get("List of") + " {0} ",phrases.Get( Caption));

                case CaptionModes.Create:
                    return string.Format(phrases.Get("Create") + " {0} ", phrases.Get(Caption));


                case CaptionModes.Edit:
                    return string.Format(phrases.Get("Edit") + " {0} ", phrases.Get(Caption));

                case CaptionModes.Delete:
                    return string.Format(phrases.Get("Delete") + " {0} ", phrases.Get(Caption));


                case CaptionModes.Details:
                    return string.Format(phrases.Get("Details Of") + " {0} ", phrases.Get(Caption));



                default:
                    return Caption;
            }
        }

        [Input(Label = "Key", InputType = InputTypes.Hidden)]
        public int ID { get; set; }

        [Input(Label = "Name(En)", InputType = InputTypes.SingleLineText,OrderID = 0, CssClass = "input-block-level en", InputDivCssClass = "col-md-3")]
        public string Name { get; set; }

        [Input(Label = "Caption(En)",OrderID = 1, InputType = InputTypes.SingleLineText, CssClass = "input-block-level", InputDivCssClass = "col-md-3")]
        public string Caption { get; set; }
        [Input(Label = "Method", OrderID = 2, InputType = InputTypes.SingleLineText, CssClass = "en", InputDivCssClass = "col-md-3")]
        public string Method { get; set; }

        [Input(Label = "Section", OrderID = 3, InputType = InputTypes.DropDown, DataURL = "/Manage/data/Sections", CssClass = "input-block-level", InputDivCssClass = "col-md-3")]
        public int SectionID { get; set; }
        public virtual ICollection<Field> Fields { get; set; }
        public virtual Section Section { get; set; }

        [Input(Label = "Action URL",Placeholder="For Ex : Http://Action_URL", OrderID = 4, InputType = InputTypes.SingleLineText, CssClass = "en", InputDivCssClass = "col-md-12")]
        public string ActionURL { get; set; }

        [Input(Label = "Grid Type", OrderID = 4, InputType = InputTypes.DropDown, DataURL = "/Manage/data/GetEnumJson?EnumName=GridTypes", CssClass = "en", InputDivCssClass = "col-md-12")]
        public int GridType { get; set; }

        [Input(Label = "URL to redirect after submit", InputDivCssClass = "col-md-12", InputType = InputTypes.SingleLineText)]
        public string SubmitRedirectURL { get; set; }

        [Input(Label = "After Save - Hook URL", InputDivCssClass = "col-md-12", InputType = InputTypes.SingleLineText)]
        public string AfterSaveHook { get; set; }

        public string ReadAccessRole { get; set; }
        public string CreatAccessRole { get; set; }
        public string EditAccessRole { get; set; }
        public string DeleteAccessRole { get; set; }

    }
}
