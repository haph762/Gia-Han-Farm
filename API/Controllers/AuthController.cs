using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API._Servieces.Interfaces;
using API.Helpers.Params;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authservice;

        public AuthController(IConfiguration configuration, IAuthService authservice)
        {
            _configuration = configuration;
            _authservice = authservice;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login (UserForLoginParam userForLogin)
        {
            var userformservice = await _authservice.Login(userForLogin.Account, userForLogin.Password);
            if(userformservice == null)
                return Unauthorized();
                var claims = new []
                {
                    new Claim(ClaimTypes.NameIdentifier, userformservice.User_Account),
                    new Claim(ClaimTypes.Name, userformservice.User_Name)
                };
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds,
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok( new
            {
                token = tokenHandler.WriteToken(token),
                user = userformservice
            });
        }
    }
}