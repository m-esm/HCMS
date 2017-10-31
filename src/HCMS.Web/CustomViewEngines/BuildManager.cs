using System;
using System.Web;
using System.Web.Compilation;

namespace HCMS.Web.CustomViewEngines
{
    public interface IBuildManager
    {
        bool FileExists(string virtualPath);

        Type GetCompiledType(string virtualPath);
    }

    public class BuildManagerWrapper : IBuildManager
    {
        public bool FileExists(string virtualPath)
        {
            try
            {
                return BuildManager.GetObjectFactory(virtualPath, false) != null;

            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public Type GetCompiledType(string virtualPath)
        {
            return BuildManager.GetCompiledType(virtualPath);
        }
    }
}