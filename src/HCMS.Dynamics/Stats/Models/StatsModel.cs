using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Stats.Models
{
   public class StatsModel
    {
       public int ID { get; set; }
       public string IP { get; set; }
       public string URL { get; set; }
       public string UserAgent { get; set; }

       public DateTime Time { get; set; }

       public string CustomTimeFormat { get; set; }
    }

   public class StatsMap : EntityTypeConfiguration<StatsModel>
   {
       public StatsMap()
       {
           this.ToTable("Dynamics_Stats");
           this.HasKey(p => p.ID);
       }
   }

  

}
