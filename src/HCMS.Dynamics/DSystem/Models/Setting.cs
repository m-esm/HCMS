using HCMS.Dynamics.Forms;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.DSystem.Models
{
    public class SettingMap : EntityTypeConfiguration<Setting>
    {
        public SettingMap()
        {
            this.HasKey(p => p.Id);
            Property(a => a.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.ToTable("Dynamics_System_Settings");
        }
    }
    public class Setting
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Caption { get; set; }

        public int? MaduleID { get; set; }
        public string Details { get; set; }
        public string Value { get; set; }
        public InputTypes InputType { get; set; }
        public string IconURL { get; set; }
        public string LastUserGUID { get; set; }
        public DateTime ChangeDate { get; set; }
        public SettingCategories Category { get; set; }
        public string EditLink { get; set; }

    }

    public enum SettingCategories
    {
        General = 100,
        Security = 200,
        Email = 300,
        Sms = 400
    }
}
