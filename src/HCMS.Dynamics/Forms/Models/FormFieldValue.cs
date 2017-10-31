using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Forms.Models
{
    public class FormFieldValueMap : EntityTypeConfiguration<FormFieldValue>
    {
        public FormFieldValueMap()
        {
            this.ToTable("Dynamics_Forms_Value");
            this.HasKey(p => p.ID);
        }
    }
    public class FormFieldValue
    {
        public int ID { get; set; }

        public int RowID { get; set; }

        public int FieldID { get; set; }

        public string Value { get; set; }

        public int? RelatedToID { get; set; }

        public int? CultureID { get; set; }

        public string CreatorUserId { get; set; }

        public string UserId { get; set; }

        public DateTime CreateDate { get; set; }
        public DateTime ChangeDate { get; set; }

        public virtual Field Field { get; set; }

    }
}