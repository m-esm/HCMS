using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Tools
{
    public class MailTemplate
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Template { get; set; }

    }

    public class MailTemplateMap : EntityTypeConfiguration<MailTemplate>
    {
        public MailTemplateMap()
        {
            this.ToTable("Dynamics_MailTemplates");
            this.HasKey(p => p.ID);
            this.Property(p => p.ID).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

        }
    }
}
