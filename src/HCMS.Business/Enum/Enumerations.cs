using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Business.Enum
{
    public class Enumerations
    {
        public enum Gender : byte
        {
            [Display(Name = "مرد")]
            Male = 0,
            [Display(Name = "زن")]
            Fmale = 1
        }
    }
}
