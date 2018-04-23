using HCMS.Notification.Model;
using HCMS.Notification.SmsDotIr;
using SmsIrRestful;
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

        public static UltraFastSendRespone SendWelcome(long phoneNumber, string fullName)
        {
           var userApiKey = ConfigurationManager.AppSettings["Hayat-No-UserApiKey"];
           var secretKey = ConfigurationManager.AppSettings["Hayat-No-SecretKey"];
           var lineNumber = ConfigurationManager.AppSettings["Hayat-No-LineNumber"];
           var templateId = ConfigurationManager.AppSettings["Hayat-No-template-welcome-id"];
            SmsSender smsSender = new SmsSender(userApiKey, secretKey, lineNumber);
            var model = new SmsDto();
            model.PhoneNumber = phoneNumber;
            model.Parametrs.Add("username", fullName);
            model.TemplateId = Convert.ToInt32(templateId);
            return smsSender.Send(model);
        }
    }
}