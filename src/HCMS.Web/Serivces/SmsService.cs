using HCMS.Notification.Model;
using HCMS.Notification.SmsDotIr;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Web;

namespace HCMS.Web.Serivces
{
    public static class SmsService
    {
        public static bool Send(string recipient, string body)
        {
            try
            {


                var serviceUrl = @"http://37.228.138.118/post/sendsms.ashx?username=09109310265&password=5428&to=#to#&from=5000127004276&text=#text#";

                serviceUrl = serviceUrl.Replace("#text#", body).Replace("#to#", recipient);

                var wc = new WebClient();
               
                wc.DownloadString(serviceUrl);

                return true;

            }
            catch
            {
                return false;
            }
        }

        public static bool SendWelcome(long phoneNumber, string fullName)
        {
           var userApiKey = System.Configuration.ConfigurationManager.AppSettings["UserApiKey"];
           var secretKey = System.Configuration.ConfigurationManager.AppSettings["SecretKey"];
           var lineNumber = System.Configuration.ConfigurationManager.AppSettings["LineNumber"];
            SmsSender smsSender = new SmsSender(userApiKey, secretKey, lineNumber);
            var model = new Notification.Model.SmsDto();
            model.PhoneNumber = phoneNumber;
            model.Parametrs.Add("username", fullName);
            model.TemplateId = 1829;
            return smsSender.Send(model);
        }
    }
}