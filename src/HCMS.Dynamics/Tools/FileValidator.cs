using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace HCMS.Dynamics.Tools
{
    public class FileValidator
    {
        /// <summary>
        /// اعتبار سنجی عکس های وارد شده
        /// </summary>
        /// <param name="file">فایل بارگذاری شده</param>
        /// <param name="resultList">لیست خطاها</param>
        /// <returns>True/false</returns>
        public static bool ImageValidator(HttpFileCollectionBase file, out List<string> resultList)
        {
            // if file's content length is zero or no files submitted
            //if (Request.Files["file"] != null || Request.Files["file"].ContentLength == 0)
            //{
            //    ModelState.AddModelError("", "لطفا عکس خود را بارگذاری کنید.");
            //    return false;
            //}

            resultList = new List<string>();

            if (file == null || file.Count == 0)
            {
                resultList.Add("فایلی وجود ندارد");
                return false;
            }


            // check the file size (max 1 Mb)

            if (file[0].ContentLength > 1024 * 1024 * 1)
            {
                //ModelState.AddModelError("", "ججم عکس نباید بیشتر از 1 مگابایت باشد.");
                resultList.Add("ججم عکس نباید بیشتر از 1 مگابایت باشد.");
                return false;
            }

            // check the file size (min 100 bytes)

            if (file[0].ContentLength < 100)
            {
                resultList.Add("کیفیت عکس بسیار پایین می باشد. لطفا عکس دیگری را آپلود کنید.");
                //ModelState.AddModelError("", "کیفیت عکس بسیار پایین می باشد. لطفا عکس دیگری را آپلود کنید.");
                return false;
            }

            // check file extension

            string extension = Path.GetExtension(file[0].FileName).ToLower();

            if (extension != ".jpg" &&
                extension != ".bmp" &&
                extension != ".tif" &&
                extension != ".jpeg" &&
                extension != ".gif" &&
                extension != ".png")
            {
                resultList.Add("فایل وارد شده معتبر نمی باشد");
                //ModelState.AddModelError("", "پسوند عکس باید یکی از پسوندهای زیر باشد : jpg , bmp");
                return false;
            }

           

            return true;
        }

       
    }
}
