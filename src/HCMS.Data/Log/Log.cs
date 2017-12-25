using EntityFramework.Audit;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Data.Log
{
    public static class Log
    {
        public static void Logger(AuditLogger auditLogger, LogType logType)
        {
            List<object> property = null;

            if (auditLogger.LastLog.Entities[0].Action == AuditAction.Modified)
            {
                foreach (var main in auditLogger.LastLog.Entities)
                {
                    property = new List<object>();
                    foreach (var item in auditLogger.LastLog.Entities[0].Properties)
                    {
                        if (item.Original != null && item.Current != null)
                        {
                            if (!item.Original.Equals(item.Current))
                            {
                                property.Add(item);
                            }
                        }
                        else if ((item.Original != null && item.Current == null) || (item.Original == null && item.Current != null))
                        {
                            property.Add(item);
                        }
                    }
                    WriteToFile(property, auditLogger, logType);
                }
            }
            else
            {
                foreach (var main in auditLogger.LastLog.Entities)
                {
                    property = new List<object>();
                    foreach (var item in auditLogger.LastLog.Entities[0].Properties)
                    {
                        property.Add(item);
                    }
                    WriteToFile(property, auditLogger, logType);
                }
            }
        }

        static void WriteToFile(List<object> property, AuditLogger _auditLogger, LogType logType)
        {
            var result = Environment.NewLine + ",{" + Environment.NewLine;// "********************" + DateTime.Now.ToShortTimeString() + "********************" + Environment.NewLine;
            result += "\"UserName\" : " + "\"" + _auditLogger.LastLog.Username + "\"," + Environment.NewLine;
            result += "\"ActionType\" : " + "\"" + _auditLogger.LastLog.Entities[0].Action + "\"," + Environment.NewLine;
            result += "\"type\" : " + "\"" + _auditLogger.LastLog.Entities[0].Type + "\"," + Environment.NewLine;
            result += "\"Keys\" : " + Environment.NewLine + "{" + Environment.NewLine;
            foreach (var item in _auditLogger.LastLog.Entities[0].Keys)
            {
                result += "\t" + JsonConvert.SerializeObject(item) + "," + Environment.NewLine;
            }
            result = result.Remove(result.Length - 3, 3) + Environment.NewLine;

            result += "}" + Environment.NewLine + "\"Properties\" : " + Environment.NewLine + "{" + Environment.NewLine;
            foreach (var item in property)
            {
                result += "\t" + JsonConvert.SerializeObject(item) + "," + Environment.NewLine;

            }
            result = result.Remove(result.Length - 3, 3) + Environment.NewLine;
            result += Environment.NewLine + "}" + Environment.NewLine + "}";

            string pathFolder = "";
            string date = DateTime.Now.ToShortDateString();
            if(logType == LogType.Identity)
            {
                pathFolder = System.AppDomain.CurrentDomain.BaseDirectory + "Log//IdentityLog//Log_Month_" +
                                date.Substring(5, 2);
            }
            else
            {
                pathFolder = System.AppDomain.CurrentDomain.BaseDirectory + "Log//DbLog//Log_Month_" +
                              date.Substring(5, 2);
            }
            
            try
            {
                if (!Directory.Exists(pathFolder))
                    System.IO.Directory.CreateDirectory(pathFolder);
                var path = pathFolder + "//" + date.Replace('/', '_') + ".json";

                File.AppendAllText(path, result);
            }
            catch (Exception ex)
            {
                ExceptionLog(ex);
            }

        }
        public static void ExceptionLog(Exception ex)
        {
            string date = DateTime.Now.ToShortDateString();
            var log = "{" + Environment.NewLine + "\"Error\" : " + "\"" + ex.Message + "\"," + Environment.NewLine;
            if (ex.InnerException != null)
            {
                while (ex.InnerException != null)
                {
                    log = ex.InnerException.Message;
                }
            }
            log += "\"Source\" : " + "\"" + ex.Source + "\"" + Environment.NewLine + "}" + Environment.NewLine;

            string pathFolder = System.AppDomain.CurrentDomain.BaseDirectory + "Log//Exceptionlog//Log_Month_" +
                               date.Substring(5, 2);
            try
            {
                if (!Directory.Exists(pathFolder))
                    System.IO.Directory.CreateDirectory(pathFolder);
                var path = pathFolder + "//" + date.Replace('/', '_') + ".json";

                File.AppendAllText(path, log);
            }
            catch (Exception ex2)
            {
                ExceptionLog(ex2);
            }
        }

        public enum LogType
        {
            Identity,
            Db
        }
    }
}
