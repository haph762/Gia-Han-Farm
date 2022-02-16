#nullable disable
using API._Repositories.Interfaces;
using API._Servieces.Interfaces;
using API.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API._Servieces.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleUserRepository _roleUserRepository;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _mapperConfiguration;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, 
            IRoleUserRepository roleUserRepository, 
            IMapper mapper, 
            MapperConfiguration mapperConfiguration, 
            IConfiguration configuration)
        {
            _userRepository = userRepository;
            _roleUserRepository = roleUserRepository;
            _mapper = mapper;
            _mapperConfiguration = mapperConfiguration;
            _configuration = configuration;
        }

        public async Task<User_Logged_Dto> Login(string account, string password)
        {
            var user = await _userRepository.FindAll(x =>x.User_Account.Trim() == account.Trim() && x.Password == password)
                .ProjectTo<Users_Dto>(_mapperConfiguration)
                .FirstOrDefaultAsync();
            if(user == null)
                return null;
            var userRoles = await _roleUserRepository.FindAll(x =>x.user_account == account).Select(x =>x.role_unique).ToListAsync();
            var userToReturn = new User_Logged_Dto
            {
                User_Account = user.User_Account,
                User_Name = user.User_Name,
                Phone_Number = user.Phone_Number,
                Roles = userRoles,
                Image = user.Image,
            };
            return userToReturn;
        }
    }
}