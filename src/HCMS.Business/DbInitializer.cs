using HCMS.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Business
{
    public class DbInitializer
    {
        public static void Init()
        {
            Database.SetInitializer<DB>(null);
      //    new DB().Database.Initialize()
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<DB, HCMS.Data.Migrations.DB.Configuration>());
        }

        public static void InitSystemContext()
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<DB, HCMS.Data.Migrations.DB.Configuration>());
            new DB().Database.Initialize(true);
        }

    }
}
