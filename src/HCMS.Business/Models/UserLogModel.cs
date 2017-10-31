using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Business.Models
{
    public class UserLogModel
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string Ip { get; set; }
        public string Browser { get; set; }
        public DateTime? LogInDate { get; set; }
        public DateTime? LogOutDate { get; set; }
        
    }
}
