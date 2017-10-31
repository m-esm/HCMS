using HCMS.Business;
using HCMS.Dynamics.Forms.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using HCMS.Dynamics.Localization.Entities;
using System.Web;

namespace HCMS.Dynamics.Data
{
    public class DRow
    {

        DCache cache = new DCache();
        GenericRepository<FormFieldValue> ValuesDB = new GenericRepository<FormFieldValue>(false);
        GenericRepository<Field> fieldsDb = new GenericRepository<Field>(false);
        GenericRepository<DRowValueCache> Values_CacheDB = new GenericRepository<DRowValueCache>(true);
        GenericRepository<DRowValueGroupCache> Values_Group_CacheDB = new GenericRepository<DRowValueGroupCache>(true);


        protected int? cultureId;
        public int? IndexInGroup { get; set; }

        public DRow(int _RowID, IEnumerable<FormFieldValue> _DRowValues, int? _IndexInGroup = null)
        {
            this.RowID = _RowID;
            this.IndexInGroup = _IndexInGroup;
            this.DRowValues = _DRowValues;

        }
        public DRow(int _RowID, int? _cultureId = null, int? _IndexInGroup = null)
        {
            this.RowID = _RowID;
            this.cultureId = _cultureId;
            this.IndexInGroup = _IndexInGroup;
        }



        private IEnumerable<FormFieldValue> _DRowValues;
        public IEnumerable<FormFieldValue> DRowValues
        {
            get
            {
                if (_DRowValues == null)
                {
                    _DRowValues = ValuesDB.Where(p => p.RowID == RowID).AsEnumerable();
                    return _DRowValues;
                }
                else
                    return _DRowValues;
            }
            set
            {
                _DRowValues = value;
            }
        }


        private const string KeyIdentifier = "id";
        public int RowID { get; set; }

        public DateTime getCreateDate()
        {

            FormFieldValue row = ValuesDB.Get(p => p.RowID == RowID);
            if (row != null)
            {

                return row.CreateDate;

            }
            else
            {
                throw new Exception("row not found !");
            }



        }

        public DateTime getChangeDate()
        {

            FormFieldValue row = ValuesDB.Get(p => p.RowID == RowID);
            if (row != null)
            {

                return row.ChangeDate;

            }
            else
            {
                throw new Exception("row not found !");
            }



        }

        public string getCreator()
        {

            FormFieldValue row = ValuesDB.Get(p => p.RowID == RowID);
            if (row != null)
            {

                return row.CreatorUserId;

            }
            else
            {
                throw new Exception("row not found !");
            }


        }
        public string getLastChanger()
        {

            FormFieldValue row = ValuesDB.Get(p => p.RowID == RowID);
            if (row != null)
            {

                return row.UserId;

            }
            else
            {
                throw new Exception("row not found !");
            }


        }

        public void changeValue(string key, List<KeyValuePair<string, string>> newValue)
        {
            var field = fieldsDb.Get(p => p.Name.ToLower() == key.ToLower());
            if (field == null)
                throw new Exception("field not found !");


            FormFieldValue row = ValuesDB.Get(p => p.FieldID == field.ID && p.RowID == RowID);

            if (row != null)
            {

                row.ChangeDate = DateTime.Now;

                ValuesDB.Update(row, row.ID);

                new DCache().DeleteCache(RowID);

            }
            else
            {
                throw new Exception("row not found !");
            }

        }

        public void changeValue(string key, string newValue, string userid)
        {
            var field = fieldsDb.Get(p => p.Name.ToLower() == key.ToLower());
            if (field == null)
                throw new Exception("field not found !");


            FormFieldValue row = ValuesDB.Get(p => p.FieldID == field.ID && p.RowID == RowID);

            if (row != null)
            {

                row.Value = newValue;

                row.ChangeDate = DateTime.Now;

                ValuesDB.Update(row, row.ID);

                new DCache().DeleteCache(RowID);

            }
            else
            {
                ValuesDB.Add(new FormFieldValue
                {
                    CreatorUserId = userid,
                    ChangeDate = DateTime.Now,
                    CreateDate = DateTime.Now,
                    UserId = userid,
                    FieldID = field.ID,
                    RowID = RowID,
                    Value = newValue
                });

                new DCache().DeleteCache(0);

            }

        }

