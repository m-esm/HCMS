using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Resources;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using HCMS.Business.Auth;
using HCMS.Data.Identity;
using HCMS.Security.Infrastructer;
using HCMS.Web.Controllers;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using MoreLinq;
using WebGrease.Css.Extensions;
using ModelBindingContext = System.Web.ModelBinding.ModelBindingContext;
using HCMS.Web.Areas.Manage.Models;
using System.IO;
using HCMS.Business;

namespace HCMS.Web.Areas.Manage.Controllers
{
    [MyAuthorize("Developer,Admin")]
    public class UsersAdminController : AccountBaseController
    {
        public UsersAdminController()
        {
        }

        public UsersAdminController(ApplicationUserManager userManager, ApplicationRoleManager roleManager)
        {
            UserManager = userManager;
            RoleManager = roleManager;
        }

      

        //
        // GET: /Users/
        public ActionResult Index()
        {
            var role = RoleManager.Roles.FirstOrDefault(u => u.Name == "Developer");
            //var usersInRole = UserManager.Users.Where(u => !u.Roles.Select(a => a.RoleId).Contains(role.Id)).ToList();

           var usersInRole = UserManager.Users.ToList();

            return View(usersInRole);
        }

        //ConfirmEmail

        public async Task<ActionResult> ConfirmEmail(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            ApplicationDbContext db = new ApplicationDbContext();

            var user = db.Users.FirstOrDefault(p => p.Id == id);

            user.EmailConfirmed = true;

            db.SaveChanges();

            return RedirectToAction("Index");
        }

        //
        // GET: /Users/Details/5
        public async Task<ActionResult> Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var user = await UserManager.FindByIdAsync(id);

            ViewBag.RoleNames = await UserManager.GetRolesAsync(user.Id);

            return View(user);
        }

        //
        // GET: /Users/Create
        public async Task<ActionResult> Create()
        {
            TempData["Roles"] = new SelectList(RoleManager.Roles, "Name","Name");
            RegisterViewModel model = new RegisterViewModel();
            //model.RoleList = new SelectList(RoleManager.Roles.Where(u => u.Name != "Developer").ToList(), "Name",
            //    "Name");
            return View(model);
        }

        //
        // POST: /Users/Create
        [HttpPost]
        public ActionResult Create(RegisterViewModel userViewModel, params string[] selectedRoles)
        {
            TempData["Roles"] = new SelectList(RoleManager.Roles, "Name","Name");
          

            if (ModelState.IsValid)
            {
                if (selectedRoles == null)
                {
                    ModelState.AddModelError("", @"لطفا نقشی را برای کاربر انتخاب کنید");
                    
                    return View(userViewModel);
                }
                var user = new ApplicationUser { UserName = userViewModel.Username };

                user.RegisterDate = DateTime.Now;
                user.LastLoginDate = DateTime.Now;
                user.Email = user.UserName;
                user.EmailConfirmed = true;

                var adminresult =  UserManager.Create(user, userViewModel.Password);

                //Add User to the selected Roles 
                if (adminresult.Succeeded)
                {
                    //if (selectedRoles != null)
                    //{
                        var result = UserManager.AddToRoles(user.Id, selectedRoles);
                        if (!result.Succeeded)
                        {
                            ModelState.AddModelError("", result.Errors.First());
                            //ViewBag.RoleId = new SelectList(await RoleManager.Roles.ToListAsync(), "Name", "Name");
                            return View();
                        }
                    //}
                }
                else
                {
                    ModelState.AddModelError("", adminresult.Errors.First());
                    //ViewBag.RoleId = new SelectList(RoleManager.Roles, "Name", "Name");
                    return View();

                }
                return RedirectToAction("Index");
            }
            //ViewBag.RoleId = new SelectList(RoleManager.Roles, "Name", "Name");
            return View();
        }

        //
        // GET: /Users/Edit/1
        public async Task<ActionResult> Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var user = await UserManager.FindByIdAsync(id);
            if (user == null)
            {
                return HttpNotFound();
            }

            var userRoles = await UserManager.GetRolesAsync(user.Id);

