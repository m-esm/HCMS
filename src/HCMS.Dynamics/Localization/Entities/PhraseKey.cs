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

    [Form(Caption = "Phrase Keys")]
    public class PhraseKey
    {

        [Input(InputType = InputTypes.Hidden)]
        public int ID { get; set; }
        public virtual ICollection<Phrase> Phrases { get; set; }

        [Input(InputType = InputTypes.SingleLineText, CssClass = "col-md-12")]
        public string Key { get; set; }

    }

    public class PhraseKeyMap : EntityTypeConfiguration<PhraseKey>
    {
        public PhraseKeyMap()
        {
            this.HasKey(p => p.ID);
            this.Property(p => p.ID).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.ToTable("Localization_PhraseKeys");
        }
    }
}
