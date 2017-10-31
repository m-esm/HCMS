using HCMS.Business;
using HCMS.Dynamics.Localization.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using HCMS.Dynamics.Localization;
using Newtonsoft.Json;
using System.IO;
namespace HCMS.Web.Areas.Manage.Controllers
{
    [HCMS.Security.Infrastructer.MyAuthorize("developer,admin")]
    public class CulturesController : ManageBaseController
    {
        GenericRepository<Culture> culturesDb = new GenericRepository<Culture>();
        GenericRepository<Phrase> phrasesDb = new GenericRepository<Phrase>();
        GenericRepository<PhraseKey> phrasesKeyDb = new GenericRepository<PhraseKey>();
        public ActionResult Index()
        {
            var model = culturesDb.GetAll();
            return View(model);
        }

        public ActionResult Edit(int id)
        {
            var model = culturesDb.Find(id);
            return View(model);
        }

        [HttpPost]
        public ActionResult Edit(Culture model)
        {
            culturesDb.Update(model, model.ID);
            Phrases.ClearCurrentCultureCache(model.CultureName());

            return RedirectToAction("Index");
        }


        public ActionResult Export(int id)
        {
            var key = culturesDb.Find(id);
            ViewBag.cultere = key.CountryNameAbbr + "-" + key.LanguageNameAbbr;


            var test = phrasesDb.Where(a => a.CultureID == key.ID);



            return View(test.ToList());
        }

        [HttpPost]
        public ActionResult Export(int? caltureId, int[] selectedItem)
        {
            if (caltureId == null)
            {
                return new HttpStatusCodeResult(System.Net.HttpStatusCode.BadRequest);
            }
            var culture = culturesDb.Find(caltureId.Value);
            if (culture == null)
            {
                return HttpNotFound();
            }

            var model = new
            {
                culture = culture.CultureName(),
                phrases = culture.Phrases.Where(p => selectedItem.Contains(p.PhraseKeyID)).Select(p => new
                {
                    key = p.PhraseKey.Key,
                    value = p.Value
                })
            };


            Response.Clear();
            Response.ContentType = "application/octet-stream";
            Response.Headers.Add("Content-Disposition", string.Format("inline;filename='Localization Export {0}'", culture.CultureName()));
            Response.Write(JsonConvert.SerializeObject(model, Formatting.Indented));

            return new EmptyResult();

        }

        [HttpPost]
        public ActionResult Import(bool overWrite = false)
        {
            if (Request.Files.Count != 1)
                return new HttpStatusCodeResult(System.Net.HttpStatusCode.BadRequest, "No file sent");

            string json = "";
            using (var reader = new StreamReader(Request.Files[0].InputStream, Encoding.UTF8))
            {
                json = reader.ReadToEnd();
            }

            if(string.IsNullOrWhiteSpace(json))
                return new HttpStatusCodeResult(System.Net.HttpStatusCode.BadRequest, "Empty file sent");

            var export = JsonConvert.DeserializeObject<dynamic>(json);
            string cultureName = (string)export.culture;
            var culture = culturesDb.GetAll().AsEnumerable().FirstOrDefault(p => p.CultureName() == cultureName);
            if (culture == null)
                culture = culturesDb.Add(new Culture()
                {
                    LanguageNameAbbr = cultureName.Split('-')[0],
                    CountryNameAbbr = cultureName.Split('-')[1]
                });

            foreach (dynamic phrase in export.phrases)
            {
                string phraseKey = (string)phrase.key;
                var key = phrasesKeyDb.Get(p => p.Key == phraseKey);
                if (key == null)
                    key = phrasesKeyDb.Add(new PhraseKey { Key = phraseKey });

                var phraseRow = phrasesDb.Get(p => p.CultureID == culture.ID && p.PhraseKeyID == key.ID);
                if (phraseRow == null || overWrite)
                {
                    if (phraseRow != null)
                        phrasesDb.Remove(phraseRow);

                    phraseRow = phrasesDb.Add(new Phrase { CultureID = culture.ID, PhraseKeyID = key.ID, Value = phrase.value });

                }



            }

            return RedirectToAction("index");

        }


    }
}
