﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Owin.Security.Twitter;

namespace HCMS.Web.Provider
{
    public class LinqToTwitterAuthenticationProvider : TwitterAuthenticationProvider
    {
        public const string AccessToken = "TwitterAccessToken";
        public const string AccessTokenSecret = "TwitterAccessTokenSecret";

        public override Task Authenticated(TwitterAuthenticatedContext context)
        {
            context.Identity.AddClaims(
                new List<Claim>
            {
                new Claim(AccessToken, context.AccessToken),
                new Claim(AccessTokenSecret, context.AccessTokenSecret)
            });

            return base.Authenticated(context);
        }
    }
}