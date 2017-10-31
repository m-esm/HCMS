using HCMS.Business;
using HCMS.Dynamics.DSystem.Models;
using HCMS.Security.Infrastructer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using HCMS.Dynamics.Tools;
using HCMS.Dynamics.Localization;
namespace HCMS.Web.Areas.Manage.Controllers
{
    [MyAuthorize("developer,admin")]
    public class RoutesController : ManageBaseController
    {
        GenericRepository<RouteModel> routes_context = new GenericRepository<RouteModel>();
        // GET: Manage/Routes
        public ActionResult Index()
        {

            var model = routes_context
                .GetAll()
                .OrderByDescending(p => p.SortId);

            return View(model);

        }




        public ActionResult Install()
        {



            //    routes_context.Add(model);

            RouteConfig.RegisterRoutes(RouteTable.Routes);

            return RedirectToAction("index");
        }

        public ActionResult Create_Defaults()
        {
            var DefualtRoutes = new RouteModel[] {
            
            new RouteModel {
              Name = "Route 1", Defaults = "action=index,controller=pages,viewname=home,ln=en,cn=us", Enable = true, Namespaces = "HCMS.Web.Controllers", SortId = 1, URL ="{ln}-{cn}/{viewName}"},
                   new RouteModel {
              Name = "Route 2", Defaults = "action=index,controller=pages,viewname=home,ln=en,cn=us", Enable = true, Namespaces = "HCMS.Web.Controllers", SortId = 0, URL ="{viewName}"},
                   new RouteModel {
              Name = "Route 3", Defaults = "action=index,controller=pages,viewname=home,ln=en,cn=us", Enable = true, Namespaces = "HCMS.Web.Controllers", SortId = -1, URL ="{ln}-{cn}"}};

            foreach (var item in DefualtRoutes)
            {
                routes_context.Add(item);
            }

            RouteConfig.RegisterRoutes(RouteTable.Routes);


            return RedirectToAction("index");

        }
        public ActionResult Create()
        {
            return View(new RouteModel());



        }

        [HttpPost]
        public ActionResult Create(RouteModel model)
        {

            if (routes_context.GetAll().AsEnumerable().Any(p => p.Name.TrimLower() == model.Name.TrimLower()))
            {
                ModelState.AddModelError("", "It Exist !");
                return View(model);
            }


            routes_context.Add(model);

            RouteConfig.RegisterRoutes(RouteTable.Routes);
            return RedirectToAction("index");
        }

        public ActionResult Edit(int id)
        {
            var model = new RouteModel();
            model = routes_context.Find(id);
            return View(model);
        }

        [HttpPost]
        public ActionResult Edit(RouteModel model)
        {
            routes_context.Update(model, model.ID);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            return RedirectToAction("index");

        }


        public ActionResult Delete(int id)
        {

            routes_context.Remove(routes_context.Find(id));
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            return RedirectToAction("index");

        }


    }
}