        /// <summary>
        /// دریافت مقدار از ردیف مجازی
        /// </summary>
        /// <param name="Match"></param>
        /// <returns></returns>
        public DRowValueCache GetValue(string Match)
        {


            start:

            int? _group_index = IndexInGroup == 0 ? null : IndexInGroup;

            string[] _match_parts = Match.Trim().ToLower().Split('.');

            bool relationalMatch = Match.Trim().Contains(".");


            DRowValueCache f_temp = null;

            f_temp = cache.Get_Memory_Cache_Value(Match, RowID, IndexInGroup, cultureId);

            if (f_temp == null)
            {
                var f_temp_targets = Values_CacheDB.Where(p => p.Match == Match.Trim()
                        && p.RowId == RowID
                        && p.IndexInGroup == IndexInGroup);

                if (f_temp_targets.Count() > 0)
                    if (f_temp_targets.First().Localize)
                        f_temp = f_temp_targets.FirstOrDefault(p => p.CultureId == cultureId);
                    else
                        f_temp = f_temp_targets.FirstOrDefault();

                if (f_temp != null)
                    cache.Add_Memory_Cache_Value(f_temp);
            }

            // اگر کش شده بود
            if (f_temp != null)
                // اگر مقدار ریلیشنال نبود
                if (f_temp.SubRowId == null)
                    // مقدار کش شده را برگردان
                    return f_temp;
                else
                {
                    // پیدا کردن مقدار ریلیشنال

                    DRowValueCache s_temp = null;

                    s_temp = cache.Get_Memory_Cache_Value(Match.Trim().Split(".".ToCharArray()).Last(), f_temp.SubRowId.Value, 0, cultureId);
                    if (s_temp == null)
                        s_temp = Values_CacheDB.Get(p => p.ValueId == f_temp.SubRowId.Value);

                    if (s_temp != null)
                    {
                        cache.Add_Memory_Cache_Value(s_temp);
                        return s_temp;
                    }

                    // اگر نال بود حتما تا کنون کش نشده است 
                    else
                    {
                        var s_temp_value = ValuesDB.Get(p => p.ID == f_temp.SubRowId);

                        DRowValueCache res = new DRowValueCache()
                        {
                            RowId = s_temp_value.RowID,
                            SubRowId = (int?)null,
                            Value = s_temp_value.Value,
                            ValueId = s_temp_value.ID,
                            IndexInGroup = 0,
                            CultureId = cultureId,
                            UserId = s_temp_value.UserId,
                            Match = _match_parts.Last()
                        };

                        Values_CacheDB.Add(res);
                        cache.Add_Memory_Cache_Value(res);
                        return res;

                    }
                }



            var _target_Values = DRowValues;

            if (IndexInGroup.HasValue)
                _target_Values = _target_Values.Where(p => p.RelatedToID == _group_index);




            if (_target_Values == null)
                return new DRowValueCache();

            // برای هر ریلیشن مقادیر مورد نظر را سوییچ میکنیم
            for (int i = 0; i < _match_parts.Length; i++)
            {
                string _match_field = _match_parts[i];

                Field[] _fields = _target_Values.Where(p=>p.Field != null).Select(p => p.Field).ToArray();

                // اگر فیلد ها شامل مقدار درخواستی نباشند بدین معنی است که 
                // یا وجود ندارند 
                // یا مقدار ریلیشنال آن ها درخواست شده است
                // مثال : 
                // Match : Product.City.Name
                if (_fields.Where(p=>!string.IsNullOrWhiteSpace(p.Name)).Any(p => p.Name.ToLower() == _match_field) == false)
                {

                    string _match_field_plus_keyIdentifier = _match_field + KeyIdentifier;
                    if (_fields.Any(p => p.Name.ToLower() == _match_field_plus_keyIdentifier))
                    {
                        int _related_rowid = int.Parse(_target_Values.FirstOrDefault(p => p.Field.Name.ToLower() == _match_field_plus_keyIdentifier).Value);
                        _target_Values = ValuesDB.Where(p => p.RowID == _related_rowid).AsEnumerable();
                    }
                    else
                        break;


                }
                else
                {
                    if (_target_Values.Any(p => p.Field.Name.ToLower() == _match_parts[i]))
                    {

                        var _temp_targets = _target_Values.Where(p => p.Field.Name.ToLower() == _match_parts[i]);

                        FormFieldValue temp = null;
                        if (_temp_targets.First().Field.Localize)
                            temp = _temp_targets.FirstOrDefault(p => p.CultureID == cultureId);
                        else
                            temp = _temp_targets.FirstOrDefault();

                        if (temp == null)
                            return new DRowValueCache();

                        var temp2 = new DRowValueCache()
                        {
                            RowId = RowID,
                            SubRowId = relationalMatch ? temp.ID : (int?)null,
                            Value = relationalMatch ? "" : temp.Value,
                            ValueId = relationalMatch ? (int?)null : temp.ID,
                            Match = Match,
                            CultureId = temp.CultureID,
                            IndexInGroup = IndexInGroup,
                            UserId = temp.UserId,
                            Localize = temp.Field.Localize
                        };

                        // کش کردن مقدار پیدا شده
                        Values_CacheDB.Add(temp2);

                        cache.Add_Memory_Cache_Value(temp2);



                        if (relationalMatch)
                            goto start;

                        return temp2;

                    }
                    else
                        return new DRowValueCache();

                }
            }
            return new DRowValueCache();
        }



        protected IEnumerable<DRow> GetGroupRows(DRowValueGroupCache _group)
        {
            return _group.GroupRows
                    .Split(":".ToCharArray(), StringSplitOptions.RemoveEmptyEntries)
                    .Select(p => new DRow(RowID, this.cultureId, int.Parse(p)));
        }

        public IEnumerable<DRow> GetGroup(string GroupName)
        {

            start:

            string _group_name = GroupName.ToLower().Trim();


            DRowValueGroupCache m_cache = cache.Get_Memory_Cache_Value_Group(_group_name, RowID);
            if (m_cache != null)
                return GetGroupRows(m_cache);



            DRowValueGroupCache group_cache = Values_Group_CacheDB.Get(p => p.RowID == RowID && p.GroupName == _group_name);

            if (group_cache != null)
            {
                cache.AddToCache(string.Format("dynamics_row_group_cache_{0}_{1}", RowID, _group_name), group_cache);
                return GetGroupRows(group_cache);
            }

            var groups = DRowValues
                .Where(p => p.Field.GroupWith == _group_name)
                .GroupBy(p => p.RelatedToID);

            if (groups.Count() == 0)
                return new List<DRow>(0);


            string groupRows = "";
            foreach (var item in groups)
            {
                int groupIndex = item.First().RelatedToID ?? 0;
                groupRows += groupIndex + ":";
            }

            groupRows = groupRows.Remove(groupRows.Length - 1);

            DRowValueGroupCache CacheToAdd = new DRowValueGroupCache
            {
                GroupName = _group_name,
                GroupRows = groupRows,
                RowID = RowID
            };



            Values_Group_CacheDB.Add(CacheToAdd);

            cache.AddToCache(string.Format("dynamics_row_group_cache_{0}_{1}", RowID, _group_name), CacheToAdd);

            goto start;

        }







    }
}