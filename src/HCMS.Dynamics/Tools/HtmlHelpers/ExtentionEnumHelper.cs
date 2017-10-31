using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Web;
using HCMS.Business.Enum;

namespace HCMS.Dynamics.Tools.HtmlHelpers
{
    public static class ExtentionEnumHelper
    {
       
        /// <summary>
        /// متدی برای نشان دادن نام فارسی معادل اینام مورد نظر
        /// </summary>
        /// <param name="value">enum</param>
        /// <returns>نام فارسی</returns>
        public static string GetDisplayEnumValue(Enum value)
        {
            var filedInfo = value.GetType().GetField(value.ToString());
            
            var descriptionAttributes =
                filedInfo.GetCustomAttributes(typeof (DisplayAttribute), false) as DisplayAttribute[];
            
            if (descriptionAttributes == null) return string.Empty;
            return (descriptionAttributes.Length > 0) ? descriptionAttributes[0].Name : value.ToString();
        }

    }
}