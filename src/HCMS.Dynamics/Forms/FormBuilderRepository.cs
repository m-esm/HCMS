using HCMS.Business;
using HCMS.Dynamics.Forms.Models;
using HCMS.Dynamics.Localization.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Forms
{
    public class FormBuilderRepository
    {
        public bool ShowButtons { get; set; }
        IEnumerable<Culture> Cultures = new GenericRepository<Culture>().GetAll();

        #region Constructores

        /// <summary>
        /// این کانستراکچر برای پر کردن مدل های مورد نیاز فرم بیلدر از روی یک آبجکت طراحی شده است .
        /// </summary>
        /// <param name="Model">
        /// می تواند هر کلاسی باشد به شرطی که
        /// پراپرتی های آن از صفت های تعریف شده در فرم بیلدر 
        /// استفاده کرده باشند .
        /// </param>
        public FormBuilderRepository(object Model,bool showButtons = true)
        {
            ShowButtons = showButtons;
            FilledWithDB = false;
            Type t = Model.GetType();

            if (t.BaseType != typeof(Object))
                t = t.BaseType;

            Form = new Form();

            Form.Name = t.Name;

            if (t.CustomAttributes.Any(p => p.NamedArguments.Any(d => d.MemberName == "Caption")))
                Form.Caption = t.CustomAttributes
                    .First(p => p.NamedArguments.Any(d => d.MemberName == "Caption")).NamedArguments
                    .First(p => p.MemberName == "Caption").TypedValue.Value.ToString();


            if (t.CustomAttributes.Any(p => p.NamedArguments.Any(d => d.MemberName == "ActionURL")))
                Form.ActionURL = t.CustomAttributes
                    .First(p => p.NamedArguments.Any(d => d.MemberName == "ActionURL")).NamedArguments
                    .First(p => p.MemberName == "ActionURL").TypedValue.Value.ToString();


            if (t.CustomAttributes.Any(p => p.NamedArguments.Any(d => d.MemberName == "Method")))
                Form.Method = t.CustomAttributes
                    .First(p => p.NamedArguments.Any(d => d.MemberName == "Method")).NamedArguments
                    .First(p => p.MemberName == "Method").TypedValue.Value.ToString();



            List<PropertyModel> Props = new List<PropertyModel>();

            foreach (var p in t.GetProperties())
            {
                var NewProp = new PropertyModel();
                NewProp.PropertyLabel = p.Name;
                NewProp.PropertyName = p.Name;

                try
                {
                    NewProp.PropertyValue = p.GetValue(Model);
                    if (p.PropertyType.IsEnum)
                    {
                        NewProp.PropertyValue = (int)p.GetValue(Model);
                    }
                }
                catch { }

                List<PropertyAttrModel> _attributes = new List<PropertyAttrModel>();
                foreach (var attr in p.CustomAttributes)
                {
                    var NewAttr = new PropertyAttrModel();
                    NewAttr.AttrName = attr.AttributeType.Name;
                    List<PropertyAttrDataModel> _members = new List<PropertyAttrDataModel>();
                    foreach (var member in attr.NamedArguments)
                    {
                        var newMember = new PropertyAttrDataModel();
                        newMember.MemberName = member.MemberName;
                        newMember.MemberValue = member.TypedValue.Value.ToString();

                        if (newMember.MemberName == "OrderID")
                            NewProp.OrderID = int.Parse(newMember.MemberValue);


                        if (newMember.MemberName == "Label")
                            NewProp.PropertyLabel = newMember.MemberValue;

                        if (newMember.MemberName == "InputType")
                            NewProp.PropertyInputType = int.Parse(newMember.MemberValue);


                        _members.Add(newMember);

                    }

                    NewAttr.Members = _members;
                    _attributes.Add(NewAttr);
                }
                NewProp.Attributes = _attributes;

                Props.Add(NewProp);
            }

            Properties = Props.AsEnumerable();
        }

        public string NumberToStr(int number, int length)
        {
            int numberLength = number.ToString().Length;
            string prefix = "";
            for (int i = 0; i < length - numberLength; i++)
            {
                prefix += 0;
            }
            return prefix + number;
        }

        protected Field GetField(int FieldId)
        {
            return FieldsDb.Find(FieldId);
        }

        protected int? FindCultureIdByFieldName(string FieldName)
        {
            string langAbbr = FieldName.Split('_').Last();
            Culture culture = Cultures.FirstOrDefault(p => p.LanguageNameAbbr.ToLower() == langAbbr.ToLower());
            if (culture != null)
                return culture.ID;

            return null;
        }

        GenericRepository<FormFieldValue> DynamicDbValues = new GenericRepository<FormFieldValue>();
        GenericRepository<Field> FieldsDb = new GenericRepository<Field>(ProxyCreation: false);
        public FormBuilderRepository(int FormID, int RowID = -1, IEnumerable<Field> ManualFieldsInput = null, bool showButtons = true)
        {

            ShowButtons = showButtons;

            FilledWithDB = true;
            var Model = new GenericRepository<Form>().Find(FormID);
            IEnumerable<Field> formFields = null;
            if (ManualFieldsInput != null)
                formFields = ManualFieldsInput;
            else
                formFields = Model.Fields.AsEnumerable();

            Form = new Form();
            Form.Caption = Model.Caption;
            Form.ActionURL = Model.ActionURL;
            Form.Method = Model.Method.ToString();
            Form.Name = Model.Name;



            var fieldsToUse = formFields.Where(p => p.Localize == false).ToList();

            foreach (var cul in Cultures)
                foreach (var field in formFields.Where(p => p.Localize).ToArray())
                {
                    Field fieldToAdd = GetField(field.ID).DeepCopy();
                    fieldToAdd.Name = field.Name + "_" + cul.LanguageNameAbbr;
                    fieldToAdd.CssClass += " " + (cul.RTL ? "rtl" : "ltr");
                    fieldsToUse.Add(fieldToAdd);
                }


            var AllowedMultipleFields = fieldsToUse.Where(p => p.AllowMultipleEntry).ToList();
            var NotAllowedMultipleFields = fieldsToUse.Where(p => p.AllowMultipleEntry == false).ToList();


            List<PropertyModel> Props = new List<PropertyModel>();


            ////////// Add Multiple Values
            foreach (var mfield in AllowedMultipleFields)
            {

                bool isMasterField = true;
                int? cultureId = FindCultureIdByFieldName(mfield.Name);

                if (DynamicDbValues.Any(p => p.RowID == RowID && p.FieldID == mfield.ID))
                {
                    IEnumerable<FormFieldValue> vRows = new List<FormFieldValue>();

                    if (DynamicDbValues.Any(p => p.FieldID == mfield.ID && p.RowID == RowID))
                        if (DynamicDbValues.Any(p => p.FieldID == mfield.ID && p.RowID == RowID && p.CultureID == cultureId))
                            vRows = DynamicDbValues.Where(p => p.RowID == RowID && p.FieldID == mfield.ID && p.CultureID == cultureId);
                        else
                            vRows = DynamicDbValues.Where(p => p.RowID == RowID && p.FieldID == mfield.ID );

                   vRows = vRows.OrderBy(p => p.Field.OrderID).ThenBy(p => p.RelatedToID);

                    foreach (var vRow in vRows)
                    {
                        if (!isMasterField)
                            mfield.AllowMultipleEntry = false;

                        var PropToAdd = fillProp(mfield, vRow.Value);

                        if (vRow.RelatedToID.HasValue == false)
                            vRow.RelatedToID = 0;

                        PropToAdd.RelationID = vRow.RelatedToID;

                        mfield.OrderID = mfield.OrderID < 0 ? 0 : mfield.OrderID;

                        PropToAdd.GroupOrderID = int.Parse(1 + NumberToStr(vRow.RelatedToID.Value, 3) + NumberToStr(mfield.OrderID, 3));



                        if (!isMasterField)
                        {
                            PropToAdd.PropertyLabel = "";
                            PropToAdd.PropertyName += string.Format("_edit_{0}", vRow.ID);
                        }

                        Props.Add(PropToAdd);

                        isMasterField = false;


                    }
                }
                else
                {
                    var PropToAdd = fillProp(mfield, "");

                    PropToAdd.RelationID = 0;


                    Props.Add(PropToAdd);
                }
            }


            /////////////////////////////////


            foreach (var field in NotAllowedMultipleFields)
            {
                int? cultureId = FindCultureIdByFieldName(field.Name);

                string value = "";
                if (RowID != -1)
                    if (DynamicDbValues.Any(p => p.FieldID == field.ID && p.RowID == RowID))
                        if (DynamicDbValues.Any(p => p.FieldID == field.ID && p.RowID == RowID && p.CultureID == cultureId))
                            value = DynamicDbValues.Get(p => p.FieldID == field.ID && p.RowID == RowID && p.CultureID == cultureId).Value;
                        else
                            value = DynamicDbValues.Get(p => p.FieldID == field.ID && p.RowID == RowID).Value;

                Props.Add(fillProp(field, value));
            }


            Properties = Props.AsEnumerable();



        }

        public PropertyModel fillProp(Field field, string Value)
        {
            var NewProp = new PropertyModel();
            NewProp.PropertyLabel = field.Label;
            NewProp.PropertyName = field.Name;
            NewProp.Attributes = new List<PropertyAttrModel>();
            NewProp.PropertyValue = Value;

            List<PropertyAttrDataModel> _members = new List<PropertyAttrDataModel>();
            var propType = field.GetType();

            foreach (var member in propType.GetProperties())
            {

                var newMember = new PropertyAttrDataModel();

                newMember.MemberName = member.Name;
                try
                {
                    newMember.MemberValue = member.GetValue(field).ToString();
                }
                catch { }

                if (newMember.MemberName == "OrderID")
                    NewProp.OrderID = int.Parse(newMember.MemberValue);


                if (newMember.MemberName == "Label")
                    NewProp.PropertyLabel = newMember.MemberValue;

                if (newMember.MemberName == "InputType")
                    NewProp.PropertyInputType = int.Parse(newMember.MemberValue);



                _members.Add(newMember);


            }

            NewProp.Attributes.Add(new PropertyAttrModel() { AttrName = "InputAttribute", Members = _members });
            return NewProp;
        }


        #endregion

        #region Properties

        public bool FilledWithDB { get; set; }
        public Form Form { get; set; }

        public IEnumerable<PropertyModel> Properties { get; set; }


        #endregion

    }





}
