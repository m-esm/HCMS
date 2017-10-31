using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Web;
using System.Xml;
using System.Xml.Linq;
using EntityFramework.Audit;
using EntityFramework.Extensions;
using HCMS.Data.Migrations.DB;
using Newtonsoft.Json;

namespace HCMS.Data
{
    public class DB : DbContext, IDB
    {
        private readonly AuditLogger _auditLogger;
        public DB()
            : base("DefaultConnection")
        {
            AuditConfiguration.Default.DefaultAuditable = true;
           // _auditLogger = this.BeginAudit();
        }

        static DB()
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<DB, Configuration>());
        }

        public List<Assembly> GetMappingAssemblies()
        {
            List<Assembly> mappingAssems = new List<Assembly>();
            string bin_dir = AppDomain.CurrentDomain.BaseDirectory + "\\bin\\";
            DirectoryInfo bin_dir_info = new DirectoryInfo(bin_dir);
            var HCMS_Dlls = bin_dir_info.GetFiles("HCMS*.dll", SearchOption.AllDirectories);
            var conf_Type = typeof(EntityTypeConfiguration<>);
            foreach (var dll in HCMS_Dlls)
            {
                var assem = Assembly.LoadFrom(dll.FullName);
                mappingAssems.Add(assem);
            }

            return mappingAssems;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            foreach (var MapAssem in GetMappingAssemblies())
            {
                modelBuilder.Configurations.AddFromAssembly(MapAssem);
            }
        }

        public override int SaveChanges()
        {
            int count = 0;
            //try
            //{
                count = base.SaveChanges();

                //if (_auditLogger.LastLog != null && _auditLogger.LastLog.Entities.Count > 0)
                //{
                //    Log.Log.Logger(_auditLogger, Log.Log.LogType.Db);
                //}
            //}
            //catch (Exception ex)
            //{
            //    Log.Log.ExceptionLog(ex);
            //}
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
                    Log.Log.Logger(_auditLogger, Log.Log.LogType.Db);
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
