using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Resources;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using HCMS.Business;
using HCMS.Data.Identity;
using HCMS.Business.Auth;
using HCMS.Business.Logger;
using HCMS.Security.Infrastructer;
using HCMS.Web.Controllers;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using MoreLinq;
using WebGrease.Css.Extensions;
using ModelBindingContext = System.Web.ModelBinding.ModelBindingContext;
using HCMS.Web.Areas.Manage.Models;
using Microsoft.Owin.Security;
using HCMS.Dynamics.Localization;
using System.Net.Http;
using System.Text;
using System.Security.Claims;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Security.Cookies;
using HCMS.Web.Areas.Manage.Providers;
using System.Web.Security;
using System.Security.Principal;
using System.Web.Script.Serialization;
using Facebook;
using HCMS.Business.Models;
using HCMS.Web.Provider;
using HCMS.Web.Serivces;
using System.Text.RegularExpressions;
using HCMS.Dynamics.Tools;
using HCMS.Business.DTO;

namespace HCMS.Web.Areas.Manage.Controllers
{
    public class AuthController : AccountBaseController
    {
        private readonly UserRepository _userRepository = new UserRepository();

        private static readonly Random getrandom = new Random();
        private static readonly object syncLock = new object();
        public static int GetRandomNumber(int min, int max)
        {
            lock (syncLock)
            { // synchronize
                return getrandom.Next(min, max);
            }
        }

        [HttpPost]
        [Authorize]
        public JsonResult PersonalInformation(PersonalInformationDTO model)
        {
            string resultMsg;

            if (model.Year == 0)
                ModelState.AddModelError("", @"سال تولد را وارد کنید.");

            if (model.Month == 0)
                ModelState.AddModelError("", @"ماه تولد را وارد کنید.");

            if (model.Day == 0)
                ModelState.AddModelError("", @"روز تولد را وارد کنید.");

            if (!ModelState.IsValid)
            {

                return Json(new
                {
                    result = false,
                    value = LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToArray())
                }, JsonRequestBehavior.AllowGet);

            }

            if (!string.IsNullOrWhiteSpace(model.NationalCode))
                if (!ValidNationalCode.IsValidNationalCode(out resultMsg, model.NationalCode))
                {
                    return Json(new { result = false, value = resultMsg }, JsonRequestBehavior.AllowGet);
                }

