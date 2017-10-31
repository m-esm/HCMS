using HCMS.Dynamics.Stats.Models;
using HCMS.Dynamics.Tools;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HCMS.Web.Hubs
{

 
    public class DSystemHub : Hub
    {

        public override System.Threading.Tasks.Task OnConnected()
        {
            var ctx = GlobalHost.ConnectionManager.GetHubContext<DSystemHub>();
          
            ctx.Clients.All.consoleLog(Context.User.Identity.Name + " Joined !");
            return base.OnConnected();
        }
      
                public void Example()
        {
      
                    //   Clients.All.AddToLogList(Newtonsoft.Json.JsonConvert.SerializeObject(null));
        }
    }
}