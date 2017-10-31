using HCMS.Business;
using HCMS.Dynamics.Forms.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using MoreLinq;
using HCMS.Dynamics.Forms;
using HCMS.Dynamics.Localization.Entities;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Web;
using HCMS.Dynamics.Data;

namespace HCMS.Dynamics
{


    public class DynamicDB
    {
        GenericRepository<FormFieldValue> Values = new GenericRepository<FormFieldValue>();
        GenericRepository<Form> Forms = new GenericRepository<Form>();
        GenericRepository<Section> Sections = new GenericRepository<Section>();
        GenericRepository<Culture> Cultures = new GenericRepository<Culture>();

        public void Dispose()
        {
            Values.Dispose();
            Forms.Dispose();
            Sections.Dispose();
            Cultures.Dispose();
        }
        public Form Create(string Section, string Form, NameValueCollection _formData, string userId = "")
        {
            Section _Section = Sections.Get(p => p.Name.ToLower() == Section.ToLower());

            var _Form = _Section.Forms.FirstOrDefault(p => p.Name.ToLower() == Form.ToLower());
            return Create(_Form.ID, _formData);
        }
        public Form Create(int FormID, NameValueCollection _formData, string userId = "")
        {

            var _Form = Forms.Find(FormID);

            int RowID = -1;

            int? RelatedID = null;
            int? CultureID = null;

            foreach (var _fieldName in _formData.AllKeys.Where(p => p.StartsWith("__") == false))
            {
                string Normalized_fieldName = _fieldName;

                if (Normalized_fieldName.Contains("_add_"))
                {
                    Normalized_fieldName = _fieldName.Remove(_fieldName.IndexOf("_add_"));
                    RelatedID = int.Parse(_fieldName.Split(new string[] { "_add_" }, StringSplitOptions.RemoveEmptyEntries).Last());
                }

                if (Normalized_fieldName.Contains("_"))
                {
                    string langAbbr = Normalized_fieldName.Split('_').Last().ToLower().Trim();

                    if (string.IsNullOrWhiteSpace(langAbbr) == false)
                        CultureID = Cultures.Get(p => p.LanguageNameAbbr.ToLower() == langAbbr).ID;

                    Normalized_fieldName = Normalized_fieldName.Remove(_fieldName.IndexOf("_"));

                }


                try
                {

                    var _temp = Values.Add(new FormFieldValue()
                    {
                        FieldID = _Form.Fields.First(p => p.Name == Normalized_fieldName).ID,
                        ChangeDate = DateTime.Now,
                        Value = _formData[_fieldName].ToString().Replace("&nbsp;"," "),
                        RowID = RowID,
                        RelatedToID = RelatedID,
                        UserId = userId,
                        CultureID = CultureID,
                        CreatorUserId = userId,
                        CreateDate = DateTime.Now
                    });

                    if (RowID == -1)
                    {
                        RowID = _temp.ID;
                        _temp.RowID = RowID;
                        Values.Update(_temp, _temp.ID);
                    }

                    new DCache().DeleteCache(0);


                }
                catch
                {

                }
                RelatedID = null;
            }




            string afterSaveHook = _Form.AfterSaveHook;
            if (string.IsNullOrWhiteSpace(afterSaveHook))
                afterSaveHook = _Form.Section.AfterSaveHook;
            if (!string.IsNullOrWhiteSpace(afterSaveHook))
            {
                HttpClient _httpClient = new HttpClient();

                if (afterSaveHook.Contains('?'))
                    afterSaveHook += "&rid=" + RowID;
                else
                    afterSaveHook += "?rid=" + RowID;

                var response = _httpClient.GetAsync(afterSaveHook);
            }

            return _Form;

        }

