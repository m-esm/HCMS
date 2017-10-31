using HCMS.Business;
using HCMS.Dynamics.Data;
using HCMS.Dynamics.Forms.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HCMS.Dynamics.Data
{
    /// <summary>
    /// برای نگهداری کش در مموری استفاده می شود .
    /// در فایل گلوبال مقادیر برای دسترسی نگهداری خواهند شد
    /// </summary>
    public class DCache
    {
        bool Enabled = true;

        GenericRepository<DRowValueCache> Values_CacheDB = new GenericRepository<DRowValueCache>(true);
        GenericRepository<DRowValueGroupCache> Values_Group_CacheDB = new GenericRepository<DRowValueGroupCache>(true);
        GenericRepository<FormFieldValue> Values = new GenericRepository<FormFieldValue>(false);
        public void DeleteCache(int _rowid)
        {
            DeleteFromTableCache(_rowid);
            DeleteFromMemoryCache(_rowid);
        }


        public void DeleteFromTableCache(int _rowid)
        {
            Values_CacheDB.BulkRemove(p => p.RowId == _rowid);
            Values_Group_CacheDB.BulkRemove(p => p.RowID == _rowid);
        }

        public void DeleteFromMemoryCache(int _rowid)
        {
            List<string> itemsToRemove = new List<string>();

            //dynamics_row_cache_
            //dynamics_table_rowids_
            //dynamics_row_group_cache_
            foreach (System.Collections.DictionaryEntry d in HttpContext.Current.Cache)
            {
                if (d.Key.ToString().StartsWith("dynamics_row_cache_" + _rowid))
                    itemsToRemove.Add(d.Key.ToString());

                if (d.Key.ToString().StartsWith("dynamics_row_group_cache_" + _rowid))
                    itemsToRemove.Add(d.Key.ToString());

                if (d.Key.ToString().StartsWith("dynamics_table_rowids_"))
                    itemsToRemove.Add(d.Key.ToString());

            }

            foreach (string itemToRemove in itemsToRemove)
            {
                HttpContext.Current.Cache.Remove(itemToRemove);
            }

        }

        public void AddToCache(string key, object value)
        {
            System.Web.HttpContext.Current.Cache.Add(
                key,
                value,
                null,
                DateTime.Now.AddMonths(1),
                System.Web.Caching.Cache.NoSlidingExpiration,
                System.Web.Caching.CacheItemPriority.Normal,
                null);
        }

        public object GetCacheObj(string key)
        {
            if (!Enabled)
                return null;

            return System.Web.HttpContext.Current.Cache.Get(key);
        }

        public DRowValueCache Get_Memory_Cache_Value(string _match, int _rowId, int? _IndexInGroup, int? _cultureId)
        {
            var cacheObj = GetCacheObj(string.Format("dynamics_row_cache_{0}_{1}_{2}_{3}"
               , _rowId
               , _match
               , _IndexInGroup.HasValue ? _IndexInGroup.Value : 0
               , _cultureId.HasValue ? _cultureId.Value : 0));

            if (cacheObj == null)
                if (_cultureId.HasValue)
                    cacheObj = GetCacheObj(string.Format("dynamics_row_cache_{0}_{1}_{2}_{3}"
                    , _rowId
                    , _match
                    , _IndexInGroup.HasValue ? _IndexInGroup.Value : 0
                    , 0));

            if (cacheObj == null)
                return null;

            return (DRowValueCache)cacheObj;
        }

        public void Add_Memory_Cache_Value(DRowValueCache _row_cache)
        {
            AddToCache(string.Format("dynamics_row_cache_{0}_{1}_{2}_{3}",
                _row_cache.RowId,
                _row_cache.Match,
                _row_cache.IndexInGroup.HasValue ? _row_cache.IndexInGroup : 0,
                _row_cache.CultureId.HasValue ? _row_cache.CultureId.Value : 0),
                _row_cache);
        }


        public DRowValueGroupCache Get_Memory_Cache_Value_Group(string _groupname, int _rowId)
        {
            var cacheObj = GetCacheObj(string.Format("dynamics_row_group_cache_{0}_{1}", _rowId, _groupname));
            if (cacheObj == null)
                return null;

            return (DRowValueGroupCache)cacheObj;

        }


    }
}