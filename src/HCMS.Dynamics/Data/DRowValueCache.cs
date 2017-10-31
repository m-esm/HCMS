using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Data
{
    public class DRowValueCache
    {
        public override string ToString()
        {
            if (this == null)
                return "";


            if (string.IsNullOrWhiteSpace(this.Value))
                return this.SubRowId.ToString();

            return this.Value;

        }
        public int ID { get; set; }

        public int? ValueId { get; set; }
        public int? SubRowId { get; set; }
        public int? IndexInGroup { get; set; }
        public int RowId { get; set; }
        public int? CultureId { get; set; }
        public string Value { get; set; }
        public string Match { get; set; }
        public bool Localize { get; set; }
        public string UserId { get; set; }
      
    }

    public class DRowValueMap : EntityTypeConfiguration<DRowValueCache>
    {
        public DRowValueMap()
        {
            this.ToTable("Dynamics_Forms_Value_Cache");

            this.HasKey(p => p.ID);

            this.Property(p => p.ID).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }

}
