using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using HCMS.Dynamics.Forms;

namespace HCMS.Dynamics.Localization.Entities
{
    [Form(Caption = "Cultures")]
    public class Culture
    {
        public Culture()
        {
            this.Phrases = new List<Phrase>();
        }

        [Input(InputType = InputTypes.Hidden)]
        public int ID { get; set; }

        [Input(InputType = InputTypes.CheckBox)]
        public bool RTL { get; set; }
        public virtual ICollection<Phrase> Phrases { get; set; }
        [Input(InputType = InputTypes.SingleLineText)]

        public string LanguageEnglishName { get; set; }
        [Input(InputType = InputTypes.SingleLineText)]


        public string LanguageNativeName { get; set; }
        [Input(InputType = InputTypes.SingleLineText)]
        public string CountryName { get; set; }
        [Input(InputType = InputTypes.SingleLineText)]
        public string CountryNameAbbr { get; set; }
        [Input(InputType = InputTypes.SingleLineText)]
        public string LanguageNameAbbr { get; set; }

        public string CultureName()
        {
            return LanguageNameAbbr + "-" + CountryNameAbbr;
        }

    }

    public class CultureMap : EntityTypeConfiguration<Culture>
    {
        public CultureMap()
        {
            this.HasKey(p => p.ID);
            this.Property(p => p.ID).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.ToTable("Localization_Cultures");
        }
    }
}
