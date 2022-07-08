#nullable disable
using API._Repositories.Interfaces;
using API._Servieces.Interfaces;
using API.Dtos;
using API.Helpers.Params;
using API.Helpers.Utilities;
using API.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API._Servieces.Services
{
    public class UsersService : IUsersService
    {
        private readonly IRepositoryAccessor _repository;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _mapperConfiguration;
        private readonly IConfiguration _configuration;
        private OperationResult operationResult;

        public UsersService(IRepositoryAccessor repository, IMapper mapper, MapperConfiguration mapperConfiguration, IConfiguration configuration)
        {
            _repository = repository;
            _mapper = mapper;
            _mapperConfiguration = mapperConfiguration;
            _configuration = configuration;
        }

        public async Task<OperationResult> CreateUser(Users_Dto model)
        {
            if (await IsUserExists(model.User_Account))
            {
                operationResult = new OperationResult { Success = false, Message = "User account has exists!" };
                return operationResult;
            }

            var user = _mapper.Map<Users>(model);
            try
            {
                _repository.User.Add(user);
                await _repository.User.Save();
                operationResult = new OperationResult { Success = true, Message = "User was successfully added" };
            }
            catch (System.Exception)
            {
                operationResult = new OperationResult { Success = false, Message = "failed on save!" };
            }
            return operationResult;
        }

        public async Task<OperationResult> DeleteUser(string user_account)
        {
            if (!await IsUserExists(user_account))
            {
                operationResult = new OperationResult { Success = false, Message = "User account not exists!" };
                return operationResult;
            }
            //remove user's roles
            var rolesuser = _repository.RoleUser.FindAll(x => x.user_account.Trim() == user_account.Trim()).ToList();
            if (rolesuser.Count > 0)
            {
                _repository.RoleUser.RemoveMultiple(rolesuser);
            }
            try
            {
                await _repository.RoleUser.Save();
            }
            catch (System.Exception)
            {
                operationResult = new OperationResult { Success = false, Message = "Cannot delete user's role!" };
            }
            //remove user
            var user = await _repository.User.FindSingle(z => z.User_Account.Trim() == user_account.Trim());
            _repository.User.Remove(user);
            try
            {
                await _repository.User.Save();
                operationResult = new OperationResult { Success = true, Message = "User deleted successfuly" };
            }
            catch (System.Exception)
            {
                operationResult = new OperationResult { Success = false, Message = "Cannot delete user!" };
            }
            return operationResult;
        }

        public async Task<PageListUtility<Users_Not_Password_Dto>> GetAll(PaginationParams param, string text)
        {
            if (text == null)
            {
                var query = _repository.User.FindAll()
                .OrderByDescending(x => x.Update_Time)
                .ProjectTo<Users_Not_Password_Dto>(_mapperConfiguration);
                return await PageListUtility<Users_Not_Password_Dto>.PageListAsync(query, param.PageNumber, param.PageSize);
            }
            else
            {
                var query = _repository.User.FindAll(x => x.User_Account.ToLower().Contains(text) ||
                    x.User_Name.ToLower().Contains(text) ||
                    x.Phone_Number.ToLower().Contains(text) ||
                    x.Email.ToLower().Contains(text))
                    .OrderByDescending(x => x.Update_Time)
                    .ProjectTo<Users_Not_Password_Dto>(_mapperConfiguration);
                return await PageListUtility<Users_Not_Password_Dto>.PageListAsync(query, param.PageNumber, param.PageSize);
            }

        }

        public async Task<List<Role_User_Dto>> GetRoleUser(string user_account)
        {
            var roles = _repository.Roles.FindAll();
            var rolesUser = _repository.RoleUser.FindAll(x => x.user_account == user_account);
            var data = await roles.Select(x => new Role_User_Dto
            {
                User_Account = user_account,
                Role_Unique = x.role_unique,
                Role_Name = x.role_name,
                Role_Type = x.role_type,
                Role_Sequence = x.role_sequence,
                Status = rolesUser == null ? false : rolesUser
                    .Where(z => z.user_account == user_account && z.role_unique == x.role_unique)
                    .Count() != 0 ? true : false,
            }).OrderBy(x => x.Role_Sequence).ToListAsync();
            return data;
        }

        public async Task<Users_Dto> GetUser(string user_account)
        {
            var user = await _repository.User.FindSingle(x => x.User_Account.Trim() == user_account.Trim());
            var data = _mapper.Map<Users_Dto>(user);
            return data;
        }

        public async Task<bool> IsUserExists(string user_account)
        {
            var model = await _repository.User.FindSingle(x => x.User_Account == user_account.Trim());
            if (model == null)
            { return false; }
            else
            {
                return true;
            }
        }

        public async Task<OperationResult> SaveRoles(List<Role_User_Dto> roles_user, string create_by)
        {
            var user_Account = roles_user[0].User_Account;
            if (!await IsUserExists(user_Account))
            {
                operationResult = new OperationResult { Success = false, Message = "Roles not found! " };
                return operationResult;
            }

            //remove current roles
            var currnetRoles = _repository.RoleUser.FindAll(x => x.user_account == user_Account).ToList();
            _repository.RoleUser.RemoveMultiple(currnetRoles);

            //filter active roles
            roles_user = roles_user.FindAll(x => x.Status == true);

            //create Roles
            var userRolesnew = roles_user.Select(x => new RoleUser
            {
                user_account = x.User_Account,
                role_unique = x.Role_Unique,
                create_by = create_by,
                create_time = DateTime.Now,
            }).ToList();

            //save Roles
            _repository.RoleUser.AddMutiple(userRolesnew);
            try
            {
                await _repository.RoleUser.Save();
                operationResult = new OperationResult { Success = true, Message = "Updated User's roles successfuly" };
            }
            catch (System.Exception)
            {
                operationResult = new OperationResult { Success = false, Message = "Updating failed on save!" };
            }

            //update datetime, update_by for User
            var userCurrent = await _repository.User.FindSingle(x => x.User_Account == user_Account);
            userCurrent.Update_By = create_by;
            userCurrent.Update_Time = DateTime.Now;
            _repository.User.Update(userCurrent);
            try
            {
                await _repository.User.Save();
                operationResult = new OperationResult { Success = true, Message = "Updated User successfuly" };
            }
            catch (System.Exception)
            {
                operationResult = new OperationResult { Success = false, Message = "Updating User faild on save!" };
            }
            return operationResult;
        }

        public async Task<OperationResult> UpdateUser(Users_Dto model)
        {
            var userExists = _repository.User.FindAll(x => x.User_Account.Trim() == model.User_Account.Trim()).FirstOrDefault();
            if (userExists == null)
            {
                operationResult = new OperationResult { Success = false, Message = "User account not exists!" };
                return operationResult;
            }
            userExists.User_Name = model.User_Name;
            userExists.Email = model.Email;
            userExists.Image = model.Image;
            userExists.Phone_Number = model.Phone_Number;
            userExists.Update_Time = DateTime.Now;
            userExists.Update_By = model.Update_By;
            if (!string.IsNullOrEmpty(model.Password))
            {
                userExists.Password = model.Password;
            }
            _repository.User.Update(userExists);
            try
            {
                await _repository.User.Save();
                operationResult = new OperationResult { Success = true, Message = "Updated successfully" };
            }
            catch (System.Exception)
            {
                operationResult = new OperationResult { Success = false, Message = "Updated faild on save!" };
            }
            return operationResult;
        }
    }
}