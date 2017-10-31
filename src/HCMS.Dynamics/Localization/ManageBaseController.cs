using HCMS.Dynamics.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HCMS.Dynamics.Localization
{
    public class ManageBaseController : Controller
    {
        public Phrases _phrases;
        public Phrases Phrases
        {
            get
            {
                if (_phrases == null)
                    _phrases = new Phrases(ControllerContext);

                return _phrases;
            }
        }

        public string[] LocalizeErrors(string[] Errors)
        {
            List<string> LocalizedResult = new List<string>();
            foreach (var err in Errors)
                LocalizedResult.Add(Phrases.Get(err));

            return LocalizedResult.ToArray();
        }
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            ViewBag.Phrases = Phrases;
            base.OnActionExecuting(filterContext);
        }
        
    }
}