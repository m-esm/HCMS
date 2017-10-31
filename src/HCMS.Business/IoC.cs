using HCMS.Data;
using StructureMap;
using StructureMap.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Business
{
    public static class IoC
    {
        public static IContainer Initialize()
        {
            return new Container(p =>
            {
                p.For<IDB>().Use<DB>();
            });
        }
    }
}
