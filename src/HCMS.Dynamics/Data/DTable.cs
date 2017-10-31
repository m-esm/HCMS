using HCMS.Business;
using HCMS.Dynamics.Forms.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Data
{
    public class DTable
    {
        private readonly int _FormID;
        public DTable(int FormID)
        {
            _FormID = FormID;
        }
        //public Field[] GetFields()
        //{

        //}
        public IEnumerable<DRow> DRows { get; set; }

        public DRowFinder GetFinder()
        {
            return new DRowFinder() { DRows = DRows };
        }


        public void add(NameValueCollection values, string userid)
        {

            var dydb = new DynamicDB();

            dydb.Create(FormID: _FormID, _formData: values, userId: userid);


        }



    }

    public class DRowFinder
    {

        public string ColumnToSearch { get; set; }
        public string ColumnToGet { get; set; }

        public string WhereColumn { get; set; }
        public string WhereColumnValue { get; set; }
        public SearchModes WhereColumnSearchMode { get; set; }
        public SearchModes SearchMode { get; set; }
        public IEnumerable<DRow> DRows { get; set; }



        public string Find(string SearchFor)
        {
            if (DRows.Count() == 0)
                return SearchFor;

            DRows = DRows.Where(p => p.GetValue(WhereColumn).ToString().Trim().ToLower() == WhereColumnValue.Trim().ToLower());

            if (DRows.Count() == 0)
                return SearchFor;

            var obj = DRows.FirstOrDefault(p => p.GetValue(ColumnToSearch).Value.Trim().ToLower() == SearchFor).GetValue(ColumnToGet);
            if (obj == null)
                return SearchFor;

            return obj.Value;

        }

        public enum SearchModes
        {
            Equal,
            IgnoreCaseTrimEqual,
            StartsWith,
            EndWith,
            Contains
        }

    }
}