        public Form Edit(int FormID, int RowID, NameValueCollection _formData, string userId = "")
        {
            GenericRepository<FormFieldValue> Values = new GenericRepository<FormFieldValue>();



            var _Form = Forms.Find(FormID);

            List<int> PresentFields = new List<int>();

            int RelatedID = -1;

            // Removing unwanted default fields
            foreach (var _fieldName in _formData.AllKeys.Where(p => p.StartsWith("__") == false))
            {

                string Normalized_fieldName = _fieldName;
                string fieldValue = _formData[_fieldName].ToString();



                if (_fieldName.Contains("_add_"))
                    Normalized_fieldName = _fieldName.Remove(_fieldName.IndexOf("_add_"));

                if (_fieldName.Contains("_edit_"))
                    Normalized_fieldName = _fieldName.Remove(_fieldName.IndexOf("_edit_"));

                int? cultureId = null;
                if (Normalized_fieldName.Contains('_'))
                {
                    string langAbbr = Normalized_fieldName.Split('_').Last().ToLower().Trim();

                    if (string.IsNullOrWhiteSpace(langAbbr) == false)
                        cultureId = Cultures.Get(p => p.LanguageNameAbbr.ToLower() == langAbbr).ID;

                    Normalized_fieldName = Normalized_fieldName.Remove(Normalized_fieldName.IndexOf("_"));
                }

                var field = _Form.Fields.First(p => p.Name == Normalized_fieldName);

                if ((int)InputTypes.CheckBox == field.InputType)
                    fieldValue = fieldValue.Split(',').First();


                if (_fieldName.Contains("_add_"))
                {

                    RelatedID = int.Parse(_fieldName.Split(new string[] { "_add_" }, StringSplitOptions.RemoveEmptyEntries).Last());



                    var temp = Values.Add(new FormFieldValue()
                    {
                        CreateDate = DateTime.Now,
                        FieldID = field.ID,
                        ChangeDate = DateTime.Now,
                        Value = fieldValue.Replace("&nbsp;", " "),
                        RelatedToID = RelatedID,
                        RowID = RowID,
                        CultureID = cultureId
                    });


                    PresentFields.Add(temp.ID);
                }
                else if (_fieldName.Contains("_edit_"))
                {


                    int fieldID = int.Parse(_fieldName.Split(new string[] { "_edit_" }, StringSplitOptions.RemoveEmptyEntries).Last());

                    if (Values.Any(p => p.ID == fieldID))
                    {
                        var FieldValue = Values.Find(fieldID);
                        FieldValue.Value = fieldValue.Replace("&nbsp;", " ");
                        Values.Update(FieldValue, FieldValue.ID);
                        PresentFields.Add(fieldID);
                    }
                    else
                    {

                        var temp = Values.Add(new FormFieldValue()
                        {

                        CreateDate = DateTime.Now,

                            FieldID = field.ID,
                            RowID = RowID,
                            ChangeDate = DateTime.Now,
                            RelatedToID = fieldID,
                            Value = fieldValue.Replace("&nbsp;", " "),
                            CultureID = cultureId,
                            UserId = userId
                        });

                        PresentFields.Add(temp.ID);
                    }


                }
                else
                {

                    if (Values.Any(p => p.RowID == RowID && p.FieldID == field.ID && p.CultureID == cultureId))
                    {
                        var FieldValue = Values.Get(p => p.RowID == RowID && p.FieldID == field.ID && p.CultureID == cultureId);
                        FieldValue.Value = fieldValue.Replace("&nbsp;", " ");
                        FieldValue.UserId = userId;
                        FieldValue.ChangeDate = DateTime.Now;
                        Values.Update(FieldValue, FieldValue.ID);
                        PresentFields.Add(FieldValue.ID);
                    }
                    else
                    {
                        var temp = Values.Add(new FormFieldValue()
                          {
                            CreateDate = DateTime.Now,

                            FieldID = field.ID,
                              RowID = RowID,
                              ChangeDate = DateTime.Now,
                              Value = fieldValue.Replace("&nbsp;", " "),
                              CultureID = cultureId,
                              UserId = userId
                          });

                        PresentFields.Add(temp.ID);

                    }


                }
            }

            foreach (var item in Values.Where(p => p.RowID == RowID).ToList())
                if (!PresentFields.Any(p => p == item.ID))
                    Values.Remove(Values.Find(item.ID));

            string afterSaveHook = _Form.AfterSaveHook;
            if (string.IsNullOrWhiteSpace(afterSaveHook))
                afterSaveHook = _Form.Section.AfterSaveHook;
            if (!string.IsNullOrWhiteSpace(afterSaveHook))
            {
                HttpClient _httpClient = new HttpClient();

                if (afterSaveHook.Contains('?'))
                    afterSaveHook += "&rid=" + RowID;
                else
                    afterSaveHook += "?rid=" + RowID;

                var response = _httpClient.GetAsync(afterSaveHook);

            }


            return _Form;

        }

