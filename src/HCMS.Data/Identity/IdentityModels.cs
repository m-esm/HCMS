using System;
using HCMS.Data.Migrations;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using System.IO;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Transactions;
using System.Xml.Linq;
using EntityFramework.Audit;
using EntityFramework.Extensions;
using HCMS.Data.Migrations.ApplicationDbContext;
using Newtonsoft.Json;
using System.Collections.Generic;
using HCMS.Data.Enum;

namespace HCMS.Data.Identity
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string Address { get; set; }
        public string ZipCode { get; set; }
        public string NationalCode { get; set; }
        public string CertificateCode { get; set; }
        public string BirthDate { get; set; }
        public int? BirthPlace { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public bool MobileConfirmed { get; set; }
        public string MobileConfirmCode { get; set; }
        public string DegreeOfEducation { get; set; }
        public string FieldOfStudy { get; set; }
        public AuthenticateEnum.Status Status { get; set; }
        public string ImageUrl { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public DateTime? RegisterDate { get; set; }
        public byte Gender { get; set; }
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            // userIdentity.AddClaim(new Claim("FullName", FirstName + " " + LastName));
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        private readonly AuditLogger _auditLogger;
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            AuditConfiguration.Default.DefaultAuditable = true;
            _auditLogger = this.BeginAudit();
        }

        static ApplicationDbContext()
        {
            // Set the database intializer which is run once during application start
            // This seeds the database with admin user credentials and admin role
            //Database.SetInitializer<ApplicationDbContext>(null);
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationDbContext, Configuration>());
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        //public DbSet<SystemLogModel> SystemLogs { get; set; }
        //public DbSet<UserLogModel> UserLogs { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Configurations.Add(new SystemLogMap());
            //modelBuilder.Configurations.Add(new UserLogMap());

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>().ToTable("Data_Identity_User");
            modelBuilder.Entity<IdentityRole>().ToTable("Data_Identity_Role");
            modelBuilder.Entity<IdentityUserRole>().ToTable("Data_Identity_UserRole");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("Data_Identity_UserClaim");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("Data_Identity_UserLogin");


        }

        public override int SaveChanges()
        {
            int count = 0;

            try
            {
                count = base.SaveChanges();

                if (_auditLogger.LastLog != null && _auditLogger.LastLog.Entities.Count > 0)
                {
                    Log.Log.Logger(_auditLogger, Log.Log.LogType.Identity);
                }
            }
            catch (Exception ex)
            {
                Log.Log.ExceptionLog(ex);
            }
            return count;
        }

        public override Task<int> SaveChangesAsync()
        {
            Task<int> count;
            try
            {
                count = base.SaveChangesAsync();
                if (_auditLogger.LastLog != null && _auditLogger.LastLog.Entities.Count > 0)
                {
                    Log.Log.Logger(_auditLogger, Log.Log.LogType.Identity);
                }
            }
            catch (Exception ex)
            {
                Log.Log.ExceptionLog(ex);
                count = Task.FromResult(0);
            }
            return count;
        }

    }
}