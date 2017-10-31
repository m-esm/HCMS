using Microsoft.Owin;
using Owin;
using HCMS.Dynamics;
using HCMS.Dynamics.DSystem.Models;
//using HCMS.OnlineChat.Hubs;
using Microsoft.Owin.Security.Cookies;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using System.Threading.Tasks;
using System.Web.Cors;

//using HCMS.OnlineChat.Hubs;
//using SignalRUserIdProvider = HCMS.Web.Plugins.OnlineChat.Hubs.SignalRUserIdProvider;

namespace HCMS.Web
{
    public class QueryStringOAuthBearerProvider : OAuthBearerAuthenticationProvider
    {
        public override Task RequestToken(OAuthRequestTokenContext context)
        {

            if(context.Request.Cookies["BearerToken"] != null)
            {
                context.Token = context.Request.Cookies["BearerToken"].ToString();
                return Task.FromResult<object>(null);

            }

            var value = context.Request.Query.Get("access_token");

            if (!string.IsNullOrEmpty(value))
            {
                context.Token = value;
            }

            return Task.FromResult<object>(null);
        }
    }
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            StartupOAuth.ConfigureAuth(app);

            // app.UseCors(CorsOptions.AllowAll);
            // app.MapSignalR();

            //Microsoft.AspNet.SignalR.GlobalHost.DependencyResolver
            //    .Register(typeof(Microsoft.AspNet.SignalR.IUserIdProvider), () => new SignalRUserIdProvider());

            // app.UseCors(CorsOptions.AllowAll);
            var policy = new CorsPolicy()
            {
                AllowAnyHeader = true,
                AllowAnyMethod = true,
                SupportsCredentials = true,
                AllowAnyOrigin = true,
            };

            // list of domains that are allowed can be added here
            //be sure to include the port:
            //example: "http://localhost:8081"

            app.UseCors(new CorsOptions
            {
                PolicyProvider = new CorsPolicyProvider
                {
                    PolicyResolver = context => Task.FromResult(policy)
                }
            });


            app.Map("/signalr", map =>
            {

                map.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions()
                {
                    Provider = new QueryStringOAuthBearerProvider()
                });

                var hubConfiguration = new HubConfiguration
                {
                    Resolver = GlobalHost.DependencyResolver,
                };

                hubConfiguration.EnableDetailedErrors = true;
                hubConfiguration.EnableJavaScriptProxies = true;
                hubConfiguration.EnableJSONP = true;
                map.RunSignalR(hubConfiguration);
            });


            //TODO: For Auhtorize Hubs
            //GlobalHost.HubPipeline.RequireAuthentication();
       
        }
    }
}
