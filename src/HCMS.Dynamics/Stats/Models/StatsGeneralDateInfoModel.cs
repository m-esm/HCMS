using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Stats.Models
{
   public class StatsGeneralDateInfoModel
    {
       public int VisitsToday { get; set; }
       public int VisitorsToday { get; set; }

       public int VisitsWeek { get; set; }
       public int VisitorsWeek { get; set; }

       public int VisitsThisMonth { get; set; }
       public int VisitorsThisMonth { get; set; }

       public int VisitsThisYear { get; set; }
       public int VisitorsThisYear { get; set; }

       public int TotalVisits { get; set; }
       public int TotalVisitors { get; set; }
    }
}
