namespace HCMS.Data.Migrations.ApplicationDbContext
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Data_Identity_Role",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.Data_Identity_UserRole",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.Data_Identity_Role", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.Data_Identity_User", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.Data_Identity_User",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Address = c.String(),
                        ZipCode = c.String(),
                        NationalId = c.String(),
                        Status = c.Byte(nullable: false),
                        ImageUrl = c.String(),
                        LastLoginDate = c.DateTime(),
                        RegisterDate = c.DateTime(),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.Data_Identity_UserClaim",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Data_Identity_User", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Data_Identity_UserLogin",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.Data_Identity_User", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Data_Identity_UserRole", "UserId", "dbo.Data_Identity_User");
            DropForeignKey("dbo.Data_Identity_UserLogin", "UserId", "dbo.Data_Identity_User");
            DropForeignKey("dbo.Data_Identity_UserClaim", "UserId", "dbo.Data_Identity_User");
            DropForeignKey("dbo.Data_Identity_UserRole", "RoleId", "dbo.Data_Identity_Role");
            DropIndex("dbo.Data_Identity_UserLogin", new[] { "UserId" });
            DropIndex("dbo.Data_Identity_UserClaim", new[] { "UserId" });
            DropIndex("dbo.Data_Identity_User", "UserNameIndex");
            DropIndex("dbo.Data_Identity_UserRole", new[] { "RoleId" });
            DropIndex("dbo.Data_Identity_UserRole", new[] { "UserId" });
            DropIndex("dbo.Data_Identity_Role", "RoleNameIndex");
            DropTable("dbo.Data_Identity_UserLogin");
            DropTable("dbo.Data_Identity_UserClaim");
            DropTable("dbo.Data_Identity_User");
            DropTable("dbo.Data_Identity_UserRole");
            DropTable("dbo.Data_Identity_Role");
        }
    }
}
