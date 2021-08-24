using System.Threading.Tasks;
using API._Repositories.Interfaces;
using API._Servieces.Interfaces;
using API.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace API._Servieces.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _mapperConfiguration;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, 
            IMapper mapper, 
            MapperConfiguration mapperConfiguration, 
            IConfiguration configuration)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _mapperConfiguration = mapperConfiguration;
            _configuration = configuration;
        }

        public async Task<Users_Dto> Login(string account, string password)
        {
            var user = await _userRepository.FindAll(x =>x.User_Account.Trim() == account.Trim() && x.Password == password)
                .ProjectTo<Users_Dto>(_mapperConfiguration)
                .FirstOrDefaultAsync();
            if(user == null)
                return null;
            var userToReturn = new Users_Dto
            {
                User_Account = user.User_Account,
                User_Name = user.User_Name,
            };
            return userToReturn;
        }
    }
}