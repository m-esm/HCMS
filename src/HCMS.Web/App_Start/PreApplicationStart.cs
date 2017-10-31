
using HCMS.Security.AttackManager;
using HCMS.Web;
using Microsoft.Web.Infrastructure.DynamicModuleHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(PreApplicationStart), "Start")]
namespace HCMS.Web
{
    public class PreApplicationStart
    {
        public static void Start()
        {
            //DynamicModuleUtility.RegisterModule(typeof(DosAttackModule));
        }
    }
}