            var user = UserRepository.GetUserByUsername(User.Identity.Name); ;
            if (user != null)
            {

                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.FatherName = model.FatherName;
                user.CertificateCode = model.CertificateCode;
                user.NationalCode = model.NationalCode;
                if (model.Year != 0 && model.Month != 0 && model.Day != 0)
                    user.BirthDate = model.Year + (model.Month < 10 ? "0" + model.Month : model.Month.ToString()) + (model.Day < 10 ? "0" + model.Day : model.Day.ToString());
                user.BirthPlace = model.BirthPlace;
                user.Phone = model.Phone;
                user.Mobile = model.Mobile;
                user.Address = model.Address;
                user.ZipCode = model.ZipCode;
                user.DegreeOfEducation = model.DegreeOfEducation;
                user.FieldOfStudy = model.FieldOfStudy;

                //if (model.BirthDate != null)
                //    user.BirthDate = m2s.ShamsiTogregorian(model.BirthDate.Value);

                user.Gender = (byte)model.Gender;


                //user.ImageUrl = "/Files/Uploads/useravatar/" + User.Identity.GetUserId() + Path.GetExtension(Request.Files[0].FileName).ToLower();

                var result = _userRepository.Update(user);
                //اگر تکمیل پروفایل با موفقیت انجام شد به صفحه اصلی میرویم
                //در غیر این صورت خطا میدهیم
                if (result.Succeeded)
                {
                    return Json(new { result = true, value = "اطلاعات شخصی شما ذخیره شد ." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { result = false, value = "عملیات ذخیره سازی اطلاعات شما با خطلا مواجه شد , لطفا محددا تلاش کنید !" }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { result = false, value = "خطای سیستمی , کاربر مشخص نیست !" }, JsonRequestBehavior.AllowGet);
            //return Redirect("~/onlinechat/register");
        }


        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            //اگر کاربر لاگین کرده بود دیگر صفحه لاگین را نتواند باز کند
            if (User.Identity.IsAuthenticated)
            {
                //if (User.IsInRole("User"))
                //    return RedirectToAction("Index", "Home");
                //if (User.IsInRole("Admin") || User.IsInRole("developer"))
                //    return RedirectToAction("Index", "Dashboard", new { area = "Manage" });
                //  return Redirect("~/manage");
                Response.Write(User.Identity.Name);
            }

            var model = new LoginViewModel() { ReturnUrl = returnUrl };
            return View("Account/Login", model);
        }

        // POST: /Admin/Login
        [HttpPost]
        [AllowAnonymous]
        //    [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string captcha_guid)
        {
            string captcha_session_key = "captcha_login" + captcha_guid;

            if (Session[captcha_session_key] == null)
            {
                ModelState.AddModelError("", @"کد امنیتی منقضی شده است");
            }
            else if (model.Captcha != Session[captcha_session_key].ToString())
            {
                ModelState.AddModelError("", @"کد امنیتی وارد شده اشتباه است.");
            }


            if (!ModelState.IsValid)
            {
                if (model.isAjax)
                {
                    return Json(LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                                 .Select(e => e.ErrorMessage)
                                 .ToArray()));
                }
                return View("Account/Login", model);
            }

            ApplicationUser user = UserRepository.GetUserByUsername(model.UserName);
            if (user == null)
                if (model.UserName.Contains("@"))
                    user = UserRepository.GetUserByEmail(model.UserName);

            if (user == null)
                if (!model.UserName.Contains("@"))
                    user = UserRepository.GetUserByMobile(model.UserName);

            var request = HttpContext.Request;//.Current.Request;
            var tokenServiceUrl = request.Url.GetLeftPart(UriPartial.Authority) + request.ApplicationPath + "/Token";

            using (var client = new HttpClient())
            {
                var requestParams = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("grant_type", "password"),
                new KeyValuePair<string, string>("username", user.UserName),
                new KeyValuePair<string, string>("password", model.Password)
            };
                var requestParamsFormUrlEncoded = new FormUrlEncodedContent(requestParams);
                var tokenServiceResponse = await client.PostAsync(tokenServiceUrl, requestParamsFormUrlEncoded);
                var responseString = await tokenServiceResponse.Content.ReadAsStringAsync();
                var responseCode = tokenServiceResponse.StatusCode;
                var responseMsg = new HttpResponseMessage(responseCode)
                {
                    Content = new StringContent(responseString, Encoding.UTF8, "application/json")
                };
            }




            if (user != null)
            {

                //if (user.EmailConfirmed == false && user.MobileConfirmed == false)
                //{
                //    ModelState.AddModelError("", @"نام کاربری یا شماره موبایل شما فعال سازی نشده است !");
                //    if (model.isAjax)
                //    {
                //        return Json(LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                //                     .Select(e => e.ErrorMessage)
                //                     .ToArray()));
                //    }
                //    return View("Account/Login", model);

                //}

                ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(UserManager,
                  OAuthDefaults.AuthenticationType);
                ClaimsIdentity cookieIdentity = await user.GenerateUserIdentityAsync(UserManager,
                      CookieAuthenticationDefaults.AuthenticationType);

                AuthenticationProperties properties = ApplicationOAuthProvider.CreateProperties(user.UserName);
                AuthenticationManager.SignIn(properties, oAuthIdentity, cookieIdentity);

                FormsAuthentication.SetAuthCookie(user.UserName, true);

                //When user is login we must update LastLoginDate
                UpdateLogin(user.UserName);

                if (model.isAjax)
                    return Json(new string[] { });

                if (string.IsNullOrWhiteSpace(model.ReturnUrl))
                    return Redirect("/manage");

                return Redirect(HttpUtility.UrlDecode(model.ReturnUrl));

            }


            ModelState.AddModelError("", Phrases.Get(@"Username or password is invalid ."));

            if (model.isAjax)
            {
                return Json(LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                          .Select(e => e.ErrorMessage)
                          .ToArray()));
            }

