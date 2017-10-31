using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.UI;
using HCMS.Business.Enum;
using HCMS.Data.Identity;
using System;
using System.Data.Entity.Migrations;
using System.Linq.Expressions;
using System.Net;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Reflection;
using HCMS.Business.DTO;
using HCMS.Data.Enum;

namespace HCMS.Business.Auth
{
    public class UserRepository
    {
        //TODO:Implement User Dashboard Detail such as UserRegister, UserConfirm,...
        //private static readonly ApplicationDbContext IdentityDb = new ApplicationDbContext();

        public static UserManager<ApplicationUser> UserManager { get; private set; }
        //public UserRepository()
        //    : this(new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext())))
        //{
        //}

        public UserRepository()
            : this(new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext())))
        {
        }


        private UserRepository(UserManager<ApplicationUser> userManager)
        {
            UserManager = userManager;
        }




        #region Static


        public static int ConfirmCount()
        {
            using (var db = new ApplicationDbContext())
            {
                return db.Users.Count(u => u.Status == (int)AuthenticateEnum.Status.Active);
            }
        }

        public static int UnConfirmCount()
        {
            using (var db = new ApplicationDbContext())
            {
                return db.Users.Count(u => u.Status == (int)AuthenticateEnum.Status.Active);
            }
        }

        public static int RegisterCount()
        {
            return 0;
        }

        /// <summary>
        /// گرفتن نام و نام خانوادگی کاربر
        /// </summary>
        /// <param name="userName">نام کاربری - پیش فرض ایمیل می باشد.</param>
        /// <returns>نام کامل</returns>
        //[OutputCache(Location = OutputCacheLocation.Client, Duration = 600, VaryByParam = "userName")]
        public static async Task<string> GetFullNameAsync(string userName)
        {
            //TODO:Implement Cashing
            using (var db = new ApplicationDbContext())
            {
                var qry = await db.Users.FirstOrDefaultAsync(u => u.UserName.ToLower() == userName.ToLower());
                if (qry != null)
                {
                    string fullName = qry.FirstName + " " + qry.LastName;
                    if (fullName == " ")
                        return qry.UserName;
                    return qry.FirstName + " " + qry.LastName;
                }
            }

            return "";
        }



        public static string GetUserIdByUsername(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                return "";

            var qry = new ApplicationDbContext().Users.FirstOrDefault(u => u.UserName == username);
            if (qry != null)
                return qry.Id;

            return "";
        }

        [OutputCache(Duration = 0)]
        public static string GetFullNameByUserId(string UserId)
        {
            var qry = new ApplicationDbContext().Users.FirstOrDefault(u => u.Id == UserId);
            //var qry = IdentityDb.Users.FirstOrDefault(u => u.UserName == userName);
            if (qry != null)
            {
                string fullName = qry.FirstName + " " + qry.LastName;
                if (fullName == " ")
                    return qry.UserName;
                return qry.FirstName + " " + qry.LastName;
            }
            return "";
        }


        [OutputCache(Duration = 0)]
        public static string GetFullName(string userName)
        {
            var qry = new ApplicationDbContext().Users.FirstOrDefault(u => u.UserName == userName);
            //var qry = IdentityDb.Users.FirstOrDefault(u => u.UserName == userName);
            if (qry != null)
            {
                string fullName = qry.FirstName + " " + qry.LastName;
                if (fullName == " ")
                    return qry.UserName;
                return qry.FirstName + " " + qry.LastName;
            }
            return "";
        }

        public static string GetProfilePictureUrl(string userName)
        {
            string default_profile_picture_url = "/content/happy/default-profile-picture.png";
            using (var db = new ApplicationDbContext())
            {

                var qry = db.Users.FirstOrDefault(u => u.UserName == userName);
                //var qry = IdentityDb.Users.FirstOrDefault(u => u.UserName == userName);
                if (qry != null)
                {
                    if (string.IsNullOrWhiteSpace(qry.ImageUrl) == false)
                        return qry.ImageUrl;
                    else
                        return default_profile_picture_url;
                }
            }
            return default_profile_picture_url;
        }

        /// <summary>
        /// گرفتن تمام یوزرها
        /// </summary>
        /// <returns>لیست کاربران</returns>
        public static List<ApplicationUser> GetAllUsers()
        {
            using (var db = new ApplicationDbContext())
            {
                //I think best solution is UserManager.GetRolesAsync()
                var users = db.Users.ToList();
                return users;
            }
        }

        /// <summary>
        /// گرفتن تمام یوزرها با اعمال شرط
        /// </summary>
        /// <param name="func">شرط مورد نظر</param>
        /// <returns>True/False</returns>
        public static List<ApplicationUser> GetAllUsers(Expression<Func<ApplicationUser, bool>> func)
        {
            using (var db = new ApplicationDbContext())
            {
                //I think best solution is UserManager.GetRolesAsync()
                var users = db.Users.Where(func).ToList();
                return users;
            }
        }

        public static List<ApplicationUser> GetBlockUserByEmail(string email)
        {
            using (var db = new ApplicationDbContext())
            {
                //I think best solution is UserManager.GetRolesAsync()
                return db.Users.Where(a => a.Email == email && a.Status == AuthenticateEnum.Status.Block).ToList();
            }
        }
        public static List<ApplicationUser> GetBlockUserById(string userId)
        {
            using (var db = new ApplicationDbContext())
            {
                //I think best solution is UserManager.GetRolesAsync()
                return db.Users.Where(a => a.Id == userId && a.Status == AuthenticateEnum.Status.Block).ToList();
            }
        }

        public static List<ApplicationUser> GetActiveUserByEmail(string email)
        {
            using (var db = new ApplicationDbContext())
            {
                return db.Users.Where(a => a.Email == email && a.Status == AuthenticateEnum.Status.Active).ToList();
            }
        }

        public static List<ApplicationUser> GetUsersByStatus(AuthenticateEnum.Status status)
        {
            using (var db = new ApplicationDbContext())
            {
                return db.Users.Where(a => a.Status == status).ToList();
            }
        }

        public static AuthenticateEnum.Status GetUserStatus(string userId)
        {
            using (var db = new ApplicationDbContext())
            {
                return db.Users.First(a => a.Id == userId).Status;
            }
        }

        public static List<ApplicationUser> GetActiveUserById(string userId)
        {
            using (var db = new ApplicationDbContext())
            {
                return db.Users.Where(a => a.Id == userId && a.Status == AuthenticateEnum.Status.Active).ToList();
            }
        }


        /// <summary>
        /// گرفتن تمام یوزرهایی که در این رول می باشند
        /// </summary>
        /// <param name="roleName">نام رول</param>
        /// <returns>لیست کاربران</returns>
        public static List<ApplicationUser> GetUsersInRole(string roleName)
        {
            using (var db = new ApplicationDbContext())
            {
                //I think best solution is UserManager.GetRolesAsync()
                var role = db.Roles.FirstOrDefault(u => u.Name == roleName);
                var usersInRole = db.Users.Where(u => u.Roles.Select(a => a.RoleId).Contains(role.Id)).ToList();
                return usersInRole;
            }
        }



        public static List<ApplicationUser> GetUsersInRolesWithRole(List<string> rolesName)
        {
            using (var db = new ApplicationDbContext())
            {
                IEnumerable<ApplicationUser> roles = null;


                foreach (var roleName in rolesName)
                {
                    var role = db.Roles.FirstOrDefault(u => u.Name == roleName);
                    roles = roles == null ? db.Users.Where(u => u.Roles.Select(a => a.RoleId).Contains(role.Id)).Include(a => a.Roles) : roles.Union(db.Users.Where(u => u.Roles.Select(a => a.RoleId).Contains(role.Id)).Include(a => a.Roles));
                }
                //I think best solution is UserManager.GetRolesAsync()


                return roles.ToList();
            }
        }

        /// <summary>
        /// گرفتن تمام یوزرهایی که در این رول نمی باشند
        /// </summary>
        /// <param name="roleName">نام رول</param>
        /// <returns>لیست کاربران</returns>
        public static List<ApplicationUser> GetUsersNotInRole(string roleName)
        {
            using (var db = new ApplicationDbContext())
            {
                var role = db.Roles.FirstOrDefault(u => u.Name == roleName);
                var usersInRole = db.Users.Where(u => !u.Roles.Select(a => a.RoleId).Contains(role.Id)).ToList();
                return usersInRole;
            }
        }

        public static ApplicationUser GetUserById(string userId)
        {
            using (var db = new ApplicationDbContext())
            {
                return db.Users.Find(userId);
            }
        }


        public static ApplicationUser GetUserByEmail(string email)
        {
            var db = new ApplicationDbContext();
            return db.Users.FirstOrDefault(a => a.Email == email);
        }


        public static ApplicationUser GetUserByUsername(string username)
        {
            var db = new ApplicationDbContext();
            return db.Users.FirstOrDefault(a => a.UserName == username);
        }

        public static ApplicationUser GetUserByPhone(string phoneNumber)
        {
            using (var db = new ApplicationDbContext())
            {
                return db.Users.FirstOrDefault(a => a.PhoneNumber == phoneNumber);
            }
        }

        public static ApplicationUser GetUserByMobile(string mobileNumber)
        {
            using (var db = new ApplicationDbContext())
            {
                return db.Users.FirstOrDefault(a => a.Mobile == mobileNumber);
            }
        }


        public static ApplicationUser SetMobileConfirmCode(string mobileNumber, string code)
        {

            using (var db = new ApplicationDbContext())
            {
                var user = db.Users.FirstOrDefault(a => a.Mobile == mobileNumber);

                user.MobileConfirmCode = code;
                db.SaveChanges();
                return user;
            }
        }



        /// <summary>
        /// گرفتن تمام رول های موجود در سیستم
        /// </summary>
        /// <returns></returns>
        public static List<string> GetAllRole()
        {
            using (var db = new ApplicationDbContext())
            {
                return db.Roles.Select(a => a.Name).ToList();
            }
        }


        public static string GetRoleName(string roleId)
        {
            using (var db = new ApplicationDbContext())
            {
                var model = db.Roles.FirstOrDefault(a => a.Id == roleId);
                if (model != null)
                    return model.Name;
            }
            return String.Empty;
        }

        public static string GetRoleId(string roleName)
        {
            using (var db = new ApplicationDbContext())
            {
                var model = db.Roles.FirstOrDefault(a => a.Name == roleName);
                if (model != null)
                    return model.Id;
            }
            return String.Empty;
        }

        public static bool UserHassPassword(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new Exception("Bad Request");
            }

            using (var db = new ApplicationDbContext())
            {
                var model = db.Users.FirstOrDefault(a => a.Id == userId);
                if (model != null)
                    if (string.IsNullOrWhiteSpace(model.PasswordHash))
                        return false;

                return true;
            }

        }

        #endregion


        //Need User Manager
        #region None Static class

        public IdentityResult Update(ApplicationUser user)
        {

            var db = new ApplicationDbContext();


            //          db.Entry(user).State = EntityState.Modified;
            db.Users.AddOrUpdate(user);
            db.SaveChanges();

            return IdentityResult.Success;

        }

        public IdentityResult CreateUser(ApplicationUser user, string password, string role)
        {
            var result = UserManager.Create(user, password);
            if (result.Succeeded)
            {
                result = UserManager.AddToRole(user.Id, role);
            }

            return result;
        }

        public List<ApplicationUser> GetUsersInRole(List<string> rolesName)
        {
            List<string> roleId = new List<string>();
            using (var db = new ApplicationDbContext())
            {
                foreach (var role in rolesName)
                {
                    var model = db.Roles.FirstOrDefault(a => a.Name == role);
                    if (model != null)
                        roleId.Add(model.Id);
                }

                //var mainModel = db.Users.Where(a => a.Roles.Any(p => roleId.Contains(p.RoleId))).ToList();
                var mainModel = UserManager.Users.Where(a => a.Roles.Any(p => roleId.Contains(p.RoleId))).ToList();
                return mainModel;
            }
        }

        public IdentityResult RemoveFromRole(string userId, string roleName)
        {
            return UserManager.RemoveFromRole(userId, roleName);
        }

        public IdentityResult AddToRole(string userId, string roleName)
        {
            return UserManager.AddToRole(userId, roleName);
        }

        public IdentityResult ConfirmEmail(string userId, string token)
        {
            return UserManager.ConfirmEmail(userId, token);
        }

        public IdentityResult RemoveUser(ApplicationUser user)
        {
            using (var db = new ApplicationDbContext())
            {
                db.Entry(user).State = EntityState.Deleted;
                db.Users.Remove(user);
                db.SaveChanges();

                return IdentityResult.Success;
            }
        }



        #endregion



    }
}