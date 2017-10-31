using System.Security.Claims;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using System;
using System.Data.Entity;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Owin.Security.Cookies;


namespace HCMS.Data.Identity
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        //public static ApplicationUserManager Create()
        //{
        //    return new ApplicationUserManager(new UserStore<ApplicationUser>(context.Get<ApplicationDbContext>()));
        //}

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options,
            IOwinContext context)
        {
            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(context.Get<ApplicationDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = false,
                RequireUppercase = false,
            };
            // Configure user lockout defaults
            manager.UserLockoutEnabledByDefault = true;
            manager.DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(5);
            manager.MaxFailedAccessAttemptsBeforeLockout = 5;
            // Register two factor authentication providers. This application uses Phone and Emails as a step of receiving a code for verifying the user
            // You can write your own provider and plug in here.
            manager.RegisterTwoFactorProvider("PhoneCode", new PhoneNumberTokenProvider<ApplicationUser>
            {
                MessageFormat = "کد فعال سازی شما: {0}"
            });
            manager.RegisterTwoFactorProvider("EmailCode", new EmailTokenProvider<ApplicationUser>
            {
                Subject = "کد فعال سازی",
                BodyFormat = "کد فعال سازی شما }0{ می باشد."
            });
            //manager.EmailService = new EmailService();
            //manager.SmsService = new SmsService();
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider =
                    new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }

    // Configure the RoleManager used in the application. RoleManager is defined in the ASP.NET Identity core assembly
    public class ApplicationRoleManager : RoleManager<IdentityRole>
    {
        public ApplicationRoleManager(IRoleStore<IdentityRole, string> roleStore)
            : base(roleStore)
        {
        }

        public static ApplicationRoleManager Create(IdentityFactoryOptions<ApplicationRoleManager> options, IOwinContext context)
        {
            return new ApplicationRoleManager(new RoleStore<IdentityRole>(context.Get<ApplicationDbContext>()));
        }
    }

    //public class EmailService : IIdentityMessageService
    //{
    //    public Task SendAsync(IdentityMessage message)
    //    {
    //        //Gmail objGmail = new Gmail(message.Body, message.Subject, message.Destination, "hadi.jahangiri2015@gmail.com", "09185987913hadi");
    //        //objGmail.test();
    //        //return objGmail.SendEmailAsync();
    //        //Outlook objOutlook = new Outlook(message.Body, message.Subject, message.Destination, "hadi.jahangiri2015@outlook.com", "09185987913hadi");
    //        //return objOutlook.SendEmailAsync();

    //        //SendGride objSendGride = new SendGride(message.Body, message.Subject, message.Destination, "hadi.jahangiri2015@gmail.com", "09185987913hadi");
    //        //return objSendGride.SendEmailAsync();

    //        return Task.FromResult(0);
    //    }
    //}

    //public class SmsService : IIdentityMessageService
    //{
    //    public Task SendAsync(IdentityMessage message)
    //    {
    //        // Plug in your sms service here to send a text message.
    //        //Twilio objTwilio = new Twilio("AC22c1702eabc855a9cf563d7e581393f3", "8634cb6a7723c5e4761b067887dc293b", "+1 201-730-4664", message.Destination, message.Body);
    //        //objTwilio.SendAsync();
    //        return Task.FromResult(0);
    //    }
    //}

    // This is useful if you do not want to tear down the database each time you run the application.
    // public class ApplicationDbInitializer : DropCreateDatabaseAlways<ApplicationDbContext>
    // This example shows you how to create a new database if the Model changes
    //public class ApplicationDbInitializer : DropCreateDatabaseIfModelChanges<ApplicationDbContext>
    //{
    //    protected override void Seed(ApplicationDbContext context)
    //    {
    //        InitializeIdentityForEF(context);
    //        base.Seed(context);
    //    }

    //    public static void InitializeIdentityForEF(ApplicationDbContext db)
    //    {
    //        var userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
    //        var roleManager = HttpContext.Current.GetOwinContext().Get<ApplicationRoleManager>();

    //        //hadi Jahangiri
    //        //Ever must exist Role 3 Roles => developer, Admin,User. 

    //        #region developer

    //        string name = "Support@HappySpider.org";
    //        string password = "HappySpider@123456";
    //        string role = "developer";
    //        var developerRole = roleManager.FindByName(role);
    //        if (developerRole == null)
    //        {
    //            developerRole = new IdentityRole(role);
    //            roleManager.Create(developerRole);
    //        }
    //        var user = userManager.FindByName(name);
    //        if (user == null)
    //        {
    //            user = new ApplicationUser { UserName = name, Email = name };
    //            userManager.Create(user, password);
    //            userManager.SetLockoutEnabled(user.Id, false);
    //        }

    //        // Add user admin to Role Admin if not already added
    //        var rolesForUser = userManager.GetRoles(user.Id);
    //        if (!rolesForUser.Contains(developerRole.Name))
    //        {
    //            var result = userManager.AddToRole(user.Id, developerRole.Name);
    //        }

    //        #endregion

          


    //    }
    //}

    public class ApplicationSignInManager : SignInManager<ApplicationUser, string>
    {
        public ApplicationSignInManager(ApplicationUserManager userManager, IAuthenticationManager authenticationManager) :
            base(userManager, authenticationManager) { }

        public override Task<ClaimsIdentity> CreateUserIdentityAsync(ApplicationUser user)
        {
            return user.GenerateUserIdentityAsync((ApplicationUserManager)UserManager, CookieAuthenticationDefaults.AuthenticationType);
        }

        public static ApplicationSignInManager Create(IdentityFactoryOptions<ApplicationSignInManager> options, IOwinContext context)
        {
            return new ApplicationSignInManager(context.GetUserManager<ApplicationUserManager>(), context.Authentication);
        }
    }

   
}