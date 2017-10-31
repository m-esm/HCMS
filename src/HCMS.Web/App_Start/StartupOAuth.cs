using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using System;
using System.Configuration;
using System.Security.Claims;
using System.Threading.Tasks;
using HCMS.Data.Identity;
using Microsoft.Owin.Security.OAuth;
using HCMS.Web.Areas.Manage.Providers;
using HCMS.Web.Provider;

using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.Twitter;

namespace HCMS.Web
{
    public class StartupOAuth
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public static string PublicClientId { get; private set; }

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public static void ConfigureAuth(IAppBuilder app)
        {

            // Configure the db context and user manager to use a single instance per request
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

            //hadi
            app.CreatePerOwinContext<ApplicationRoleManager>(ApplicationRoleManager.Create);
            app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);

            // Enable the application to use a cookie to store information for the signed in user
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Configure the application for OAuth based flow
            PublicClientId = "self";
            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/Token"),
                Provider = new ApplicationOAuthProvider(PublicClientId),
                AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                // In production mode set AllowInsecureHttp = false
                AllowInsecureHttp = true
            };

            // Enable the application to use bearer tokens to authenticate users
            app.UseOAuthBearerTokens(OAuthOptions);




            var facebookAuthenticationOptions = new FacebookAuthenticationOptions()
            {

                AppId = ConfigurationManager.AppSettings["facebookId"],
                AppSecret = ConfigurationManager.AppSettings["facebookSecret"],
                Scope = { "email" },
                Provider = new FacebookAuthenticationProvider
                {
                    OnAuthenticated = cntx =>
                    {
                        cntx.Identity.AddClaim(new Claim("FacebookAccessToken", cntx.AccessToken));
                        return Task.FromResult(true);
                    }
                }


            };
            app.UseFacebookAuthentication(facebookAuthenticationOptions);



            app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions()
            {
                ClientId = ConfigurationManager.AppSettings["googleId"],
                ClientSecret = ConfigurationManager.AppSettings["googleSecret"]
            });

            //app.UseTwitterAuthentication(new TwitterAuthenticationOptions()
            //{
            //    ConsumerKey = ConfigurationManager.AppSettings["twitterId"],
            //    ConsumerSecret = ConfigurationManager.AppSettings["twitterSecret"],
            //    Provider = new TwitterAuthenticationProvider()
            //    {
            //        OnAuthenticated = (cntx) =>
            //        {
            //            cntx.Identity.AddClaim(new Claim("urn:twitter:access_token", cntx.AccessToken));
            //            cntx.Identity.AddClaim(new Claim("urn:twitter:access_secret", cntx.AccessTokenSecret));
            //            return Task.FromResult(0);
            //        }
            //    },
            //    BackchannelCertificateValidator = new Microsoft.Owin.Security.CertificateSubjectKeyIdentifierValidator(new[]
            //                       {
            //                          "A5EF0B11CEC04103A34A659048B21CE0572D7D47", // VeriSign Class 3 Secure Server CA - G2
            //                          "0D445C165344C1827E1D20AB25F40163D8BE79A5", // VeriSign Class 3 Secure Server CA - G3
            //                          "7FD365A7C2DDECBBF03009F34339FA02AF333133", // VeriSign Class 3 Public Primary Certification Authority - G5
            //                          "39A55D933676616E73A761DFA16A7E59CDE66FAD", // Symantec Class 3 Secure Server CA - G4
            //                          "‎add53f6680fe66e383cbac3e60922e3b4c412bed", // Symantec Class 3 EV SSL CA - G3
            //                          "4eb6d578499b1ccf5f581ead56be3d9b6744a5e5", // VeriSign Class 3 Primary CA - G5
            //                          "5168FF90AF0207753CCCD9656462A212B859723B", // DigiCert SHA2 High Assurance Server C‎A 
            //                          "B13EC36903F8BF4701D498261A0802EF63642BC3" // DigiCert High Assurance EV Root CA
            //                        })
            //});
        }
    }
}