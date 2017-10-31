using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Tools
{
    public class ValidNationalCode
    {
        /// <summary>
        /// متدی برای معتبر بودن کد ملی
        /// </summary>
        /// <param name="resultMessage">پیغام مناسب جهت نشان دادن به کاربر</param>
        /// <param name="nationalCode">کد ملی</param>
        /// <returns>False/True</returns>
        public static bool IsValidNationalCode(out string resultMessage, string nationalCode)
        {
            bool result = false;
            resultMessage = "";
            if (String.IsNullOrEmpty(nationalCode))
                resultMessage = "لطفا کد ملی را وارد نمایید";
            //throw new Exception("لطفا کد ملی را صحیح وارد نمایید");
            else
            {
                var regex = new Regex(@"\d{10}");
                if (nationalCode.Length != 10)
                    resultMessage = "طول کد ملی باید ده کاراکتر باشد";
                else if (!regex.IsMatch(nationalCode))
                    resultMessage = "کد ملی تشکیل شده از ده رقم عددی می‌باشد؛ لطفا کد ملی را صحیح وارد نمایید";
                else if (!Regex.IsMatch(nationalCode, @"^(?!(\d)\1{9})\d{10}$"))
                    resultMessage = "کد ملی وارد شده معتبر نمی باشد";
                else
                {
                    var check = Convert.ToInt32(nationalCode.Substring(9, 1));
                    var range = Enumerable.Range(0, 9)
                        .Select(x => Convert.ToInt32(nationalCode.Substring(x, 1)) * (10 - x))
                        .Sum() % 11;

                    int remainder = range % 11;
                    if (check != (remainder < 2 ? remainder : 11 - remainder))
                    {
                        resultMessage = "کد ملی وارد شده معتبر نمی باشد";
                    }
                    else
                    {
                        result = true;
                    }
                }
            }
            return result;
        }

    }
}
