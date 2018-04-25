using HCMS.Data.Identity;
using HCMS.Web.Areas.Manage.Helpers.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HCMS.Web.Areas.Manage.Helpers
{
    public static class UserAdminExportToExcellMapper
    {
        public static List<UserAdminExportToExcellDto> Map(List<ApplicationUser> model)
        {
            var userAdminExportToExcellDtoList = new List<UserAdminExportToExcellDto>();

            foreach (var item in model)
            {
                var userAdminExportToExcellDto = new UserAdminExportToExcellDto
                {
                    UserName = item.UserName,
                    Mobile = item.Mobile,
                    FullNam = item.FirstName,
                    RegisterDate = item.RegisterDate
                };

                userAdminExportToExcellDtoList.Add(userAdminExportToExcellDto);
            }

            return userAdminExportToExcellDtoList;
        }
    }
}