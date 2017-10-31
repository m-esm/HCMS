using HCMS.Dynamics.DSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HCMS.Security.Infrastructer;
using System.IO;
using HCMS.Dynamics.DSystem;
using HCMS.Dynamics.Localization;
namespace HCMS.Web.Areas.Manage.Controllers
{
    [MyAuthorize("developer,admin,user")]
    public class ModulesController : ManageBaseController
    {
        // GET: Manage/Modules
        public ActionResult Index()
        {
            IEnumerable<Plugin> model = MvcApplication.Plugins.Concat(Plugable.GetModules(Server.MapPath("~/App_Data/Plugins"), false));
            return View(model);
        }

        [HttpPost]
        public ActionResult Index(FormCollection form)
        {
            var pluginsTempPath = Server.MapPath("~/App_Data/Plugins/");
            Directory.CreateDirectory(pluginsTempPath);
            if (Request.Files.Count == 1)
            {

                HttpPostedFileBase file = Request.Files[0];
                if (file.FileName.ToLower().EndsWith(".zip"))
                {
                    var filePath = Path.Combine(pluginsTempPath, file.FileName);
                    file.SaveAs(filePath);
                    var zipFile = new Ionic.Zip.ZipFile(filePath);
                    zipFile.ExtractAll(pluginsTempPath);
                    zipFile.Dispose();
                    System.IO.File.Delete(filePath);
                }
            }

            return RedirectToAction("index");
        }

        public ActionResult Uninstall(string FileName)
        {

            HttpRuntime.Close();
            HttpRuntime.UnloadAppDomain();



            var moduleFileInfo = new FileInfo(Server.MapPath("~/bin/") + FileName);

            Plugin plugin = Plugable.GetModuleInfo(moduleFileInfo, true);

            if (plugin != null)
            {
                string pluginName = plugin.FileName.Replace("HCMS.", "").Replace(".dll", "");
                var pluginDirInfo = new DirectoryInfo(Server.MapPath("~/App_Data/Plugins/") + pluginName);
                var assemsDirInfo = new DirectoryInfo(Path.Combine(pluginDirInfo.FullName, "Assemblies"));

                if (pluginDirInfo.Exists)
                    DeleteDirectory(pluginDirInfo.FullName);

                pluginDirInfo.Create();

                assemsDirInfo.Create();

                MoveFile(moduleFileInfo, Path.Combine(assemsDirInfo.FullName, moduleFileInfo.Name));
                var installedPluginDirInfo = new DirectoryInfo(Server.MapPath("~/Plugins/" + pluginName));

                if (installedPluginDirInfo.Exists)
                    foreach (var dir in installedPluginDirInfo.GetDirectories())
                        MoveDirectory(dir, Path.Combine(pluginDirInfo.FullName, dir.Name));

                if (installedPluginDirInfo.Exists)
                    foreach (var file in installedPluginDirInfo.GetFiles("*", SearchOption.TopDirectoryOnly))
                        MoveFile(file, Path.Combine(pluginDirInfo.FullName, file.Name));

                DeleteDirectory(installedPluginDirInfo.FullName);

            }


            return RedirectToAction("Index");
        }
        public ActionResult Install(string PluginName)
        {

            HttpRuntime.UnloadAppDomain();

            var pluginDirInfo = new DirectoryInfo(Server.MapPath("~/App_Data/Plugins/") + PluginName);
            var assemsDirInfo = new DirectoryInfo(Path.Combine(pluginDirInfo.FullName, "Assemblies"));
            if (assemsDirInfo.Exists)
            {
                var Assemblies = assemsDirInfo.GetFiles("*.dll");
                foreach (var assem in Assemblies)
                    System.IO.File.Move(assem.FullName, Server.MapPath("~/Bin/" + assem.Name));
            }

            var InstallDirInfo = new DirectoryInfo(Server.MapPath("~/Plugins/" + PluginName + "/"));
            if (InstallDirInfo.Exists == false)
                InstallDirInfo.Create();


            HttpRuntime.UnloadAppDomain();

            foreach (var dir in pluginDirInfo.GetDirectories().Where(p => p.Name != "Assemblies"))
            {
                var destDirectory = Path.Combine(InstallDirInfo.FullName, dir.Name);

                if (Directory.Exists(destDirectory))
                    DeleteDirectory(destDirectory);
                else
                    MoveDirectory(dir, destDirectory);

            }

            HttpRuntime.UnloadAppDomain();

            foreach (var file in pluginDirInfo.GetFiles("*", SearchOption.TopDirectoryOnly))
            {
                MoveFile(file, Server.MapPath("~/Plugins/" + PluginName + "/" + file.Name));
            }


            DeleteDirectory(pluginDirInfo.FullName);

            return RedirectToAction("Index");
        }

        public static void DeleteDirectory(string path)
        {
            foreach (string directory in Directory.GetDirectories(path))
            {
                DeleteDirectory(directory);
            }

            try
            {
                Directory.Delete(path, true);
            }
            catch (IOException)
            {
                Directory.Delete(path, true);
            }
            catch (UnauthorizedAccessException)
            {
                Directory.Delete(path, true);
            }
        }

        public void MoveFile(FileInfo file, string path)
        {
            try
            {
                file.MoveTo(path);
            }
            catch (IOException)
            {
                HttpRuntime.UnloadAppDomain();
                file.MoveTo(path);
            }
            catch (UnauthorizedAccessException)
            {
                file.MoveTo(path);
            }
        }
        public void MoveDirectory(DirectoryInfo dir, string path)
        {
            if (Directory.Exists(path))
                Directory.Delete(path);

            try
            {
                dir.MoveTo(path);
            }
            catch (IOException)
            {
                HttpRuntime.Close();
                HttpRuntime.UnloadAppDomain();
                dir.MoveTo(path);
            }
            catch (UnauthorizedAccessException)
            {
                dir.MoveTo(path);
            }
        }



    }
}