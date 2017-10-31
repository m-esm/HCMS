using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Tools
{
   public static  class DateHelper
    {
       public static string FamiliarDateTime(DateTime dt)
       {
           StringBuilder result = new StringBuilder();
           //difference

           TimeSpan dif = DateTime.Now - dt;

           bool past = true;

           if (dif.TotalDays < 0)
           {
               past = false;
               dif = dt - DateTime.Now;
           }

           if ((int)dif.TotalDays > 0)
           {
               result.Append((int)dif.TotalDays + " روز ");
           }

           if (result.ToString().Contains("روز"))
               result.Append(" و ");

           if ((int)dif.TotalHours > 0)
           {
               result.Append((int)dif.TotalHours - ((int)dif.TotalDays * 24) + " ساعت ");
           }
           else
           {
               if ((int)dif.TotalMinutes > 0)
               {
                   result.Append((int)dif.TotalMinutes + " دقیقه ");
               }
               else
               {
                   if ((int)dif.TotalSeconds > 0)
                   {
                       result.Append((int)dif.TotalSeconds + " ثانیه ");
                   }
                   else
                   {
                       result.Append((int)dif.TotalMilliseconds + " میلی ثانیه ");
                   }

               }
           }

           if (past)
           {
               result.Append(" پیش ");
           }
           else
           {
               result.Append(" دیگر ");

           }

           return result.ToString();

       }
    }
}
