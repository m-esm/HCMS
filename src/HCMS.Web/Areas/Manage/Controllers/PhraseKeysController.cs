using HCMS.Business;
using HCMS.Dynamics.Forms;
using HCMS.Dynamics.Localization.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using HCMS.Dynamics.Localization;
using HCMS.Security.Infrastructer;
namespace HCMS.Web.Areas.Manage.Controllers
{
  [MyAuthorize("developer,admin")]
    public class PhraseKeysController : ManageBaseController
    {
        GenericRepository<PhraseKey> PhraseKeysDb = new GenericRepository<PhraseKey>();
        public ActionResult Index()
        {
            var model = PhraseKeysDb.GetAll();
            return View(model);
        }
    }
}
