using HCMS.Business;
using HCMS.Dynamics.DSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics
{
    public class Settings
    {
        public static string Get(int ID)
        {
            GenericRepository<Setting> SettingsDB = new GenericRepository<Setting>();
            return SettingsDB.Find(ID).Value;
        }

        public static string Get(string Name)
        {
            GenericRepository<Setting> SettingsDB = new GenericRepository<Setting>();
            Setting model = SettingsDB.Get(p => p.Name.ToLower() == Name.ToLower());
            if (model == null)
            {
                return Name;
            }
            else
            {
                return model.Value;
            }
        }

        public static Setting Create(Setting model)
        {
            GenericRepository<Setting> SettingsDB = new GenericRepository<Setting>();
            var result = SettingsDB.Add(model);
            return result;
        }

        public static void Set(string Name, string Value,Guid UserID)
       {
           GenericRepository<Setting> SettingsDB = new GenericRepository<Setting>();
           Setting model = SettingsDB.Get(p => p.Name.ToLower() == Name.ToLower());
           if (model != null)
           {
               model.Value = Value;
               SettingsDB.Update(model, model.Id);
           }
           else
           {
               SettingsDB.Add(new Setting()
               {
                   Name = Name,
                   Caption = Name,
                   ChangeDate = DateTime.Now,
                   Details = "",
                   IconURL = "",
                   InputType = 0,
                   LastUserGUID = UserID.ToString(),
                   Value = Value,
                   MaduleID = 0
               });
           }
     
       }

    }
}
