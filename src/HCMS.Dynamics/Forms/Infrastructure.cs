using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Forms
{
    #region Carrier Models
    /// مدل هایی که حامل دیتا برای فرم بیلدر هستند .
    /// این مدل ها ممکن است به شیوه های متفاوت توسط کانستراکچرهای متفاوت پر شوند .
    public class PropertyModel
    {
        public PropertyModel()
        {
            OrderID = 100;
            PropertyInputType = -1;
            PropertyValue = "";
        }

        public string GetMemberValue(string MemberName, string AttrName = "InputAttribute")
        {
            try
            {
                return Attributes
            .First(p => p.AttrName.ToLower() == AttrName.ToLower()).Members
            .First(p => p.MemberName.ToLower() == MemberName.ToLower()).MemberValue;

            }
            catch
            {
                return "";
            }
        }

        protected string _groupName;
        public string GroupName
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_groupName))
                    return this.GetMemberValue("GroupWith");

                return _groupName;
            }
            set { _groupName = value; }
        }
        public int OrderID { get; set; }

        public int GroupOrderID { get; set; }
        public string PropertyLabel { get; set; }
        public string PropertyName { get; set; }
        public int PropertyInputType { get; set; }
        public object PropertyValue { get; set; }
        public int? RelationID { get; set; }
        public virtual List<PropertyAttrModel> Attributes { get; set; }
    }

    public class PropertyAttrModel
    {
        public string AttrName { get; set; }
        public virtual List<PropertyAttrDataModel> Members { get; set; }

    }

    public class PropertyAttrDataModel
    {

        public string MemberName { get; set; }
        public string MemberValue { get; set; }

    }

    #endregion

    #region Attribute Data

    /// دیتا های ورودی صفت ها در این قسمت قرار میگیرد .
    /// برای راحتی استفاده از اینام استفاده شده است .
    /// توجه !
    /// دیتا های موجود در این قسمت باید عیناً در جداول مربوطه در دیتابیس هم باشند .


    public enum FormMethods
    {
        POST,
        GET
    }

    public enum InputFilters
    {
        None = 0,
        Custom = 1,
        Document = 2,
        Image = 3,
        Excel = 4
    }


    public enum InputMasks
    {
        Rial,
        Doller,
        Phone,
        Email,
        URL,
        IP,
        Website
    }


    public enum InputTypes
    {
        NotDefined = -1,
        SingleLineText = 0,
        Hidden = 1,
        TextArea = 2,
        RichTextEditor = 3,
        File = 4,
        Color = 5,
        CheckBox = 6,
        Radio = 7,
        Combo = 8,
        DropDown = 9,
        Date = 10,
        DateTime = 11,
        Time = 12,
        Number = 13,
        /// <summary>
        /// انتخاب بازه از روی بردار
        /// </summary>
        Range = 14,
        Email = 15,
        WebSite = 16,
        Tel = 17,
        Mobile = 18,
        URL = 19,
        Image = 21,
        /// <summary>
        /// انتخاب یک عدد از روی بردار
        /// </summary>
        Slider = 22,
        CheckList = 23,
        Switch = 24,
        MultiSelect = 25,
        UploadControl = 26,
        CultureSelect = 27

    }

    public enum RichTextEditorLanguages
    {
        English = 0,
        Farsi = 1
    }

    public enum RichTextEditorModes
    {
        Basic = 0,
        Standard = 1,
        Full = 2
    }


    public enum RichTextEditorSkins
    {
        Moono = 0,
        Office2013 = 1,
        BootStrap = 2
    }

    #endregion

    #region Attributes

    /// <summary>
    /// 
    /// NOTE :
    /// 
    /// All Properties written here should be sync with Form class
    ///  
    /// 
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)]
    public class FormAttribute : Attribute
    {


        public string Caption { get; set; }
        public string Method { get; set; }
        public string ActionURL { get; set; }
        public string Name { get; set; }

        public string ReadAccessRole { get; set; }
        public string CreatAccessRole { get; set; }
        public string EditAccessRole { get; set; }
        public string DeleteAccessRole { get; set; }

    }

    /// <summary>
    /// 
    /// NOTE :
    /// 
    /// All Properties written here should be sync with field class
    ///  
    /// 
    /// </summary>

    [AttributeUsage(AttributeTargets.Property)]
    public class InputAttribute : Attribute
    {

        public string Label { get; set; }

        public InputTypes InputType { get; set; }
        public InputFilters InputFilter { get; set; }

        public int OrderID { get; set; }

        /// <summary>
        /// محلی سازی توسط مازول لوکالیزیشن
        /// </summary>
        public bool Localize { get; set; }

        /// <summary>
        /// استفاده در اتخاب محدوده و تعداد فایل آپلودی و ...
        /// </summary>
        public int Min { get; set; }


        /// <summary>
        /// استفاده در اتخاب محدوده و تعداد فایل آپلودی و ...
        /// </summary>
        public int Max { get; set; }

        /// <summary>
        /// Html PlaceHolder
        /// </summary>
        public string Placeholder { get; set; }


        /// <summary>
        /// آدرس ذخیره فایل 
        /// </summary>
        public string SavePath { get; set; }


        /// <summary>
        /// آدرس دایرکتوری منبع برای انتخاب فایل 
        /// </summary>
        public string SearchPath { get; set; }


        public string CssClass { get; set; }
        public string InputDivCssClass { get; set; }

        /// <summary>
        /// <remarks>Regular Expression</remarks>
        /// <para>  برای محدود کردن ورودی </para>
        /// <para> قابلیت استفاده روی فیلتر آپلود فایل و انتخاب فایل</para>
        /// </summary>
        public string CustomRegEx { get; set; }

        public string Mask { get; set; }

        public RichTextEditorModes RichTextEditorMode { get; set; }
        public RichTextEditorSkins RichTextEditorSkin { get; set; }
        public RichTextEditorLanguages RichTextEditorLanguage { get; set; }


        /// <summary>
        /// آدرس سرویسی که دیتا ورودی را تامین می کند
        /// <para> نوع دیتا باید </para>
        /// <para> JSON</para>
        /// <para> باشد</para>
        /// </summary>
        public string DataURL { get; set; }

        public string DependOnProperty { get; set; }

        public string GroupWith { get; set; }


        public bool Related { get; set; }

        public bool Required { get; set; }

        public bool ShowInGrid { get; set; }

        public bool AllowMultipleEntry { get; set; }

        //////////////// Access Roles //////////////////// 

        public string ReadAccessRole { get; set; }
        public string CreatAccessRole { get; set; }
        public string EditAccessRole { get; set; }
        public string DeleteAccessRole { get; set; }

        //////////////// ////////// //////////////////// 



    }




    #endregion

}
