using HCMS.Business;
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
    public class PhrasesController : ManageBaseController
    {
        GenericRepository<Phrase> PhraseDb = new GenericRepository<Phrase>();
        GenericRepository<Culture> CulturesDb = new GenericRepository<Culture>();
        public ActionResult Index()
        {

            // Remove Duplicates
            var duplicatesGroup = PhraseDb.GetAll()
                .GroupBy(p => p.CultureID + p.PhraseKey.Key)
                .Where(p => p.Count() > 1);
            if (duplicatesGroup.Count() > 0)
            {
                List<int> duplicatePIDs = new List<int>();
                foreach (var group in duplicatesGroup)
                    foreach (var item in group.Skip(1))
                        duplicatePIDs.Add(item.ID);
                PhraseDb.BulkRemove(p => duplicatePIDs.Contains(p.ID));
         
            }


            var model = CulturesDb.GetAll().OrderBy(p => p.Phrases.Count());

            return View(model);
        }

        [HttpPost]
        public string Update(int phraseId, string value)
        {
            var phrase = PhraseDb.Find(phraseId);
            phrase.Value = value;
            PhraseDb.Update(phrase, phraseId);
            Phrases.ClearCurrentCultureCache(phrase.Culture.CultureName());
            return "OK";
        }

        [HttpPost]
        public string Delete(int phraseId)
        {
            var phrase = PhraseDb.Find(phraseId);

            if (phrase == null)
                return "OK";


            Phrases.ClearCurrentCultureCache(phrase.Culture.CultureName());

            PhraseDb.Remove(phrase);



            return "OK";
        }


    }
}
