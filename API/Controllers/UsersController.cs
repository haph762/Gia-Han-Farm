#nullable disable
using System.Security.Claims;
using System.Threading.Tasks;
using API._Repositories.Interfaces;
using API._Servieces.Interfaces;
using API.Dtos;
using API.Helpers.Params;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : ApiController
    {
        private readonly IUsersService _usersService;
        private readonly IFileService _fileService;
        private readonly IRepositoryAccessor _repository;
        private readonly IMapper _mapper;

        public UsersController(IUsersService usersService, IFileService fileService, IRepositoryAccessor repository, IMapper mapper)
        {
            _usersService = usersService;
            _fileService = fileService;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromForm] Users_Dto model)
        {
            if (model.File != null)
                model.Image = await _fileService.UploadFile(model.File, model.User_Account.Trim() + "_", @"\uploaded\images\user");
            model.Update_By = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            model.Update_Time = DateTime.Now;
            model.Last_Login = DateTime.Now;
            model.Valid_From = DateTime.Today;
            model.Valid_To = new DateTime(9999, 12, 31);
            var result = await _usersService.CreateUser(model);
            return Ok(result);

        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll([FromQuery] PaginationParams param, string text)
        {
            var result = await _usersService.GetAll(param, text);
            return Ok(result);
        }

        [HttpGet("getuser")]
        public async Task<IActionResult> GetUser([FromQuery] string user_account)
        {
            var result = await _usersService.GetUser(user_account);
            if (result == null)
                return NotFound("User not found!");
            return Ok(result);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromForm] Users_Dto model)
        {
            if (model.File != null)
            {
                var image = await _repository.User.FindAll(x => x.User_Account == model.User_Account)
                    .Select(x => x.Image)
                    .FirstOrDefaultAsync();
                if (!string.IsNullOrEmpty(image))
                {
                    _fileService.DeleteFileUpload(image, @"\uploaded\images\user");
                }
                model.Image = await _fileService.UploadFile(model.File, model.User_Account.Trim() + "_", @"\uploaded\images\user");
            }
            model.Update_By = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var result = await _usersService.UpdateUser(model);
            return Ok(result);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Remove(string user_account)
        {
            var image = await _repository.User.FindAll(x => x.User_Account == user_account)
                    .Select(x => x.Image)
                    .FirstOrDefaultAsync();
            if (!string.IsNullOrEmpty(image))
            {
                _fileService.DeleteFileUpload(image, @"\uploaded\images\user");
            }
            var result = await _usersService.DeleteUser(user_account);
            return Ok(result);
        }

        [HttpGet("getroles")]
        public async Task<IActionResult> GetRolesUser([FromQuery] string user_account)
        {
            var result = await _usersService.GetRoleUser(user_account);
            return Ok(result);
        }

        [HttpPut("updateroles")]
        public async Task<IActionResult> UpdateRoles(List<Role_User_Dto> rolesUser)
        {
            var create_by = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var result = await _usersService.SaveRoles(rolesUser, create_by);
            return Ok(result);

        }
    }
}