        public List<Dictionary<string, object>> GroupFieldsBy(Dictionary<string, object> dic, string groupName)
        {
            List<Dictionary<string, object>> result = new List<Dictionary<string, object>>();
            var fieldsInGroup = dic.Where(p => p.Key.StartsWith(groupName + "_"));
            var rows = fieldsInGroup
                .GroupBy(p => p.Key
                    .Split(new string[] { "_" }, StringSplitOptions.RemoveEmptyEntries).Last()
                    .Split(new string[] { "." }, StringSplitOptions.RemoveEmptyEntries).First()
                    );

            foreach (var row in rows)
            {
                Dictionary<string, object> rowDic = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);

                foreach (var c in row)
                {
                    rowDic.Add(c.Key.Split('.').Last(), c.Value);
                }
                result.Add(rowDic);
            }

            return result;
        }

        public void Delete(int RowID)
        {

            Values.BulkRemove(p => p.RowID == RowID);

        }

        public Dictionary<string, object> RelationalData(FormFieldValue val, int? relatedID = null, string group = "")
        {
            Dictionary<string, object> NameValues = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
            if (val.Field.Name.ToLower().EndsWith("id"))
                if (val.Field.DataURL != null)
                {
                    try
                    {
                        string dataUrl = val.Field.DataURL.ToLower();
                        var dataUrlQS = HttpUtility.ParseQueryString(dataUrl.Split('?').Last());
                        if (dataUrl.Contains("formid") && dataUrl.Contains("label"))
                        {
                            int formid = int.Parse(dataUrlQS["formid"]);
                            var toAdd = Get(formid, int.Parse(val.Value));
                            string toAddPrefix = val.Field.Name.ToLower().Replace("id", "");

                            if (relatedID.HasValue)
                                toAddPrefix = group + "_" + relatedID.Value + "." + toAddPrefix;

                            foreach (var item in toAdd)
                            {
                                NameValues.Add(toAddPrefix + "." + item.Key, item.Value);
                            }

                        }
                    }
                    catch
                    {

                    }

                }
            return NameValues;
        }
        public Dictionary<string, object> Get(int FormID, int RowID)
        {
            Dictionary<string, object> NameValues = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
            var values = Values.Where(p => p.Field.FormID == FormID && p.RowID == RowID).AsEnumerable();

            NameValues.Add("rowid", RowID);


            foreach (var val in values.Where(p => p.Field.AllowMultipleEntry == false))
            {
                var relData = RelationalData(val);
                foreach (var item in relData)
                    NameValues.Add(item.Key, item.Value);



                NameValues.Add(val.Field.Name, val.Value);
            }

            var multipleRows = values
                .Where(p => p.Field.AllowMultipleEntry == true)
                .Where(p => string.IsNullOrWhiteSpace(p.Field.GroupWith) == false);

            if (multipleRows.Count() > 0)
            {
                foreach (var item in multipleRows)
                {

                    if (item.RelatedToID.HasValue == false)
                        item.RelatedToID = 0;

                    var relData = RelationalData(item, item.RelatedToID);
                    foreach (var relitem in relData)
                        NameValues.Add(relitem.Key, relitem.Value);

                    NameValues.Add(item.Field.GroupWith + "_" + item.RelatedToID.Value + "." + item.Field.Name, item.Value);
                }
            }



            return NameValues;


        }



        public IEnumerable<Dictionary<string, object>> Get(int FormID)
        {
            List<Dictionary<string, object>> Result = new List<Dictionary<string, object>>();
            var rowIDs = Values.Where(p => p.Field.FormID == FormID).Select(p => p.RowID).DistinctBy(p => p);
            foreach (var rowId in rowIDs)
            {
                Result.Add(Get(FormID, rowId));
            }


            return Result;


        }


        public IEnumerable<Dictionary<string, object>> Get(string Section, string Form)
        {

            Section _Section = Sections.Get(p => p.Name.ToLower() == Section.ToLower());

            var _Form = _Section.Forms.FirstOrDefault(p => p.Name.ToLower() == Form.ToLower());

            return this.Get(_Form.ID);

        }



        public Dictionary<string, object> Get(string Section, string Form, int RowID)
        {
            Section _Section = Sections.Get(p => p.Name.ToLower() == Section.ToLower());
            var _Form = _Section.Forms.FirstOrDefault(p => p.Name.ToLower() == Form.ToLower());
            return this.Get(_Form.ID, RowID);
        }

    }
}
