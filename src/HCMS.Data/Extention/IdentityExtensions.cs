using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace HCMS.Data.Extention
{
    public static class IdentityExtensions
    {

        /// <summary>
        /// گرفتن نام و نام خانوادگی کاربر
        /// </summary>
        /// <param name="user">نام کاربری - پیش فرض ایمیل می باشد.</param>
        /// <returns>نام کامل</returns>
        public static string FullName(this IPrincipal user)
        {
            var fullName = ((ClaimsIdentity) user.Identity).FindFirst("FullName").Value;
            return (fullName == " " ? user.Identity.Name : fullName);
        }

        ///// <summary>
        ///// متدی برای گرفتن نقش یک یوزر
        ///// </summary>
        ///// <param name="identity"></param>
        ///// <returns></returns>
        //public static List<string> GetRoles(this IIdentity identity)
        //{
        //    var roles = ((ClaimsIdentity)identity).Claims
        //        .Where(c => c.Type == ClaimTypes.Role)
        //        .Select(c => c.Value);
        //    return roles.ToList();
        //}
    }



}
