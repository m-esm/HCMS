using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Business.Models
{
    public class SystemLogModel
    {
        public Guid GuidId { get; set; }
        public string UserName { get; set; }
        public DateTime? LogDate { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
        public string Descrp1 { get; set; }
        public string Descrp2 { get; set; }
        public string Descrp3 { get; set; }
        public string Descrp4 { get; set; }
    }
}
