using HCMS.Business;
using HCMS.Dynamics.Tools;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;


namespace HCMS.Web.Serivces
{
    public static class EmailService
    {
        public static string MailTemplate(string name)
        {
            GenericRepository<MailTemplate> mailTemplateRepo = new GenericRepository<MailTemplate>();
            var model = mailTemplateRepo.Get(p => p.Name.ToLower().Trim() == name.ToLower().Trim());
            if (model == null)
            {
                return name + " - Template not found , Please contact support team .";
            }
            else
            {
                if (string.IsNullOrWhiteSpace(model.Template))
                {
                    return name + " - Template is empty .";
                }
                else
                {
                    return model.Template;
                }
            }
        }
        public static bool Send(string recipient, string subject, string body)
        {
            try
            {

                var emailAddress = ConfigurationManager.AppSettings["Email-Address"];
                var emailPassword = ConfigurationManager.AppSettings["Email-Password"];
                var emailPort = Convert.ToInt32(ConfigurationManager.AppSettings["Email-Port"]);
                var emailSmtp = ConfigurationManager.AppSettings["Email-Smtp"];
                var emailEnableSsl = ConfigurationManager.AppSettings["Email-EnableSsl"];

                MailMessage mail = new MailMessage();
                mail.Body = body;
                mail.To.Add(new MailAddress(recipient));
                mail.BodyEncoding = Encoding.UTF8;
                mail.Subject = subject;
                //mail.From = new MailAddress(emailAddress);
                //
                mail.From = new MailAddress(emailAddress);

                mail.IsBodyHtml = true;
                int port = 25;
                if (emailPort > 0)
                    port = emailPort;
                SmtpClient smtp = new SmtpClient(emailSmtp, port);

                smtp.UseDefaultCredentials = false;
                smtp.Host = emailSmtp;
                smtp.Credentials = new NetworkCredential(emailAddress, emailPassword);

                if (emailEnableSsl == "1")
                {
                    smtp.EnableSsl = true;
                }

                smtp.Send(mail);
                return true;
            }
            catch (Exception ex)
            {
                //throw new Exception(ex.Message);
                return false;
            }
        }


    }
}