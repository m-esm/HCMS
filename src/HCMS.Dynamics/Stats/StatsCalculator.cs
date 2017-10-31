using HCMS.Business;
using HCMS.Dynamics.Stats.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Stats
{
    public class StatsCalculator
    {
        GenericRepository<StatsModel> statsRepo = new GenericRepository<StatsModel>();
        public StatsGeneralDateInfoModel GetGeneralDateInfo()
        {
            var stats = statsRepo.GetAll();

            var stat = new StatsGeneralDateInfoModel();

            stat.TotalVisits = stats.Count();
            stat.TotalVisitors = stats.GroupBy(p => p.IP).Count();
            stat.VisitsThisYear = stats.Count(p => DateTime.Now.Year == p.Time.Year);
            //stat.VisitsThisYear = stats.Count(p => DbFunctions.DiffDays(DateTime.Now, p.Time) <= 365);
            stat.VisitorsThisYear =
                stats.Where(p => DateTime.Now.Year == p.Time.Year).GroupBy(p => p.IP).Count();

            //stat.VisitsThisMonth = stats.Where(p => DbFunctions.DiffDays(DateTime.Now, p.Time) <= 30).Count();
            stat.VisitsThisMonth = stats.Count(p => DateTime.Now.Year == p.Time.Year && DateTime.Now.Month == p.Time.Month);
            stat.VisitorsThisMonth =
                stats.Where(p => DateTime.Now.Year == p.Time.Year && DateTime.Now.Month == p.Time.Month).GroupBy(p => p.IP).Count();

            //stat.VisitsWeek = stats.Count(p => DateTime.Now.Year == p.Time.Year && DateTime.Now.Month == p.Time.Month && DateTime.Now.Day - Convert.ToInt32(DateTime.Now.DayOfWeek.ToString()) <= p.Time.Day);
            //stat.VisitorsWeek =
            //    stats.Where(p => DateTime.Now.Year == p.Time.Year && DateTime.Now.Month == p.Time.Month && DateTime.Now.Day == p.Time.Day).GroupBy(p => p.IP).Count();

            stat.VisitsToday = stats.Count(p => DateTime.Now.Year == p.Time.Year && DateTime.Now.Month == p.Time.Month && DateTime.Now.Day == p.Time.Day);
            //stat.VisitsToday = stats.Count(p => DbFunctions.DiffHours(DateTime.Now, p.Time) <= 24);
            stat.VisitorsToday =
                stats.Where(p => DateTime.Now.Year == p.Time.Year && DateTime.Now.Month == p.Time.Month && DateTime.Now.Day == p.Time.Day).GroupBy(p => p.IP).Count();

            return stat;
            //return new StatsGeneralDateInfoModel()
            //{
            //    TotalVisits = stats.Count(),
            //    TotalVisitors = stats.GroupBy(p => p.IP).Count(),
            //    //var test = DbFunctions.DiffDays(DateTime.Now , date);
            //    //VisitsThisYear = stats.Where(p =>  DbFunctions.DiffDays(DateTime.Now , p.Time) <= 365).Count(),
            //    VisitsThisYear = stats.Count(p => DbFunctions.DiffDays(DateTime.Now, p.Time) <= 365),
            //    VisitorsThisYear = stats.Where(p => DbFunctions.DiffDays(DateTime.Now, p.Time) <= 365).GroupBy(p => p.IP).Count(),

            //    VisitsThisMonth = stats.Where(p => DbFunctions.DiffDays(DateTime.Now, p.Time) <= 30).Count(),
            //    VisitorsThisMonth = stats.Where(p => DbFunctions.DiffDays(DateTime.Now, p.Time) <= 30).GroupBy(p => p.IP).Count(),

            //    VisitsToday = stats.Count(p => DbFunctions.DiffHours(DateTime.Now, p.Time) <= 24),
            //    VisitorsToday = stats.Where(p => DbFunctions.DiffHours(DateTime.Now, p.Time) <= 24).GroupBy(p => p.IP).Count(),
            //};

        }
    }

}
