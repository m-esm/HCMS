
using System;
using System.IO;
using HCMS.Data.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using HCMS.Business.Enum;
using HCMS.Security.Infrastructer;
using HCMS.Web.Areas.Manage.Controllers;
using HCMS.Web.Controllers;
using HCMS.Web.Areas.Manage.Models;
using HCMS.Business.DTO;
using System.Collections.Generic;
using HCMS.Business;
using HCMS.Business.Auth;
using HCMS.Data.Enum;
using HCMS.Dynamics.Tools;


namespace HCMS.Web.Areas.Manage.Controllers
{

    public class ManageController : AccountBaseController
    {
        public ManageController()
        {
        }

        public ManageController(ApplicationUserManager userManager)
        {
            UserManager = userManager;
        }


        //
        // GET: /Account/Index
        public async Task<ActionResult> Index(AuthenticateEnum.ManageMessageId? message)
        {
            ViewBag.StatusMessage =
                message == AuthenticateEnum.ManageMessageId.ChangePasswordSuccess ? "رمز عبور شما با موفقیت عوض شد."
                : message == AuthenticateEnum.ManageMessageId.SetPasswordSuccess ? "رمز عبور شما با موفقیت تنظیم گردید."
                : message == AuthenticateEnum.ManageMessageId.SetTwoFactorSuccess ? "اعتبارسنجی دو مرحله ای شما با موفقیت انجام شد."
                : message == AuthenticateEnum.ManageMessageId.Error ? "خطا رخ داد. دوباره تلاش کنید."
                : message == AuthenticateEnum.ManageMessageId.AddPhoneSuccess ? "شماره تلفن شما اضافه گردید."
                : message == AuthenticateEnum.ManageMessageId.RemovePhoneSuccess ? "شماره تلفن شما حذف گردید."
                : message == AuthenticateEnum.ManageMessageId.ComoleteProfileSuccess ? "پروفایل شما تکمیل گردید."
                : "";

            var model = new IndexViewModel
            {
                HasPassword = HasPassword(),
                PhoneNumber = await UserManager.GetPhoneNumberAsync(User.Identity.GetUserId()),
                TwoFactor = await UserManager.GetTwoFactorEnabledAsync(User.Identity.GetUserId()),
                Logins = await UserManager.GetLoginsAsync(User.Identity.GetUserId()),
                BrowserRemembered = await AuthenticationManager.TwoFactorBrowserRememberedAsync(User.Identity.GetUserId())
            };
            return View(model);
        }

        //
        // GET: /Account/RemoveLogin
        public ActionResult RemoveLogin()
        {
            var linkedAccounts = UserManager.GetLogins(User.Identity.GetUserId());
            ViewBag.ShowRemoveButton = HasPassword() || linkedAccounts.Count > 1;
            return View(linkedAccounts);
        }

        //
        // POST: /Manage/RemoveLogin
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> RemoveLogin(string loginProvider, string providerKey)
        {
            AuthenticateEnum.ManageMessageId? message;
            var result = await UserManager.RemoveLoginAsync(User.Identity.GetUserId(), new UserLoginInfo(loginProvider, providerKey));
            if (result.Succeeded)
            {
                var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                if (user != null)
                {
                    await SignInAsync(user, isPersistent: false);
                }
                message = AuthenticateEnum.ManageMessageId.RemoveLoginSuccess;
            }
            else
            {
                message = AuthenticateEnum.ManageMessageId.Error;
            }
            return RedirectToAction("ManageLogins", new { Message = message });
        }

        //
        // GET: /Account/AddPhoneNumber
        public ActionResult AddPhoneNumber()
        {
            return View();
        }

        //
        // POST: /Account/AddPhoneNumber
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> AddPhoneNumber(AddPhoneNumberViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            // Generate the token and send it
            var code = await UserManager.GenerateChangePhoneNumberTokenAsync(User.Identity.GetUserId(), model.Number);
            if (UserManager.SmsService != null)
            {
                var message = new IdentityMessage
                {
                    Destination = model.Number,
                    Body = "کد فعال سازی شما : " + code
                };
                await UserManager.SmsService.SendAsync(message);
            }
            return RedirectToAction("VerifyPhoneNumber", new { PhoneNumber = model.Number });
        }

