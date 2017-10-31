using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using HCMS.Business.Enum;
using HCMS.Data.Enum;
using HCMS.Dynamics.Forms;

namespace HCMS.Web.Areas.Manage.Models
{
    [Form(Caption="مدیریت نقش ها")]
    public class RoleViewModel
    {
        [Input(InputType = InputTypes.Hidden)]
        public string Id { get; set; }
        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Role Name")]
        [Input(Label="Role Name", InputType = InputTypes.SingleLineText,CssClass="en",InputDivCssClass="col-md-12" )]
        public string Name { get; set; }
    }

    public class EditUserViewModel
    {
        public string Id { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Display(Name = "User Status")]
        public AuthenticateEnum.Status Status { get; set; }

        public IEnumerable<SelectListItem> RolesList { get; set; }
    }
}