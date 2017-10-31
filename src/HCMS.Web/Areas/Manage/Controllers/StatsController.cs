using HCMS.Business;
using HCMS.Dynamics.Stats.Models;
using HCMS.Dynamics.Tools;
using HCMS.Web.Hubs;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MoreLinq;
using HCMS.Dynamics.Reports.Models;
using HCMS.Dynamics.Localization;
using HCMS.Security.Infrastructer;
namespace HCMS.Web.Areas.Manage.Controllers
{
     [MyAuthorize("developer,admin,user")]
    public class StatsController : ManageBaseController
    {
        GenericRepository<StatsModel> StatsRepo = new GenericRepository<StatsModel>();
        // GET: Manage/Stats
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Submit(string URL)
        {
            if (string.IsNullOrWhiteSpace(URL))
                return new EmptyResult();

            URL = URL.Replace(Request.Url.GetLeftPart(UriPartial.Authority), "");

            StatsModel statsModel = new StatsModel();
            statsModel.IP = Request.UserHostAddress;
            statsModel.UserAgent = Request.UserAgent;
            statsModel.URL = URL;
            statsModel.Time = DateTime.Now;


            HttpContext.Cache.Add(
                key: string.Format("dynamics_stats_{0}_{1}", statsModel.IP, DateTime.Now.Ticks),
                value: statsModel,
                dependencies: null,
                absoluteExpiration: DateTime.Now.AddYears(1),
                slidingExpiration: System.Web.Caching.Cache.NoSlidingExpiration,
                onRemoveCallback: null,
                priority: System.Web.Caching.CacheItemPriority.Normal
                );

            var hubContext = Microsoft.AspNet.SignalR.GlobalHost.ConnectionManager.GetHubContext<DSystemHub>();
            hubContext
                .Clients
                .All
                .AddToLogList(statsModel);

            return new EmptyResult();
        }

        public ActionResult ChartJsData(string query = "month")
        {
            var visits = ChartValues(query, "visits");
            var visitors = ChartValues(query, "visitors");
            var labels = ChartLabels(query);

            var chartJsDataModel = new ChartJsDataModel();
            var chartJsDataSets = new ChartJsDataSetModel[2];

            chartJsDataModel.labels = labels;

            chartJsDataSets[0] = new ChartJsDataSetModel();
            chartJsDataSets[0].label = "Visits";
            chartJsDataSets[0].data = visits;
            chartJsDataSets[0].fillColor = "transparent";
            chartJsDataSets[0].strokeColor = "rgb(253, 193, 14)";
            chartJsDataSets[0].pointColor = "rgb(253, 193, 14)";

            chartJsDataSets[1] = new ChartJsDataSetModel();
            chartJsDataSets[1].label = "Visitors";
            chartJsDataSets[1].data = visitors;
            chartJsDataSets[1].fillColor = "transparent";
            chartJsDataSets[1].strokeColor = "rgb(33, 150, 243)";
            chartJsDataSets[1].pointColor = "rgb(33, 150, 243)";




            chartJsDataModel.datasets = chartJsDataSets;

            Response.ContentType = "application/json";
            Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(chartJsDataModel, Newtonsoft.Json.Formatting.Indented));
            return new EmptyResult();

        }
        public int[] ChartValues(string query, string dataset)
        {

            if (query == "month")
            {

                DateTime Start = DateTime.Parse(string.Format("{0}/{1}/{2}", DateTime.Now.Year, DateTime.Now.Month, 1));
                int DaysInMonth = DateTime.DaysInMonth(Start.Year, Start.Month);

                var stats = StatsRepo.GetAll()
                       .Where(p => DbFunctions.DiffDays(p.Time, Start) >= 0);

                int[] result = new int[DateTime.Now.Day];
                for (int i = 0; i < DaysInMonth; i++)
                {
                    if (DateTime.Now.Day > i)
                    {
                        if (dataset == "visitors")
                            result[i] = StatsRepo.Where(p => p.Time.Day == i + 1).GroupBy(p => p.IP).Count();

                        if (dataset == "visits")
                            result[i] = StatsRepo.Where(p => p.Time.Day == i + 1).Count();
                    }
                }

                //var result = StatsRepo.GetAll()
                //        .Where(p => DbFunctions.DiffDays(p.Time, Start) >= 0)
                //        .GroupBy(p => p.Time.Day)
                //        .Select(p => p.DistinctBy(d => d.IP).Count());

                return result;

            }


            if (query == "year")
            {

                DateTime Start = DateTime.Parse(string.Format("{0}/{1}/{2}", DateTime.Now.Year, 1 , 1));

                var stats = StatsRepo.GetAll()
                       .Where(p => DbFunctions.DiffDays(p.Time, Start) >= 0);

                int[] result = new int[12];
                for (int i = 1; i <= 12; i++)
                {
                 
                        if (dataset == "visitors")
                            result[i - 1] = StatsRepo.Where(p => p.Time.Month == i).GroupBy(p => p.IP).Count();

                        if (dataset == "visits")
                            result[i - 1] = StatsRepo.Where(p => p.Time.Month == i).Count();
                 
                }

                //var result = StatsRepo.GetAll()
                //        .Where(p => DbFunctions.DiffDays(p.Time, Start) >= 0)
                //        .GroupBy(p => p.Time.Day)
                //        .Select(p => p.DistinctBy(d => d.IP).Count());

                return result;

            }


            return new int[0];
        }
        public string[] ChartLabels(string query)
        {
            var result = new List<string>();

            if (query == "month")
            {
                int year = DateTime.Now.Year;
                int month = DateTime.Now.Month;
                int daysInMonth = DateTime.DaysInMonth(year, month);
                for (int day = 1; day <= daysInMonth; day++)
                    if (DateTime.Now.Day >= day)
                        result.Add(string.Format("{0}/{1}/{2}", year, month.ToString().PadLeft(2, '0'), day.ToString().PadLeft(2, '0')));

            }
            if (query == "year")
            {
                int year = DateTime.Now.Year;
                for (int i = 1; i <= 12; i++)
                        result.Add(string.Format("{0}/{1}", year, i.ToString().PadLeft(2, '0')));

            }

            return result.ToArray();

        }

    }
}