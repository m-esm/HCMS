using System.ComponentModel.DataAnnotations;

namespace HCMS.Data.Enum
{
    public class AuthenticateEnum
    {
        public enum Status : byte
        {
            [Display(Name = @"Active")]
            Active = 0,
            [Display(Name = @"DeActive")]
            Block = 1,
            [Display(Name = @"Policy")]
            Policy = 2,
            [Display(Name = @"RequestForVitrin")]
            RequestForVitrin = 3,
            [Display(Name = @"RejectVitrin")]
            RejectVitrin = 4,
            [Display(Name = @"ActiveVitrin")]
            ActiveVitrin = 5,
            [Display(Name = @"RequestForOpenAgain")]
            RequestForOpenAgain = 6
        }

        public enum ManageMessageId
        {
            AddPhoneSuccess,
            ChangePasswordSuccess,
            SetTwoFactorSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
            RemovePhoneSuccess,
            ComoleteProfileSuccess,
            Update,
            Error
        }
    }
}
