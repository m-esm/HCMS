using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HCMS.Web.Areas.Manage.Helpers.Dto
{
    public class UserAdminExportToExcellDto
    {
        public string UserName { get; set; }
        public string FullNam { get; set; }
    
        public string Mobile { get; set; }
  
        public DateTime? RegisterDate { get; set; }
    }
}