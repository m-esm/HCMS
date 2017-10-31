using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace HCMS.Business.Logger
{
    public class AuditAttribute : ActionFilterAttribute
    {
        readonly Type _typeToAudit;
        readonly string[] _fieldsToAudit;

        public AuditAttribute(Type typeToAudit, params string[] fieldsToAudit)
        {
            _typeToAudit = typeToAudit;
            _fieldsToAudit = fieldsToAudit;
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.Controller.ViewData.ModelState.IsValid)
            {
                var auditRecord = new AuditRecord();
                auditRecord.ActionName = filterContext.ActionDescriptor.ActionName;
                auditRecord.ControllerName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;
                auditRecord.DateTimeAuditRecorded = DateTime.Now;
                auditRecord.EntityTypeAudited = _typeToAudit.Name;
                auditRecord.User = "nlopez";         // use in reality something like: filterContext.HttpContext.User.Identity.Name

                var parameters = filterContext.ActionDescriptor.GetParameters();
                var parameterToAudit = parameters.SingleOrDefault(p => p.ParameterType == _typeToAudit);
                var argumentToAudit = filterContext.ActionParameters[parameterToAudit.ParameterName];
                var propertiesToAudit = parameterToAudit.ParameterType.GetProperties()
                                        .Where(p => _fieldsToAudit.Contains(p.Name));
                foreach (var propertyInfo in propertiesToAudit)
                {
                    var pi = argumentToAudit.GetType().GetProperty(propertyInfo.Name);
                    var auditValue = pi.GetValue(argumentToAudit, null);
                    auditRecord.AuditedFields[propertyInfo.Name] = auditValue.ToString();
                }
                filterContext.Controller.TempData["AuditValues"] = auditRecord;
            }
            else
            {
                filterContext.HttpContext.Response.Write("Auditing not performed, since submission was not valid.");
            }
        }
    }

    public class AuditRecord
    {
        public AuditRecord()
        {
            AuditedFields = new Dictionary<string, string>();
        }
        public IDictionary<string, string> AuditedFields { get; private set; }
        public string EntityTypeAudited { get; set; }
        public DateTime DateTimeAuditRecorded { get; set; }
        public string User { get; set; }
        public string ControllerName { get; set; }
        public string ActionName { get; set; }
    }
}
