using System.Data.Entity.Migrations;
using System.IO;

namespace HCMS.Data.Migrations.DB
{
    public sealed class Configuration : DbMigrationsConfiguration<HCMS.Data.DB>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
            MigrationsDirectory = @"Migrations\DB";
        }

        protected override void Seed(HCMS.Data.DB context)
        {
            
            //  This method will be called after migrating to the latest version.

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

            // var dirDatabaseScripts = Path.Combine(Directory.GetCurrentDirectory(), "DatabaseScripts");
            //foreach (var filePath in Directory.EnumerateFiles(dirDatabaseScripts, "*.sql")) {
            //    context.Database.ExecuteSqlCommand(File.ReadAllText(filePath));
        }
    }
}
