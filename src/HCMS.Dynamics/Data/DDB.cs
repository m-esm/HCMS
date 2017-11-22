using HCMS.Business;
using HCMS.Dynamics.Forms.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MoreLinq;

namespace HCMS.Dynamics.Data
{
    public static class DDB
    {


        public static DTable GetTable(int FormId, int? CultureId = null, string userid = "")
        {
            var form = new GenericRepository<Form>().Find(FormId);
            return GetTable(form.Section.Name, form.Name, CultureId, userid);
        }
        public static DTable GetTable(string Section_Name, string Form_Name, int? CultureId = null, string userid = "")
        {

            var form = new GenericRepository<Form>().Get(p=>p.Name == Form_Name && p.Section.Name == Section_Name);

               

            DCache dCache = new DCache();
            DTable result = new DTable(form.ID);

            // Normalize strings
            string _form_name = Form_Name.ToLower().Trim();
            string _section_name = Section_Name.ToLower().Trim();

            int[] rowIDS = null;

            // first check the memory cache
            rowIDS = (int[])dCache.GetCacheObj("dynamics_table_rowids_" + _section_name + "_" + _form_name + "_" + userid);

            GenericRepository<FormFieldValue> Values = new GenericRepository<FormFieldValue>();

            // if not match

            if (rowIDS == null)
            {
                // get from database
                if (string.IsNullOrWhiteSpace(userid))
                {
                    rowIDS = Values.Where(p => p.Field.Form.Name.ToLower() == _form_name)
                   .Where(p => p.Field.Form.Section.Name.ToLower() == _section_name)
                   .Select(p => p.RowID)
                   .DistinctBy(p => p)
                   .ToArray();
                }
                else
                {
                    rowIDS = Values.Where(p => p.Field.Form.Name.ToLower() == _form_name)
                    .Where(p => p.UserId == userid)
                   .Where(p => p.Field.Form.Section.Name.ToLower() == _section_name)
                   .Select(p => p.RowID)
                   .DistinctBy(p => p)
                   .ToArray();
                }


                dCache.AddToCache("dynamics_table_rowids_" + _section_name + "_" + _form_name + "_" + userid, rowIDS);

            }
            //else
            //{
            //    if (string.IsNullOrWhiteSpace(userid))
            //    {

            //    }
            //    else
            //    {
            //        rowIDS = Values.Where(p => rowIDS.Contains(p.RowID))
            //            .Where(p => p.UserId == userid)
            //            .Select(p => p.RowID)
            //            .DistinctBy(p => p)
            //            .ToArray();
            //    }
            //}

            result.DRows = from p in rowIDS
                           select new DRow(p, CultureId);

            return result;
        }
    }
}
