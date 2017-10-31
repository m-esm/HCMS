using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Data
{
    public class DRowValueGroupCache
    {
        public int ID { get; set; }
        public int RowID { get; set; }
        public string GroupName { get; set; }

        /// <summary>
        /// شماره ردیف های موجود در گروه جداشده با دو نقطه
        /// </summary>
        public string GroupRows { get; set; }
    }


    public class DRowValueGroupCacheMap : EntityTypeConfiguration<DRowValueGroupCache>
    {
        public DRowValueGroupCacheMap()
        {
            this.ToTable("Dynamics_Forms_Value_Group_Cache");

            this.HasKey(p => p.ID);
            this.Property(p => p.ID).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

        }
    }

}
