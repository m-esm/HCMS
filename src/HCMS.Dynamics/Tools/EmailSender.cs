using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Tools
{
    public static class EmailSender
    {
        public static void send(string to, string body, string subject, bool isHTML = true)
        {
            try
            {
                SmtpClient client = new SmtpClient();
                client.Port = int.Parse(ConfigurationSettings.AppSettings["Email-Port"]);
                client.Host = ConfigurationSettings.AppSettings["Email-Smtp"];
                client.EnableSsl = bool.Parse(ConfigurationSettings.AppSettings["Email-EnableSsl"]);
                client.Timeout = 3000;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new System.Net.NetworkCredential(ConfigurationSettings.AppSettings["Email-Address"], ConfigurationSettings.AppSettings["Email-Password"]);

                MailMessage mm = new MailMessage(ConfigurationSettings.AppSettings["Email-Address"], to, subject, body);
                mm.IsBodyHtml = isHTML;
                mm.BodyEncoding = UTF8Encoding.UTF8;
                mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

                client.Send(mm);
            }
            catch(Exception ex)
            {

            }


        }
    }
}