            return View(new EditUserViewModel()
            {
                Id = user.Id,
                Email = user.Email,
                RolesList = RoleManager.Roles.ToList().Select(x => new SelectListItem()
                {
                    Selected = userRoles.Contains(x.Name),
                    Text = x.Name,
                    Value = x.Name
                })
            });
        }

        //
        // POST: /Users/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Email,Id,Status")] EditUserViewModel editUser, params string[] selectedRole)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByIdAsync(editUser.Id);
                if (user == null)
                {
                    return HttpNotFound();
                }

                user.UserName = editUser.Email;
                user.Email = editUser.Email;
                user.Status = editUser.Status;

                var result = UserManager.Update(user);

                if (result != IdentityResult.Success)
                {
                    ModelState.AddModelError("", result.Errors.First());
                    return View();
                }

                var userRoles = await UserManager.GetRolesAsync(user.Id);

                selectedRole = selectedRole ?? new string[] { };

                result = await UserManager.AddToRolesAsync(user.Id, selectedRole.Except(userRoles).ToArray<string>());

                if (!result.Succeeded)
                {
                    ModelState.AddModelError("", result.Errors.First());
                    return View();
                }
                result = await UserManager.RemoveFromRolesAsync(user.Id, userRoles.Except(selectedRole).ToArray<string>());

                if (!result.Succeeded)
                {
                    ModelState.AddModelError("", result.Errors.First());
                    return View();
                }
                return RedirectToAction("Index");
            }
            ModelState.AddModelError("", "Something failed.");
            return View();
        }

        //
        // GET: /Users/Delete/5
        public async Task<ActionResult> Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var user = await UserManager.FindByIdAsync(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        //
        // POST: /Users/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            if (ModelState.IsValid)
            {
                if (id == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }

                var user = await UserManager.FindByIdAsync(id);
                if (user == null)
                {
                    return HttpNotFound();
                }
                var result = await UserManager.DeleteAsync(user);
                if (!result.Succeeded)
                {
                    ModelState.AddModelError("", result.Errors.First());
                    return View();
                }
                return RedirectToAction("Index");
            }
            return View();
        }

        public async Task<ActionResult> ChangeUserPassword(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var user = await UserManager.FindByIdAsync(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            ViewBag.Email = user.Email;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangeUserPassword(ChangeUserPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await UserManager.FindByEmailAsync(model.Email);


            //When You Want Change User Password You Must Remove Password than Add new password.
            var removepassword = UserManager.RemovePassword(user.Id);
            if (removepassword.Succeeded)
            {
                var addpassword = await UserManager.AddPasswordAsync(user.Id, model.Password);

                //TODO: Impelent When User is Create Show To Admin "Change Password is Successd."
                if(addpassword.Succeeded)
                    return RedirectToAction("Index");
            }

            AddErrors(removepassword);
            return View(model);
        }

        public ActionResult CompleteUserProfile(string id)
        {
            if(string.IsNullOrWhiteSpace(id))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var qry = UserManager.FindById(id);
            if(qry == null)
            {
                return HttpNotFound();
            }

            var model = new CompleteProfileDTO();
            if (qry != null)
            {
                model.UserId = id;
                model.FirstName = qry.FirstName;
                model.LastName = qry.LastName;
                model.Address = qry.Address;
                model.NationalCode = qry.NationalCode;
                model.Phone = qry.PhoneNumber;
                model.ZipCode = qry.ZipCode;
                model.ImageUrl = qry.ImageUrl;
            }
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CompleteUserProfile(CompleteProfileDTO model)
        {
            if (!ModelState.IsValid)
                return View();

            if (Request.Files["file"] != null && Request.Files["file"].ContentLength > 0)
            {
                if (!FileValidator(Request.Files, model.UserId))
                    return View(model);
            }

            var user = UserManager.FindById(model.UserId);
            if (user != null)
            {
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.Address = model.Address;
                user.NationalCode = model.NationalCode;
                user.PhoneNumber = model.Phone;
                user.ZipCode = model.ZipCode;

                var result = UserManager.Update(user);

                //اگر تکمیل پروفایل با موفقیت انجام شد به صفحه اصلی میرویم
                //در غیر این صورت خطا میدهیم
                if (result.Succeeded)
                    return RedirectToAction("Index");
                else
                {
                    AddErrors(result);
                }
            }
            return View();
        }

        //TODO: Plz write public file validator for use all
        /// <summary>
        /// اعتبار سنجی عکس آپلود شده
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        private bool FileValidator(HttpFileCollectionBase file, string userId)
        {
            // if file's content length is zero or no files submitted
            //if (Request.Files["file"] != null || Request.Files["file"].ContentLength == 0)
            //{
            //    ModelState.AddModelError("", "لطفا عکس خود را بارگذاری کنید.");
            //    return false;
            //}

            // check the file size (max 1 Mb)

            if (Request.Files[0].ContentLength > 1024 * 1024 * 1)
            {
                ModelState.AddModelError("", "ججم عکس نباید بیشتر از 1 مگابایت باشد.");
                return false;
            }

            // check the file size (min 100 bytes)

            if (Request.Files[0].ContentLength < 100)
            {
                ModelState.AddModelError("", "کیفیت عکس بسیار پایین می باشد. لطفا عکس دیگری را آپلود کنید.");
                return false;
            }

            // check file extension

            string extension = Path.GetExtension(Request.Files[0].FileName).ToLower();

            if (extension != ".jpg" && extension != ".bmp")
            {
                ModelState.AddModelError("", "پسوند عکس باید یکی از پسوندهای زیر باشد : jpg , bmp");
                return false;
            }

            // extract only the filename
            //var fileName = Path.GetFileName(Request.Files[0].FileName);
            var fileName = userId + "" + extension;

            // store the file inside ~/App_Data/uploads folder
            var path = Path.Combine(Server.MapPath("~/Files/Uploads/UserAvatar"), fileName);

            try
            {
                if (System.IO.File.Exists(path))
                    System.IO.File.Delete(path);

                Request.Files[0].SaveAs(path);
                return true;
            }
            catch (Exception ex)
            {
             //   HCMS.Data.Log.Log.ExceptionLog(ex);
                ModelState.AddModelError("", "بارگذاری عکس به خطا خورد.");
                return false;
            }
        }
     
    }
}