        //
        // POST: /Manage/RememberBrowser
        [HttpPost]
        public ActionResult RememberBrowser()
        {
            var rememberBrowserIdentity = AuthenticationManager.CreateTwoFactorRememberBrowserIdentity(User.Identity.GetUserId());
            AuthenticationManager.SignIn(new AuthenticationProperties { IsPersistent = true }, rememberBrowserIdentity);
            return RedirectToAction("Index", "Manage");
        }

        //
        // POST: /Manage/ForgetBrowser
        [HttpPost]
        public ActionResult ForgetBrowser()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.TwoFactorRememberBrowserCookie);
            return RedirectToAction("Index", "Manage");
        }

        //
        // POST: /Manage/EnableTFA
        [HttpPost]
        public async Task<ActionResult> EnableTFA()
        {
            await UserManager.SetTwoFactorEnabledAsync(User.Identity.GetUserId(), true);
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user != null)
            {
                await SignInAsync(user, isPersistent: false);
            }
            return RedirectToAction("Index", "Manage");
        }

        //
        // POST: /Manage/DisableTFA
        [HttpPost]
        public async Task<ActionResult> DisableTFA()
        {
            await UserManager.SetTwoFactorEnabledAsync(User.Identity.GetUserId(), false);
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user != null)
            {
                await SignInAsync(user, isPersistent: false);
            }
            return RedirectToAction("Index", "Manage");
        }

        //
        // GET: /Account/VerifyPhoneNumber
        public async Task<ActionResult> VerifyPhoneNumber(string phoneNumber)
        {
            // This code allows you exercise the flow without actually sending codes
            // For production use please register a SMS provider in IdentityConfig and generate a code here.
            var code = await UserManager.GenerateChangePhoneNumberTokenAsync(User.Identity.GetUserId(), phoneNumber);
            ViewBag.Status = "For DEMO purposes only, the current code is " + code;
            return phoneNumber == null ? View("Error") : View(new VerifyPhoneNumberViewModel { PhoneNumber = phoneNumber });
        }

        //
        // POST: /Account/VerifyPhoneNumber
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyPhoneNumber(VerifyPhoneNumberViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var result = await UserManager.ChangePhoneNumberAsync(User.Identity.GetUserId(), model.PhoneNumber, model.Code);
            if (result.Succeeded)
            {
                var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                if (user != null)
                {
                    await SignInAsync(user, isPersistent: false);
                }
                return RedirectToAction("Index", new { Message = AuthenticateEnum.ManageMessageId.AddPhoneSuccess });
            }
            // If we got this far, something failed, redisplay form
            ModelState.AddModelError("", @"کد وارد شده اشتباه است.");
            return View(model);
        }

        //
        // GET: /Account/RemovePhoneNumber
        public async Task<ActionResult> RemovePhoneNumber()
        {
            var result = await UserManager.SetPhoneNumberAsync(User.Identity.GetUserId(), null);
            if (!result.Succeeded)
            {
                return RedirectToAction("Index", new { Message = AuthenticateEnum.ManageMessageId.Error });
            }
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user != null)
            {
                await SignInAsync(user, isPersistent: false);
            }
            return RedirectToAction("Index", new { Message = AuthenticateEnum.ManageMessageId.RemovePhoneSuccess });
        }

        //
        // GET: /Manage/ChangePassword
        public ActionResult ChangePassword()
        {
            return View();
        }

        //
        // POST: /Account/Manage
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);
            if (result.Succeeded)
            {
                var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                if (user != null)
                {
                    await SignInAsync(user, isPersistent: false);
                }
                return RedirectToAction("Index", new { Message = AuthenticateEnum.ManageMessageId.ChangePasswordSuccess });
            }

            AddErrors(result);


            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> ChangePswd(ChangePassword model)
        {
            string rslMsg = "";
            if (!ModelState.IsValid)
            {
                return Json(new { result = false, value = "خطای سیستمی , مقادیر ورودی معتبر نیستند !" }, JsonRequestBehavior.AllowGet);
            }
            if (model.NewPassword != model.ConfirmPassword)
            {
                return Json(new { result = false, value = "رمزها یکی نیستند." }, JsonRequestBehavior.AllowGet);
            }
            IdentityResult pass = await UserManager.PasswordValidator.ValidateAsync(model.NewPassword);
            if (!pass.Succeeded)
            {
                foreach (var error in pass.Errors)
                {
                    rslMsg += error;
                }
                return Json(new { result = false, value = rslMsg }, JsonRequestBehavior.AllowGet);
            }
            var result = UserManager.ChangePassword(User.Identity.GetUserId(), model.CurrentPassword, model.NewPassword);
            if (result.Succeeded)
            {
                var user = UserManager.FindById(User.Identity.GetUserId());
                if (user != null)
                {
                    await SignInAsync(user, isPersistent: false);
                }
                //return RedirectToAction("Index", new { Message = AuthenticateEnum.ManageMessageId.ChangePasswordSuccess });
                return Json(new { result = true, value = "رمز عبور با موفقیت تغییر یافت :-)" }, JsonRequestBehavior.AllowGet);
            }
            rslMsg = "";
            foreach (var error in result.Errors)
            {
                rslMsg += error;
            }
            return Json(new { result = false, value = rslMsg }, JsonRequestBehavior.AllowGet);
        }


        //
        // GET: /Manage/SetPassword
        public ActionResult SetPassword()
        {
            return View();
        }

        //
        // POST: /Manage/SetPassword
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SetPassword(SetPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await UserManager.AddPasswordAsync(User.Identity.GetUserId(), model.NewPassword);
                if (result.Succeeded)
                {
                    var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                    if (user != null)
                    {
                        await SignInAsync(user, isPersistent: false);
                    }
                    if (model.IsAjax)
                    {
                        return Json(new { result = true, msg = "رمز عبور با موفقیت ثبت شد." });
                    }
                    return RedirectToAction("Index", new { Message = AuthenticateEnum.ManageMessageId.SetPasswordSuccess });
                }

                if (model.IsAjax)
                {
                    return Json(LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                                 .Select(e => e.ErrorMessage)
                                 .ToArray()));
                }

                AddErrors(result);
            }

            if (model.IsAjax)
            {
                //return Json(LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                //             .Select(e => e.ErrorMessage)
                //             .ToArray()));
                var errorModel = ModelState.Values.SelectMany(m => m.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToArray();
                return Json(new { result = false, msg = errorModel });
                
            }



            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/Manage
        public async Task<ActionResult> ManageLogins(AuthenticateEnum.ManageMessageId? message)
        {
            ViewBag.StatusMessage =
                message == AuthenticateEnum.ManageMessageId.RemoveLoginSuccess ? "ورود با اکانت های دیگر حذف گردید"
                : message == AuthenticateEnum.ManageMessageId.Error ? "خطا رخ داد. لطفا دوباره تلاش کنید."
                : "";
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user == null)
            {
                return View("Error");
            }
            var userLogins = await UserManager.GetLoginsAsync(User.Identity.GetUserId());
            var otherLogins = AuthenticationManager.GetExternalAuthenticationTypes().Where(auth => userLogins.All(ul => auth.AuthenticationType != ul.LoginProvider)).ToList();
            ViewBag.ShowRemoveButton = user.PasswordHash != null || userLogins.Count > 1;
            return View(new ManageLoginsViewModel
            {
                CurrentLogins = userLogins,
                OtherLogins = otherLogins
            });
        }

        //
        // POST: /Manage/LinkLogin
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LinkLogin(string provider)
        {
            // Request a redirect to the external login provider to link a login for the current user
            return new AuthController.ChallengeResult(provider, Url.Action("LinkLoginCallback", "Manage"), User.Identity.GetUserId());
        }

        //
        // GET: /Manage/LinkLoginCallback
        public async Task<ActionResult> LinkLoginCallback()
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync(XsrfKey, User.Identity.GetUserId());
            if (loginInfo == null)
            {
                return RedirectToAction("ManageLogins", new { Message = AuthenticateEnum.ManageMessageId.Error });
            }
            var result = await UserManager.AddLoginAsync(User.Identity.GetUserId(), loginInfo.Login);
            return result.Succeeded ? RedirectToAction("ManageLogins") : RedirectToAction("ManageLogins", new { Message = AuthenticateEnum.ManageMessageId.Error });
        }















    }
}