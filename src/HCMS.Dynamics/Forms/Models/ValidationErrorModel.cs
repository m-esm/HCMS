using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Forms.Models
{
   public class ValidationErrorModel
    {
        public int FieldID { get; set; }

        public string ErrorMessage { get; set; }
        public string HtmlFieldName { get; set; }
    }
}
