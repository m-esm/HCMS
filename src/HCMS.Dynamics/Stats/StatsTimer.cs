using HCMS.Business;
using HCMS.Dynamics.Stats.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace HCMS.Dynamics.Stats
{
    public static class StatsTimer
    {
        public static void Start()
        {
            Timer timer = new Timer(TimerTick);
            timer.Change(0, 5000);
        }
        public static void TimerTick(object sender)
        {
            GenericRepository<StatsModel> stats = new GenericRepository<StatsModel>();
            foreach (System.Collections.DictionaryEntry d in HttpRuntime.Cache)
            {
                
                if (d.Key.ToString().StartsWith("dynamics_stats_"))
                {
                    var statsModel = d.Value as StatsModel;
                    stats.Add(statsModel);
                    HttpRuntime.Cache.Remove(d.Key.ToString());
                }
            }
        }
    }
}
