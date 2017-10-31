using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.ModelConfiguration;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Forms.Models
{

    public class FieldMap : EntityTypeConfiguration<Field>
    {
        public FieldMap()
        {
            this.ToTable("Dynamics_Forms_Field");
            this.HasKey(p => p.ID);
            this.HasMany(p => p.Values).WithRequired(p => p.Field).HasForeignKey(p => p.FieldID);
        }
    }
    /// <summary>
    /// 
    /// Danger !!!
    /// 
    /// Dont Write New Properties in This class !!! Just Sync properties With InputAttribute Class !!!
    /// 
    /// </summary>
    /// 
    [HCMS.Dynamics.Forms.Form(Caption = "Field")]
    [Serializable]
    public class Field
    {
        public Field()
        {
            InputDivCssClass = "col-md-12";
            Required = true;
            ShowInGrid = true;
        }

        [Input(InputType = InputTypes.Hidden, OrderID = 1000)]
        public int ID { get; set; }
            


        [Input(Label = "Field Name(En)", CssClass = "en", Required = true, OrderID = -1, InputDivCssClass = "col-md-5", InputType = InputTypes.SingleLineText)]
        public string Name { get; set; }



        [Input(Label = "Field Label(En)", OrderID = 0, InputDivCssClass = "col-md-5", InputType = InputTypes.SingleLineText)]
        public string Label { get; set; }


        [Input(Label = "Localize",  InputType = InputTypes.CheckBox, InputDivCssClass = "col-md-2", OrderID = 0)]
        public bool Localize { get; set; }

        ///////////////////////////////////// Just In Field Class
        public virtual Form Form { get; set; }

        [Input(Label = "Form",Related=true, InputDivCssClass = "col-md-3", OrderID = 0, InputType = InputTypes.DropDown, DataURL = "/Manage/data/Forms")]
        public int FormID { get; set; }
        ////////////////////////////////////


        [Input(Label = "Input Type", OrderID = 1, InputDivCssClass = "col-md-3", InputType = InputTypes.DropDown, CssClass = "en", DataURL = "/Manage/data/GetEnumJson?EnumName=inputTypes")]
        public int InputType { get; set; }


        [Input(Label = "Input Filter", OrderID = 2, InputDivCssClass = "col-md-6", InputType = InputTypes.DropDown, CssClass = "en", DataURL = "/Manage/data/GetEnumJson?EnumName=inputFilters")]
        public int? InputFilter { get; set; }


        [Input(Label = "Sort Id", OrderID = 3, InputDivCssClass = "col-md-3 offset-s3", InputType = InputTypes.Number)]
        public int OrderID { get; set; }


        /// <summary>
        /// استفاده در اتخاب محدوده و تعداد فایل آپلودی و ...
        /// </summary>
        [Input(Label = "Min", OrderID = 4, InputDivCssClass = "col-md-3", InputType = InputTypes.Number)]
        public int? Min { get; set; }


        /// <summary>
        /// استفاده در اتخاب محدوده و تعداد فایل آپلودی و ...
        /// </summary>
        [Input(Label = "Max", OrderID = 5, InputDivCssClass = "col-md-3", InputType = InputTypes.Number)]
        public int? Max { get; set; }

        /// <summary>
        /// HTML PlaceHolder
        /// </summary>
        [Input(Label = "Placeholder", OrderID = 6, InputDivCssClass = "col-md-3", InputType = InputTypes.SingleLineText)]
        public string Placeholder { get; set; }

        /// <summary>
        /// آدرس ذخیره فایل 
        /// </summary>
        [Input(Label = "Save Path", OrderID = 7, InputDivCssClass = "col-md-6", CssClass = "en", InputType = InputTypes.SingleLineText)]
        public string SavePath { get; set; }
        /// <summary>
        /// آدرس دایرکتوری منبع برای انتخاب فایل 
        /// </summary>
        [Input(Label = "Search Path", OrderID = 8, InputDivCssClass = "col-md-6", CssClass = "en", InputType = InputTypes.SingleLineText)]
        public string SearchPath { get; set; }


        [Input(Label = "CSS Class", OrderID = 9, CssClass = "en", InputDivCssClass = "col-md-3", InputType = InputTypes.SingleLineText)]
        public string CssClass { get; set; }


        [Input(Label = "DIV Css Class ", OrderID = 10, CssClass = "en", InputDivCssClass = "col-md-3", InputType = InputTypes.SingleLineText)]
        public string InputDivCssClass { get; set; }



        /// <summary>
        /// <remarks>Regular Expression</remarks>
        /// <para>  برای محدود کردن ورودی </para>
        /// <para> قابلیت استفاده روی فیلتر آپلود فایل و انتخاب فایل</para>
        /// </summary>
        [Input(Label = "RegEx", OrderID = 11, InputDivCssClass = "col-md-3", CssClass = "en", InputType = InputTypes.SingleLineText)]
        public string CustomRegEx { get; set; }

        [Input(Label = "Input Mask", OrderID = 12, InputDivCssClass = "col-md-3", CssClass = "en", InputType = InputTypes.SingleLineText)]
        public string Mask { get; set; }

        [Input(Label = "RichEditor Type", OrderID = 13, InputDivCssClass = "col-md-4", InputType = InputTypes.DropDown, CssClass = "en", DataURL = "/Manage/data/GetEnumJson?EnumName=RichTextEditorModes")]
        public int? RichTextEditorMode { get; set; }
        [Input(Label = "RichEditor Skin", OrderID = 14, InputDivCssClass = "col-md-4", InputType = InputTypes.DropDown, CssClass = "en", DataURL = "/Manage/data/GetEnumJson?EnumName=RichTextEditorSkins")]
        public int? RichTextEditorSkin { get; set; }
        [Input(Label = "RichEditor Language", OrderID = 15, InputDivCssClass = "col-md-4", InputType = InputTypes.DropDown, CssClass = "en", DataURL = "/Manage/data/GetEnumJson?EnumName=RichTextEditorLanguages")]
        public int? RichTextEditorLanguage { get; set; }


        /// <summary>
        /// آدرس سرویسی که دیتا ورودی را تامین می کند
        /// <para> نوع دیتا باید </para>
        /// <para> JSON</para>
        /// <para> باشد</para>
        /// </summary>
        [Input(Label = "Data URL", OrderID = 16, InputDivCssClass = "col-md-6", CssClass = "en", InputType = InputTypes.SingleLineText)]
        public string DataURL { get; set; }


        [Input(Label = "Depend On Property", OrderID = 17, InputDivCssClass = "col-md-3", CssClass = "en", DependOnProperty = "FormID", DataURL = "/DataController/GetFieldsForInputDependencies", InputType = InputTypes.DropDown)]
        public string DependOnProperty { get; set; }

        [Input(Label = "Group", OrderID = 17, InputDivCssClass = " col-md-3", CssClass = "", DependOnProperty = "FormID", InputType = InputTypes.SingleLineText, DataURL = "/DataController/GetFieldsForInputDependencies")]
        public string GroupWith { get; set; }


        [Input(Label = "Related ?", OrderID = 18, InputDivCssClass = "col-md-3", CssClass = "", InputType = InputTypes.CheckBox)]
        public bool Related { get; set; }

        [Input(Label = "Required", OrderID = 19, InputDivCssClass = "col-md-2", CssClass = "", InputType = InputTypes.CheckBox)]
        public bool Required { get; set; }

        [Input(Label = "Show In Grid", OrderID = 19, InputDivCssClass = "col-md-2", CssClass = "", InputType = InputTypes.CheckBox)]
        public bool ShowInGrid { get; set; }

        [Input(Label = "Allow Multiple Entry", OrderID = 19, InputDivCssClass = " col-md-3", CssClass = "", InputType = InputTypes.CheckBox)]
        public bool AllowMultipleEntry { get; set; }

        [Input(Label = "Multiple Entry Spliter(in grid)", OrderID = 19, InputDivCssClass = " col-md-2", CssClass = "en", InputType = InputTypes.SingleLineText)]
        public string MultipleEntrySpliter { get; set; }

 


        //////////////// Access Roles //////////////////// 

        [Input(Label = "Read Access Role", InputDivCssClass = "col-md-3", CssClass = "en", DataURL = "/", InputType = InputTypes.DropDown)]
        public string ReadAccessRole { get; set; }


        [Input(Label = "Create Access Role", InputDivCssClass = "col-md-3", CssClass = "en", DataURL = "/", InputType = InputTypes.DropDown)]
        public string CreatAccessRole { get; set; }


        [Input(Label = "Edit Access Role", InputDivCssClass = "col-md-3", CssClass = "en", DataURL = "/", InputType = InputTypes.DropDown)]
        public string EditAccessRole { get; set; }


        [Input(Label = "Delete Access Role", InputDivCssClass = "col-md-3", CssClass = "en", DataURL = "/", InputType = InputTypes.DropDown)]
        public string DeleteAccessRole { get; set; }

        //////////////// ////////// //////////////////// 


        public virtual ICollection<FormFieldValue> Values { get; set; }

        public Field DeepCopy()
        {
            using (MemoryStream ms = new MemoryStream())
            {
                BinaryFormatter formatter = new BinaryFormatter();
                formatter.Serialize(ms, this);
                ms.Position = 0;
                return (Field)formatter.Deserialize(ms);
            }
        }

    }
}
