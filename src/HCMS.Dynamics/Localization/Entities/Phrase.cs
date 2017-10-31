using System;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using HCMS.Dynamics.Forms;

namespace HCMS.Dynamics.Localization.Entities
{

    [Form(Caption = "Phrases")]
   public class Phrase 
    {
   
        [Input(InputType = InputTypes.Hidden)]
        public int ID { get; set; }
        public virtual Culture Culture { get; set; }
        public virtual PhraseKey PhraseKey { get; set; }
        public int CultureID { get; set; }

        public int PhraseKeyID { get; set; }


        [Input(InputType = InputTypes.SingleLineText)]
        public string Value { get; set; }
    }

   public class PhraseMap : EntityTypeConfiguration<Phrase>
   {
       public PhraseMap()
       {

           this.HasKey(p => p.ID);

           this.HasRequired(p => p.Culture)
               .WithMany(p => p.Phrases)
               .HasForeignKey(p => p.CultureID)
               .WillCascadeOnDelete(false);


           this.HasRequired(p => p.PhraseKey)
              .WithMany(p => p.Phrases)
              .HasForeignKey(p => p.PhraseKeyID)
              .WillCascadeOnDelete(false);

           this.Property(p => p.ID).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

           this.ToTable("Localization_Phrases");
       }
   }

}
