using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HCMS.Business.Enum;

namespace HCMS.Business.DTO
{
    public class PersonalInformationDTO
    {
        [Required(ErrorMessage = "{0} را وارد کنید")]
        [Display(Name = "نام")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "{0} را وارد کنید")]
        [Display(Name = "نام خانوادگی")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "{0} را وارد کنید")]
        [Display(Name = "جنسیت")]
        public Enumerations.Gender Gender { get; set; }

        [Display(Name = "نام پدر")]
        public string FatherName { get; set; }

        [Display(Name = "شماره شناسنامه")]
        public string CertificateCode { get; set; }

      //  [Required(ErrorMessage = "{0} را وارد کنید")]
        [Display(Name = "کد ملی")]
        public string NationalCode { get; set; }

        //[Display(Name = "تاریخ تولد")]
        //public DateTime? BirthDate { get; set; }


        //[Required(ErrorMessage = "{0} را وارد کنید")]
        [Display(Name = "محل تولد")]
        public int? BirthPlace { get; set; }

      //  [Required(ErrorMessage = "{0} را وارد کنید")]
        [Display(Name = "شماره ثابت")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "{0} را وارد کنید")]
        [Display(Name = "شماره همراه")]
        public string Mobile { get; set; }

       // [Required(ErrorMessage = "{0} را وارد کنید")]
        [Display(Name = "آدرس")]
        public string Address { get; set; }

       // [Required(ErrorMessage = "{0} را وارد کنید")]
        [Display(Name = "کد پستی")]
        public string ZipCode { get; set; }

        [Display(Name = "میزان تحصیلات")]
        public string DegreeOfEducation { get; set; }

        [Display(Name = "رشته تحصیلی")]
        public string FieldOfStudy { get; set; }

     //   [Required(ErrorMessage = "{0} را وارد کنید")]
        [Display(Name = "سال")]
        public int Year { get; set; }

        [Display(Name = "ماه")]
     //   [Required(ErrorMessage = "{0} را وارد کنید")]
        public byte Month { get; set; }

        [Display(Name = "روز")]
      //  [Required(ErrorMessage = "{0} را وارد کنید")]
        public byte Day { get; set; }
    }
}
