using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Web.Security;
using System.Web.UI.WebControls;

namespace HCMS.Web.Areas.Manage.Models
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required(ErrorMessage = "{0} required")]
        [Display(Name = "Email")]
        [EmailAddress(ErrorMessage = "{0} not valid")]
        public string Email { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
    }

    public class VerifyCodeViewModel
    {
        [Required(ErrorMessage = "{0} required")]
        public string Provider { get; set; }

        [Required(ErrorMessage = "{0} required")]
        [Display(Name = "Code")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "Remember Browser")]
        public bool RememberBrowser { get; set; }
    }

    public class ForgotViewModel
    {
        [Required(ErrorMessage = "{0} required")]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class LoginViewModel
    {
        [Required(ErrorMessage = "{0} required")]
        [Display(Name = "UserName")]
        //  [EmailAddress(ErrorMessage = "{0} not valid")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "{0} required")]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember Me ?")]
        public bool RememberMe { get; set; }

        [Required(ErrorMessage = " {0} required")]
        [Display(Name = "Captcha Code")]
        public string Captcha { get; set; }

        public string ReturnUrl { get; set; }

        public bool isAjax { get; set; }
    }

    public class RegisterViewModel
    {
        [Required(ErrorMessage = "{0} required")]
        //  [EmailAddress(ErrorMessage = "{0} not valid")]
        [Display(Name = "Username")]
        public string Username { get; set; }

        [Required(ErrorMessage = "{0} required")]
        [StringLength(100, ErrorMessage = "Password Minimum Length is {0}.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        [System.ComponentModel.DataAnnotations.Compare("Password", ErrorMessage = "Passwords doesnt match.")]
        public string ConfirmPassword { get; set; }

        public SelectList RoleList { get; set; }
        public int Captcha { get; set; }
        public bool isAjax { get; set; }
    }

    public class ChangeUserPasswordViewModel
    {
        [Required(ErrorMessage = @"{0} required")]
        [Display(Name = @"Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = @"{0} required")]
        [StringLength(100, ErrorMessage = @"Password Minimum Length is {0}.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = @"Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = @"Confirm Password")]
        [System.ComponentModel.DataAnnotations.Compare("Password", ErrorMessage = @"Passwords doesnt match.")]
        public string ConfirmPassword { get; set; }
    }


    public class UserResetPasswordViewModel
    {
        //[Required(ErrorMessage = @"{0} required")]
        //[EmailAddress(ErrorMessage = @"{0} not valid !")]
        //[Display(Name = @"Email")]
        //public string Email { get; set; }

        [Required(ErrorMessage = @"{0} required")]
        [StringLength(100, ErrorMessage = @"Password Minimum Length is {0}.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = @"Current Password")]
        public string CurrentPassword { get; set; }

        [Required(ErrorMessage = @"{0} required")]
        [StringLength(100, ErrorMessage = @"Password .", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = @" New Password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = @" Password Confirm")]
        [System.ComponentModel.DataAnnotations.Compare("NewPassword", ErrorMessage = @"Passwords doesnt match.")]
        public string ConfirmPassword { get; set; }
    }
    public class ResetPasswordViewModel
    {

        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [System.ComponentModel.DataAnnotations.Compare("Password")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
        public string UserId { get; set; }
        public bool isAjax { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required(ErrorMessage = "{0} required")]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = " {0} required")]
        [Display(Name = "Captcha Code")]
        public int Captcha { get; set; }

        public bool isAjax { get; set; }
    }
}