using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Helpers.Params;
using API.Helpers.Utilities;

namespace API._Servieces.Interfaces
{
    public interface IUsersService
    {
        Task<OperationResult> CreateUser (Users_Dto model);
        Task<bool> IsUserExists (string user_account);
        Task<PageListUtility<Users_Not_Password_Dto>> GetAll (PaginationParams param, string text);
        Task<Users_Dto> GetUser (string user_account);
        Task<OperationResult> UpdateUser (Users_Dto model);
        Task<OperationResult> DeleteUser (string user_account);
        Task<List<Role_User_Dto>> GetRoleUser (string user_account);
        Task<OperationResult> SaveRoles(List<Role_User_Dto> roles_user, string create_by);
    }
}