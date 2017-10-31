using ElFinder;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HCMS.Dynamics.Localization;
using HCMS.Business.Auth;
using HCMS.Security.Infrastructer;
namespace HCMS.Web.Areas.Manage.Controllers
{
    [MyAuthorize]

    public class ElFinderController : Controller
    {

        private Connector connector;

        public string userId
        {
            get
            {
                return UserRepository.GetUserIdByUsername(User.Identity.Name);
            }
        }


        // GET: Manage/ElFinder
        public virtual ActionResult Index(string subFolder, string folder = "Uploads")
        {
            string rootFolder = "~/Files/" + folder;

            if (!User.IsInRole("admin") && !User.IsInRole("developer"))
                rootFolder = "~/Files/" + userId + "/" + folder;

            string rootFolderPath = Server.MapPath(rootFolder);
            if (Directory.Exists(rootFolderPath) == false)
                Directory.CreateDirectory(rootFolderPath);


            FileSystemDriver driver = new FileSystemDriver();
            DirectoryInfo thumbsStorage = new DirectoryInfo(Server.MapPath(rootFolder));



            var root = new Root(
                    new DirectoryInfo(Server.MapPath(rootFolder)),
                    "http://" + Request.Url.Authority + rootFolder.Replace("~", ""))
            {
                IsReadOnly = false,
                Alias = "Files",
                MaxUploadSizeInMb = 10,
                ThumbnailsStorage = thumbsStorage,
                ThumbnailsUrl = "/Manage/elfinder/Thumbs?tmb="
            };


            if (!string.IsNullOrEmpty(subFolder))
                root.StartPath = new DirectoryInfo(Server.MapPath(rootFolder + "/" + subFolder));

            driver.AddRoot(root);

            connector = new Connector(driver);

            return connector.Process(this.HttpContext.Request);
        }

        public ActionResult Thumbs(string tmb, string folder = "Uploads")
        {

            string rootFolder = "~/Files/" + userId + "/" + folder;
            string rootFolderPath = Server.MapPath(rootFolder);


            FileSystemDriver driver = new FileSystemDriver();
            DirectoryInfo thumbsStorage = new DirectoryInfo(rootFolderPath);
            var root = new Root(
                    new DirectoryInfo(rootFolderPath),
                    "http://" + Request.Url.Authority + rootFolder.Replace("~", ""))
            {
                IsReadOnly = false,
                Alias = "Files",
                MaxUploadSizeInMb = 10,
                ThumbnailsStorage = thumbsStorage,
                ThumbnailsUrl = "/Manage/elfinder/Thumbs?tmb="
            };

            driver.AddRoot(root);

            connector = new Connector(driver);

            return connector.GetThumbnail(Request, Response, tmb);
        }

        public virtual ActionResult SelectFile(string target)
        {
            return Json(connector.GetFileByHash(target).FullName);
        }

    }
}