            return View("Account/Login", model);
        }

        private async Task<ActionResult> loginUser(LoginViewModel model)
        {
            ApplicationUser user = UserRepository.GetUserByUsername(model.UserName);
            if (user == null)
                if (model.UserName.Contains("@"))
                    user = UserRepository.GetUserByEmail(model.UserName);

            if (user == null)
                if (!model.UserName.Contains("@"))
                    user = UserRepository.GetUserByMobile(model.UserName);

            var request = HttpContext.Request;//.Current.Request;
            var tokenServiceUrl = request.Url.GetLeftPart(UriPartial.Authority) + request.ApplicationPath + "/Token";

            using (var client = new HttpClient())
            {
                var requestParams = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("grant_type", "password"),
                new KeyValuePair<string, string>("username", user.UserName),
                new KeyValuePair<string, string>("password", model.Password)
            };
                var requestParamsFormUrlEncoded = new FormUrlEncodedContent(requestParams);
                var tokenServiceResponse = await client.PostAsync(tokenServiceUrl, requestParamsFormUrlEncoded);
                var responseString = await tokenServiceResponse.Content.ReadAsStringAsync();
                var responseCode = tokenServiceResponse.StatusCode;
                var responseMsg = new HttpResponseMessage(responseCode)
                {
                    Content = new StringContent(responseString, Encoding.UTF8, "application/json")
                };
            }


            if (user != null)
            {

                //if (user.EmailConfirmed == false && user.MobileConfirmed == false)
                //{
                //    ModelState.AddModelError("", @"نام کاربری یا شماره موبایل شما فعال سازی نشده است !");
                //    if (model.isAjax)
                //    {
                //        return Json(LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                //                     .Select(e => e.ErrorMessage)
                //                     .ToArray()));
                //    }
                //    return View("Account/Login", model);

                //}

                ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(UserManager,
                  OAuthDefaults.AuthenticationType);
                ClaimsIdentity cookieIdentity = await user.GenerateUserIdentityAsync(UserManager,
                      CookieAuthenticationDefaults.AuthenticationType);

                AuthenticationProperties properties = ApplicationOAuthProvider.CreateProperties(user.UserName);
                AuthenticationManager.SignIn(properties, oAuthIdentity, cookieIdentity);

                FormsAuthentication.SetAuthCookie(user.UserName, true);

                //When user is login we must update LastLoginDate
                UpdateLogin(user.UserName);

            }

            return Redirect(HttpUtility.UrlDecode("/"));
        }

        //
        // POST: /Account/LogOff
        public ActionResult LogOff()
        {
            //   var redirect = @"~/manage/Auth/Login";
            var redirect = @"~/";

            if (User.IsInRole("User"))
                redirect = @"~/";

            foreach (var item in Request.Cookies.AllKeys)
            {
                if (item.StartsWith("."))
                    Response.Cookies.Remove(item);
            }


            AuthenticationManager.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            HttpContext.User = new GenericPrincipal(new GenericIdentity(string.Empty), null);
            FormsAuthentication.SignOut();

            return Redirect(redirect);
        }


        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Register(RegisterViewModel model, bool inapp = false, bool loginAfterReg = false)
        {
            string captcha_session_key = "captcha" + model.captcha_guid;
            if (!inapp)
                if (Session[captcha_session_key] == null)
                {
                    ModelState.AddModelError("", @"کد امنیتی وارد شده منقضی شده است .");
                }
                else if (model.Captcha != (int)Session[captcha_session_key])
                {
                    ModelState.AddModelError("", @"جواب معادله اشتباه می باشد");
                }
        


            if (!model.Username.Contains("@"))
                if (!Regex.IsMatch(model.Username, @"^\d+$"))
                    ModelState.AddModelError("", @"نام کاربری  باید ایمیل یا شماره موبایل باشد !");



            var user = new ApplicationUser { UserName = model.Username };

            if (model.Username.Contains("@"))
            {
                user.Email = model.Username;


                if (UserRepository.GetUserByEmail(model.Username) != null)
                    ModelState.AddModelError("", @"ایمیل وارد شده قبلا استفاده شده است");


            }
            else
            {

                user.Mobile = model.Username;

                if (UserRepository.GetUserByMobile(model.Username) != null)
                    ModelState.AddModelError("", @"شماره موبایل وارد شده قبلا استفاده شده است");
            }

            if (!UserManager.PasswordValidator.ValidateAsync(model.Password).Result.Succeeded)
            {
                ModelState.AddModelError("", @"رمز عبور شما معتبر نمی باشد");
            }


            if (!ModelState.IsValid)
            {
                if (model.isAjax)
                {
                    return Json(LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                                 .Select(e => e.ErrorMessage)
                                 .ToArray()));
                }
                return View(model);
            }






            if (!ModelState.IsValid)
            {
                if (model.isAjax)
                {
                    return Json(LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                                 .Select(e => e.ErrorMessage)
                                 .ToArray()));
                }
                return View(model);
            }
            //var result = await UserManager.CreateAsync(user, model.Password);
            var result = UserManager.Create(user, model.Password);

            if (result.Succeeded)
            {
                result = UserManager.AddToRole(user.Id, "User");
                if (result.Succeeded)
                {
                    var code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);

                    if (!string.IsNullOrWhiteSpace(user.Email))
                        if (Request.Url != null)
                        {


                            var callbackUrl = Url.Action("ConfirmEmail", "Auth", new { userId = user.Id, code = code },
                                protocol: Request.Url.Scheme);

                            EmailService.Send(user.Email, "تایید حساب کاربری", EmailService.MailTemplate("verify_email").Replace("#link#", callbackUrl)
                                );


                            ViewBag.Link = callbackUrl;
                        }

                    if (!string.IsNullOrWhiteSpace(user.Mobile))
                    {
                        user.MobileConfirmCode = GetRandomNumber(10000, 99999).ToString();

                        UserRepository.SetMobileConfirmCode(user.Mobile, user.MobileConfirmCode);

                        SmsService.Send(user.Mobile, "کد فعال سازی شما : " + user.MobileConfirmCode);

                    }

                    if (loginAfterReg)
                        await loginUser(new LoginViewModel { UserName = model.Username, Password = model.Password});

                    if (model.isAjax)
                    {
                        return Json(new string[] { });
                    }
                    return View("DisplayEmail");
                }
                else
                {
                    foreach (var item in result.Errors)
                        ModelState.AddModelError("", item);
                }
            }



            if (model.isAjax)
            {
                return Json(LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                          .Select(e => e.ErrorMessage)
                          .ToArray()));
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> RegisterByRole(RegisterViewModel model, bool inapp = false)
        {
            if (string.IsNullOrWhiteSpace(model.role))
                model.role = "User";

            string captcha_session_key = "captcha" + model.captcha_guid;
            if (!inapp)
                if (Session[captcha_session_key] == null)
                {
                    ModelState.AddModelError("", @"کد امنیتی وارد شده منقضی شده است .");
                }
                else if (model.Captcha != (int)Session[captcha_session_key])
                {
                    ModelState.AddModelError("", @"جواب معادله اشتباه می باشد");
                }


            if (!model.Username.Contains("@"))
                if (!Regex.IsMatch(model.Username, @"^\d+$"))
                    ModelState.AddModelError("", @"نام کاربری  باید ایمیل یا شماره موبایل باشد !");



            var user = new ApplicationUser { UserName = model.Username };

            if (model.Username.Contains("@"))
            {
                user.Email = model.Username;


                if (UserRepository.GetUserByEmail(model.Username) != null)
                    ModelState.AddModelError("", @"ایمیل وارد شده قبلا استفاده شده است");
            }
            else
            {

                user.Mobile = model.Username;

                if (UserRepository.GetUserByMobile(model.Username) != null)
                    ModelState.AddModelError("", @"شماره موبایل وارد شده قبلا استفاده شده است");
            }

            if (!UserManager.PasswordValidator.ValidateAsync(model.Password).Result.Succeeded)
            {
                ModelState.AddModelError("", @"رمز عبور شما معتبر نمی باشد");
            }


            if (!ModelState.IsValid)
            {
                if (model.isAjax)
                {
                    return Json(LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                                 .Select(e => e.ErrorMessage)
                                 .ToArray()));
                }
                return View(model);
            }



            if (!ModelState.IsValid)
            {
                if (model.isAjax)
                {
                    return Json(LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                                 .Select(e => e.ErrorMessage)
                                 .ToArray()));
                }
                return View(model);
            }
            //var result = await UserManager.CreateAsync(user, model.Password);
            var result = UserManager.Create(user, model.Password);

            if (result.Succeeded)
            {
                if (!RoleManager.RoleExists(model.role))
                    RoleManager.Create(new IdentityRole
                    {
                        Name = model.role
                    });
                result = UserManager.AddToRole(user.Id, model.role);
                if (result.Succeeded)
                {
                    var code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);

                    if (!string.IsNullOrWhiteSpace(user.Email))
                        if (Request.Url != null)
                        {


                            var callbackUrl = Url.Action("ConfirmEmail", "Auth", new { userId = user.Id, code = code },
                                protocol: Request.Url.Scheme);

                            EmailService.Send(user.Email, "تایید حساب کاربری", EmailService.MailTemplate("verify_email").Replace("#link#", callbackUrl)
                                );


                            ViewBag.Link = callbackUrl;
                        }

                    if (!string.IsNullOrWhiteSpace(user.Mobile))
                    {
                        user.MobileConfirmCode = GetRandomNumber(10000, 99999).ToString();

                        UserRepository.SetMobileConfirmCode(user.Mobile, user.MobileConfirmCode);

                        SmsService.Send(user.Mobile, "کد فعال سازی شما : " + user.MobileConfirmCode);

                    }



                    if (model.isAjax)
                    {
                        return Json(new string[] { });
                    }
                    return View("DisplayEmail");
                }
                else
                {
                    foreach (var item in result.Errors)
                        ModelState.AddModelError("", item);
                }
            }



            if (model.isAjax)
            {
                return Json(LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                          .Select(e => e.ErrorMessage)
                          .ToArray()));
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }


        [HttpPost]
        public async Task<ActionResult> VerifyEmail(string email)
        {


            if (!string.IsNullOrWhiteSpace(email))
            {

                var user = UserRepository.GetUserByEmail(email);

                if (user == null)
                {
                    if (Regex.IsMatch(email, @"^\d+$"))
                        user = UserRepository.GetUserByMobile(email);

                }

                if (user != null)
                {

                    if (email.Contains("@"))
                    {

                        var code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);

                        var callbackUrl = Url.Action("ConfirmEmail", "Auth", new { userId = user.Id, code = code },
                            protocol: Request.Url.Scheme);

                        //EmailService.Send(user.Email, "تایید حساب کاربری",
                        //    "برای تایید لطفا بر روی لینک کلیک کنید: <a href=\"" + callbackUrl + "\">link</a>");

                        if (EmailService.Send(user.Email, "تایید حساب کاربری", EmailService.MailTemplate("verify_email").Replace("#link#", callbackUrl)))
                        {
                            return Json(
                                     new
                                     {
                                         result = true,
                                         msg =
                              "ایمیل فعال سازی برای شما ارسال شد. لطفا پس از مراجعه به ایمیل خود نسبت به فعال سازی حساب خود اقدام کنید."
                                     }, JsonRequestBehavior.AllowGet);
                        }
                        else
                        {

                            return Json(
                             new
                             {
                                 result = true,
                                 msg = "فرایند ارسال ایمیل با مشکل مواجه شده است لطفا مجددا تلاش کنید ."
                             }, JsonRequestBehavior.AllowGet);


                        }

                    }
                    else
                    {
                        user.MobileConfirmCode = GetRandomNumber(10000, 99999).ToString();

                        UserRepository.SetMobileConfirmCode(user.Mobile, user.MobileConfirmCode);

                        if (SmsService.Send(user.Mobile, "کد فعال سازی شما : " + user.MobileConfirmCode))
                        {
                            return Json(
                                     new
                                     {
                                         result = true,
                                         msg =
                              "کد فعال سازی برای شماره موبایل شما ارسال شد. لطفا پس از دریافت کد نسبت به فعال سازی حساب خود اقدام کنید."
                                     }, JsonRequestBehavior.AllowGet);
                        }
                        else
                        {

                            return Json(
                             new
                             {
                                 result = true,
                                 msg = "فرایند ارسال پیامک با مشکل مواجه شده است لطفا چند دقیقه دیگر مجددا تلاش کنید ."
                             }, JsonRequestBehavior.AllowGet);


                        }


                    }

                }
                else
                {
                    return
                  Json(
                      new
                      {
                          result = false,
                          msg =
                              "لطفا ایمیل یا شماره موبایل وارد شده را چک کنید ."
                      }, JsonRequestBehavior.AllowGet);
                }


            }
            else
            {

                return
                        Json(
                            new
                            {
                                result = false,
                                msg =
                                    "لطفا ایمیل یا شماره موبایل را وارد کنید"
                            }, JsonRequestBehavior.AllowGet);

            }
        }

        //
        // GET: /Account/VerifyCode
        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl)
        {
            // Require that the user has already logged in via username/password or external login
            if (!await SignInManager.HasBeenVerifiedAsync())
            {
                return View("Error");
            }
            var user = await UserManager.FindByIdAsync(await SignInManager.GetVerifiedUserIdAsync());
            if (user != null)
            {
                ViewBag.Status = "For DEMO purposes the current " + provider + " code is: " + await UserManager.GenerateTwoFactorTokenAsync(user.Id, provider);
            }
            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl });
        }

        //
        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        // [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent: false, rememberBrowser: model.RememberBrowser);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(model.ReturnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", @"کد اشتباه است.");
                    return View(model);
            }
        }


        //
        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View("ForgotPassword");
        }



        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (Session["captcha"] == null)
            {
                ModelState.AddModelError("", @"کد امنیتی وارد شده منقضی شده است .");
            }
            else if (model.Captcha != (int)Session["captcha"])
            {
                ModelState.AddModelError("", @"جواب معادله اشتباه می باشد");
            }
            if (ModelState.IsValid)
            {

                var user = await UserManager.FindByNameAsync(model.Email);
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                {
                    ModelState.AddModelError("", @"ایمیل شما تایید نشده است");
                    if (model.isAjax)
                    {
                        return Json(new
                        {
                            result = false,
                            msg = LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                                .Select(e => e.ErrorMessage)
                                .ToArray())
                        }, JsonRequestBehavior.AllowGet);
                    }
                    return View(model);
                }

                var code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);

                var callbackUrl = Url.Action("ResetPassword", "Auth", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);

                //EmailService.Send(user.Email, "تغییر رمز عبور", "برای تغییر رمز عبور اینجا کلیک کنید: <a href=\"" + callbackUrl + "\">link</a>");
                EmailService.Send(user.Email, "تغییر رمز عبور", EmailService.MailTemplate("forget_pw").Replace("#link#", callbackUrl)
                           );
                //await UserManager.SendEmailAsync(user.Id, "تغییر یافتن رمز عبور", "برای تغییر رمز عبور اینجا کلیک کنید: <a href=\"" + callbackUrl + "\">link</a>");
                if (model.isAjax)
                {
                    return Json(new
                    {
                        result = true,
                        msg = "لینک تغییر رمز برای ایمیل شما فرستاده شده پس از ورود به اکانت ایمیلتان نسبت به تغییر آن اقدام کنید."
                    }, JsonRequestBehavior.AllowGet);
                }
                ViewBag.Link = callbackUrl;
                return View("ForgotPasswordConfirmation");
            }

            if (model.isAjax)
            {
                return Json(new
                {
                    result = false,
                    msg = LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToArray())
                }, JsonRequestBehavior.AllowGet);
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ForgotPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        //[AllowAnonymous]
        //public ActionResult GetPasswordResetToken(string uid)
        //{
        //    var code = UserManager.GeneratePasswordResetToken(uid);
        //    ViewBag.code = code;
        //    ViewBag.uid = uid;
        //    return View("GetPasswordResetToken");
        //}

        //[AllowAnonymous]
        //public JsonResult SetPassword(string uid,string token)
        //{
        //  var res =  UserManager.ResetPassword(uid,token,"0214470");
        //    return Json(res,JsonRequestBehavior.AllowGet);
        //}



        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPasswordAjax(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return Json(new
                {
                    result = false,
                    msg = "لطفا ایمیل یا شماره موبایل را وارد کنید"
                }, JsonRequestBehavior.AllowGet);

            var user = UserRepository.GetUserByEmail(email);

            if (user == null)
                if (Regex.IsMatch(email, @"^\d+$"))
                    user = UserRepository.GetUserByMobile(email);

            if (email.Contains("@"))
            {
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                {
                    return Json(new
                    {
                        result = false,
                        msg = "ایمیل شما تایید نشده است"
                    }, JsonRequestBehavior.AllowGet);
                }

                var code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);

                var callbackUrl = Url.Action("ResetPassword", "Auth", new { userId = user.Id, code = HttpUtility.UrlEncode(code) }, protocol: Request.Url.Scheme);

                var result = EmailService.Send(user.Email, "تغییر رمز عبور", EmailService.MailTemplate("forget_pw").Replace("#link#", callbackUrl));

                if (result)
                    return Json(new
                    {
                        result = true,
                        msg = "لینک تغییر رمز برای ایمیل شما فرستاده شده پس از ورود به اکانت ایمیلتان نسبت به تغییر آن اقدام کنید."
                    }, JsonRequestBehavior.AllowGet);

                return Json(new
                {
                    result = false,
                    msg = "ایمیل ارسال نشد. لطفا بعدا مجددا تلاش کنید."
                }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                /// send to mobile ///////////////////////////////////
                /// 
                if (user == null)
                    return Json(new
                    {
                        result = false,
                        msg = "شماره موبایل شما تایید نشده است"
                    }, JsonRequestBehavior.AllowGet);

                if (user.MobileConfirmed == false)
                    return Json(new
                    {
                        result = false,
                        msg = "شماره موبایل شما تایید نشده است"
                    }, JsonRequestBehavior.AllowGet);


                user.MobileConfirmCode = GetRandomNumber(10000, 99999).ToString();

                UserRepository.SetMobileConfirmCode(user.Mobile, user.MobileConfirmCode);

                var result = SmsService.Send(user.Mobile, "با استفاده از این کد رمزعبور خود را تغییر دهید : " + user.MobileConfirmCode);


                if (result)
                    return Json(new
                    {
                        result = true,
                        msg = "کد  تغییر رمز برای شماره موبایل شما فرستاده شده پس از دریافت کد نسبت به تغییر رمزعبور اقدام نمائید."
                    }, JsonRequestBehavior.AllowGet);

                return Json(new
                {
                    result = false,
                    msg = "پیامک ارسال نشد. لطفا بعدا مجددا تلاش کنید."
                }, JsonRequestBehavior.AllowGet);
            }



        }


        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);

            return Redirect("/?emailConfirm=" + result.Succeeded);
            //return RedirectToAction("Index", "Ui", new { emailConfirm = result.Succeeded });
            //return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }


        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string userId, string code)
        {
            return Redirect("/ResetPassword?userId=" + userId + "&code=" + code);
            //return code == null ? View("Error") : View();
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]

        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {

            if (String.IsNullOrWhiteSpace(model.Email) || String.IsNullOrWhiteSpace(model.Password) || String.IsNullOrWhiteSpace(model.Code))
            {

                return Json(new
                {
                    result = false,
                    msg = new string[] { "مقادیر وارد شده را بازبینی نمایید !" },
                }, JsonRequestBehavior.AllowGet);

            }

            ApplicationUser user = UserRepository.GetUserByUsername(model.Email);
            if (user == null)
                if (model.Email.Contains("@"))
                    user = UserRepository.GetUserByEmail(model.Email);

            if (user == null)
                if (!model.Email.Contains("@"))
                    user = UserRepository.GetUserByMobile(model.Email);

            if (user == null)
                return Json(new
                {
                    result = false,
                    msg = new string[] { "شماره موبایل یا ایمیل وارد شده معتبر نمی باشد !" },
                }, JsonRequestBehavior.AllowGet);


            model.UserId = user.Id;


            //var user = await AdminManager.FindByNameAsync(model.Email);
            //if (user == null)
            //{
            //    // Don't reveal that the user does not exist
            //    return RedirectToAction("ResetPasswordConfirmation", "Admin");
            //}

            //model.Code = HttpUtility.UrlDecode(model.Code);
            if (model.Email.Contains("@"))
            {
                var result = await UserManager.ResetPasswordAsync(model.UserId, model.Code, model.Password);
                if (result.Succeeded)
                {
                    if (model.isAjax)
                    {
                        return Json(new
                        {
                            result = true,
                            msg = "رمز عبور شما با موفقیت تغییر یافت"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    return RedirectToAction("ResetPasswordConfirmation", "Auth");
                }

                AddErrors(result);
                if (model.isAjax)
                {
                    return Json(new
                    {
                        result = false,
                        msg = LocalizeErrors(ModelState.Values.SelectMany(m => m.Errors)
                            .Select(e => e.ErrorMessage)
                            .ToArray())
                    }, JsonRequestBehavior.AllowGet);
                }
                return View();
            }
            else
            {

                if (model.Code == user.MobileConfirmCode)
                {

                    var code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);

                    var result = await UserManager.ResetPasswordAsync(model.UserId, code, model.Password);
                    if (result.Succeeded)
                    {
                        if (model.isAjax)
                        {
                            return Json(new
                            {
                                result = true,
                                msg = "رمز عبور شما با موفقیت تغییر یافت"
                            }, JsonRequestBehavior.AllowGet);
                        }
                        return RedirectToAction("ResetPasswordConfirmation", "Auth");
                    }


                }



            }

            return Json(new
            {
                result = true,
                msg = "رمز عبور شما با موفقیت تغییر یافت"
            }, JsonRequestBehavior.AllowGet);


        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Auth", new { ReturnUrl = returnUrl }));
        }

        //
        // GET: /Account/SendCode
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl)
        {
            var userId = await SignInManager.GetVerifiedUserIdAsync();
            if (userId == null)
            {
                return View("Error");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl });
        }

        //
        // POST: /Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        // [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            // Generate the token and send it
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
            {
                return View("Error");
            }
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl });
        }

        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                return RedirectToAction("Login");
            }

            // added the following lines
            if (loginInfo.Login.LoginProvider == "Facebook")
            {
                var identity = AuthenticationManager.GetExternalIdentity(DefaultAuthenticationTypes.ExternalCookie);
                var accessToken = identity.FindFirstValue("FacebookAccessToken");
                var fb = new FacebookClient(accessToken);
                dynamic myInfo = fb.Get("/me?fields=email"); // specify the email field
                loginInfo.Email = myInfo.email;
            }
            else if (loginInfo.Login.LoginProvider.ToLower() == "twitter")
            {
                string access_token = loginInfo.ExternalIdentity.Claims.Where(x => x.Type == "urn:twitter:access_token").Select(x => x.Value).FirstOrDefault();
                string access_secret = loginInfo.ExternalIdentity.Claims.Where(x => x.Type == "urn:twitter:access_secret").Select(x => x.Value).FirstOrDefault();
                TwitterDto response = TwitterLoginHelper.TwitterLogin(access_token, access_secret, ConfigurationManager.AppSettings["twitterId"], ConfigurationManager.AppSettings["twitterSecret"]);
                // by now response.email should possess the email value you need
                loginInfo.Email = response.email;
            }

            //var email = loginInfo.ExternalPrincipal.FindFirstValue(ClaimTypes.Email);

            var existUser = UserManager.FindByEmail(loginInfo.Email);
            if (existUser == null)
            {
                //return Json("Email is exist", JsonRequestBehavior.AllowGet);

                var user = new ApplicationUser { UserName = loginInfo.Email, Email = loginInfo.Email };
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded)
                    UserManager.AddToRole(user.Id, "User");

                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user.Id, loginInfo.Login);
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }
            else
            {
                await SignInManager.SignInAsync(existUser, isPersistent: false, rememberBrowser: false);
                return RedirectToLocal(returnUrl);
            }


            ViewBag.ReturnUrl = returnUrl;
            return RedirectToAction("/");
            // Sign in the user with this external login provider if the user already has a login
            //var result = await SignInManager.ExternalSignInAsync(loginInfo, isPersistent: false);
            //switch (result)
            //{
            //    case SignInStatus.Success:
            //        return RedirectToLocal(returnUrl);
            //    case SignInStatus.LockedOut:
            //        return View("Lockout");
            //    case SignInStatus.RequiresVerification:
            //        return RedirectToAction("SendCode", new { ReturnUrl = returnUrl });
            //    case SignInStatus.Failure:
            //    default:
            //        // If the user does not have an account, then prompt the user to create an account
            //        ViewBag.ReturnUrl = returnUrl;
            //        ViewBag.LoginProvider = loginInfo.Login.LoginProvider;
            //        return RedirectToAction("ExternalLoginConfirmation",
            //            new ExternalLoginConfirmationViewModel {Email = loginInfo.Email});
            //        //return View("ExternalLoginConfirmation", new ExternalLoginConfirmationViewModel { Email = loginInfo.Email });
            //}
        }

        public ActionResult ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model)
        {
            return View(model);
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Manage");
            }

            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    return View("ExternalLoginFailure");
                }
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user);
                UserManager.AddToRole(user.Id, "User");

                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user.Id, info.Login);
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }
        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }

            return Redirect("/");
        }

        #region Helper Method

        private string GetIp()
        {
            string localIp = "?";
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (IPAddress ip in host.AddressList)
            {
                if (ip.AddressFamily.ToString() == "InterNetwork")
                {
                    localIp = ip.ToString();
                }
            }
            return localIp;
        }

        private void UserLog(LoginViewModel model)
        {
            GenericRepository<UserLogModel> objGenericRepository = new GenericRepository<UserLogModel>();
            var count = objGenericRepository.Where(u => u.UserName == model.UserName).Count();

            if (count >= 10)
            {
                UserLogModel lastUserLogModel = objGenericRepository.Where(u => u.UserName == model.UserName)
                    .OrderBy(u => u.LogInDate)
                    .FirstOrDefault();
                objGenericRepository.Remove(lastUserLogModel);
            }

            objGenericRepository.Add(new UserLogModel()
            {
                UserName = model.UserName,
                Browser = HttpContext.Request.Browser.Browser + " " + HttpContext.Request.Browser.Version,
                Ip = GetIp(),
                LogInDate = DateTime.Now
            });
            objGenericRepository.Dispose();


        }

        #endregion

    }
}