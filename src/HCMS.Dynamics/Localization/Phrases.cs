using HCMS.Business;
using HCMS.Dynamics.Data;
using HCMS.Dynamics.Localization.Entities;
using HCMS.Dynamics.Localization.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace HCMS.Dynamics.Localization
{

    /// <summary>
    /// UI tool for localizing phrases
    /// </summary>
    public class Phrases
    {
        protected GenericRepository<Phrase> PhrasesDb = new GenericRepository<Phrase>();
        protected GenericRepository<PhraseKey> PhraseKeysDb = new GenericRepository<PhraseKey>();
        protected GenericRepository<Culture> culturesDb = new GenericRepository<Culture>();

        public IEnumerable<Culture> GetAllCultures()
        {
            return culturesDb.GetAll();
        }

        public string _prefix;

        /// <summary>
        /// Prefix used in system for seperating plguin , area & theme phrases 
        /// </summary>
        public string Prefix
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_prefix))
                    return "";

                return _prefix;
            }
            set
            {
                _prefix = value;
            }
        }

        protected Culture _culture;
        /// <summary>
        /// Current Culture filled from constructure by ViewContext ( RouteData Values )
        /// </summary>
        public Culture CurrentCulture
        {
            get
            {
                if (_culture == null)
                    throw new Exception("Culture not set !");

                return _culture;

            }
            set
            {
                _phrasesToSearch = null;
                _culture = value;
            }
        }

        public IEnumerable<PhraseSearchModel> _phrasesToSearch;
        public IEnumerable<PhraseSearchModel> PhrasesToSearch
        {
            get
            {
                if (_phrasesToSearch == null)
                {
                    _phrasesToSearch = new List<PhraseSearchModel>();
                    // Filter phrases in db by current Culture for imporoving search spped
                    //hadi
                    if (CurrentCulture != null)
                        if (CurrentCulture.Phrases != null)
                            if(CurrentCulture.Phrases.Count > 0)
                            _phrasesToSearch = CurrentCulture
                                .Phrases
                                .Select(p => new PhraseSearchModel()
                                {
                                    PhraseKey = p.PhraseKey.Key.ToLower().Trim(),
                                    Value = p.Value
                                });


                }




                return _phrasesToSearch;
            }
            set
            {
                _phrasesToSearch = value;
            }
        }



        protected string languageNameAbbrRouteDataKey = "ln";
        protected string countryNameAbbrRouteDataKey = "cn";
        protected string cultureCacheKeyPrefix = "dynamics_localization_culture_";

        public void ClearCurrentCultureCache(string cultureName = "")
        {
            if (string.IsNullOrWhiteSpace(cultureName))
                cultureName = CurrentCulture.CultureName();


            if (HttpContext.Current != null)
                HttpContext.Current.Cache.Remove(cultureCacheKeyPrefix + cultureName);

            CurrentCulture = GetCulture(cultureName);


        }
        public Culture GetCulture(string cultureName)
        {
            if (HttpContext.Current != null)
            {
                Culture result = new Culture();
                result = (Culture)HttpContext.Current.Cache[cultureCacheKeyPrefix + cultureName];
                if (result == null)
                {
                    result = culturesDb.GetAll().AsEnumerable().FirstOrDefault(p => p.CultureName() == cultureName);
                    if (result != null)
                        HttpContext.Current.Cache.Add(cultureCacheKeyPrefix + cultureName, result,
                             null, DateTime.Now.AddHours(1), System.Web.Caching.Cache.NoSlidingExpiration, System.Web.Caching.CacheItemPriority.BelowNormal, null);
                }

                return result;

            }
            else
            {
                return culturesDb.GetAll().AsEnumerable().FirstOrDefault(p => p.CultureName() == cultureName);
            }
        }
        /// <summary>
        /// Creating Phrases Localization Object
        /// </summary>
        /// <param name="context">For extractin CultureName and Prefix</param>
        public Phrases(ControllerContext context)
        {

            string _cultureName = "";
            string languageNameAbbr = "";
            string countryNameAbbr = "";


            //if (context.RouteData.Values[languageNameAbbrRouteDataKey] == null)
            //    throw new Exception(languageNameAbbrRouteDataKey + " Not exist in routeData Values !");

            //if (context.RouteData.Values[countryNameAbbrRouteDataKey] == null)
            //    throw new Exception(countryNameAbbrRouteDataKey + " Not exist in routeData Values !");

            if (context.RouteData.Values[countryNameAbbrRouteDataKey] == null &&
                context.RouteData.Values[languageNameAbbrRouteDataKey] == null)
            {
                languageNameAbbr = "fa";
                countryNameAbbr = "ir";
                _cultureName = "fa-ir";
            }
            else
            {
                _cultureName = context.RouteData.Values[languageNameAbbrRouteDataKey].ToString().ToLower().Trim() +
                    "-" +
                     context.RouteData.Values[countryNameAbbrRouteDataKey].ToString().ToLower().Trim();
            }
            if (string.IsNullOrWhiteSpace(_cultureName))
                throw new Exception("CultureName is null !");

            if (_cultureName.Count() != 5 || _cultureName.Split('-').Count() != 2)
                throw new Exception("CultureName is not in correct format !");

            if (culturesDb.GetAll().AsEnumerable().Any(p => p.CultureName() == _cultureName) == false)
            {
                CurrentCulture = culturesDb.Add(new Culture()
                    {
                        LanguageNameAbbr = _cultureName.Split('-')[0],
                        CountryNameAbbr = _cultureName.Split('-')[1]
                    });
              
            }
            else
                CurrentCulture = GetCulture(_cultureName);

            if (context.RouteData.Values.Any(p => p.Key == "plugin"))
                Prefix = context.RouteData.Values["plugin"].ToString() + "_";

            //AreaName
            if (context.RouteData.Values.Any(p => p.Key == "AreaName"))
                Prefix = context.RouteData.Values["AreaName"].ToString() + "_";

        }

        /// <summary>
        /// Return phrase from PhrasesToSearch variable wich filtered by current culture 
        /// </summary>
        /// <param name="key">
        /// Phrase Key ( prefix will be added automatically for plugins and areas )
        /// </param>
        /// <returns></returns>
        public string Get(string key)
        {


            string _key = Prefix.ToLower() + key.Trim().ToLower();

            if (CurrentCulture == null)
                return key;

            if (PhrasesToSearch.Any(p => p.PhraseKey.ToLower().Trim() == _key) == false)
            {

                PhraseKey phraseKey = null;

                if (CurrentCulture.Phrases.Any(p => p.PhraseKey.Key == _key) == false)
                {
                    if (PhraseKeysDb.Any(p => p.Key == _key) == false)
                        phraseKey = PhraseKeysDb.Add(new PhraseKey() { Key = _key });
                }
                else
                    phraseKey = CurrentCulture.Phrases.First(p => p.PhraseKey.Key == _key).PhraseKey;

                if (phraseKey == null)
                    phraseKey = PhraseKeysDb.Get(p => p.Key == _key);

                PhrasesDb.Add(new Phrase()
                {
                    PhraseKeyID = phraseKey.ID,
                    Value = key,
                    CultureID = CurrentCulture.ID
                });

                _phrasesToSearch = null;

                ClearCurrentCultureCache(CurrentCulture.CultureName());

                return key;
            }
            else
                return PhrasesToSearch.First(p => p.PhraseKey == _key).Value;
        }
    }
}
