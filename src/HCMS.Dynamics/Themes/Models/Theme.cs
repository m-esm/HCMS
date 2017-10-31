using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace HCMS.Dynamics.Themes.Models
{
    public class Theme
    {
        /// <summary>
        /// Getting Information Of All Installed Themes
        /// </summary>
        /// <param name="ThemeDirectory">Full Address of ThemeDirectory Location | You can get it in mvc by Server.MapPath("~/Themes/") </param>
        /// <returns>List Of Theme Objects Filled with XML Values</returns>
        public IEnumerable<Theme> GetThemes(string ThemeDirectory)
        {
            List<Theme> Themes = new List<Theme>();
            var ThemeFolders = new DirectoryInfo(ThemeDirectory).GetDirectories();
            foreach (DirectoryInfo ThemeFolder in ThemeFolders)
            {
                var _theme = new Theme();
                _theme.FolderName = ThemeFolder.Name;
                FileInfo ThemeXML = new FileInfo(Path.Combine(ThemeFolder.FullName, "Theme.xml"));
                if (ThemeXML.Exists)
                {
                    XDocument XDtheme = XDocument.Load(ThemeXML.FullName);
                    _theme.Name = XDtheme.Root.Element("Name").Value;
                    _theme.developer = XDtheme.Root.Element("Developer").Value;
                    _theme.developerLink = XDtheme.Root.Element("DeveloperLink").Value;
                    _theme.ImageURL = "/Themes/" + ThemeFolder.Name + "/" + XDtheme.Root.Element("ImageURL").Value;
                    _theme.Version = XDtheme.Root.Element("Version").Value;
                    _theme.Description = XDtheme.Root.Element("Description").Value;
                }

                Themes.Add(_theme);
            }
            return Themes;
        }
        public string FolderName { get; set; }
        public string Name { get; set; }
        public string developer { get; set; }
        public string developerLink { get; set; }
        public string Version { get; set; }
        public string ImageURL { get; set; }
        public string Description { get; set; }

    }
}
