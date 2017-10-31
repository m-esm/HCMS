using System;
using System.Data.Entity.Migrations;
using System.Web;
using HCMS.Data.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Linq;
namespace HCMS.Data.Migrations.ApplicationDbContext
{

    public sealed class Configuration : DbMigrationsConfiguration<HCMS.Data.Identity.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
            MigrationsDirectory = @"Migrations/ApplicationDbContext";
        }

        protected override void Seed(HCMS.Data.Identity.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //TODO: Find Solution this method for execute once 
            InitializeIdentityForEf(context);
            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }

        public static void InitializeIdentityForEf(Identity.ApplicationDbContext db)
        {
            //var userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            //var roleManager = HttpContext.Current.GetOwinContext().Get<ApplicationRoleManager>();

            var roleStore = new RoleStore<IdentityRole>(db);
            var roleManager = new RoleManager<IdentityRole>(roleStore);
            var userStore = new UserStore<ApplicationUser>(db);
            var userManager = new UserManager<ApplicationUser>(userStore);    

            //hadi Jahangiri
            //Ever must exist Role 3 Roles => developer, Admin,User. 

            string name = "support@happyspider.org";
            string password = "HappySpider@123456";
            string[] roles = { "developer", "admin", "user" };

            foreach (var role in db.Roles)
            {
                role.Name = role.Name.ToLower();
                db.Entry(role).State = System.Data.Entity.EntityState.Modified;
            }

            db.SaveChanges();

       
            foreach (var role in roles)
                if (!roleManager.RoleExists(role))
                    roleManager.Create(new IdentityRole(role));
 

            var user = userManager.FindByName(name);

            if (user == null)
            {
                user = new ApplicationUser { UserName = name, EmailConfirmed = true, PhoneNumberConfirmed = true, Email = name, FirstName = "تیم پشتیبانی", LastName = "هــپی اســپایدر" };
                user.RegisterDate = DateTime.Now;
                user.LastLoginDate = DateTime.Now;
                userManager.Create(user, password);
                userManager.SetLockoutEnabled(user.Id, false);
            }

            // Add user admin to Role Admin if not already added
            
            var rolesForUser = userManager.GetRoles(user.Id);
            if (!rolesForUser.Contains("developer"))
            {
                var result = userManager.AddToRole(user.Id, "developer");
            }
        }
    }
}
