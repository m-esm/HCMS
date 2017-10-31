using System;
using System.ComponentModel.DataAnnotations;

namespace HCMS.Web.Areas.Manage.Models

{
    public class CompleteProfileDTO
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string CertificateCode { get; set; }
        public string NationalCode { get; set; }
        public DateTime BirthDate { get; set; }
        public int BirthPlace { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Address { get; set; }
        public string ZipCode { get; set; }
        public string DegreeOfEducation { get; set; }
        public string FieldOfStudy { get; set; }

        public string ImageUrl { get; set; }

    }
}