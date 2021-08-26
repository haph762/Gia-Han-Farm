using System.Threading.Tasks;
using API.Dtos;

namespace API._Servieces.Interfaces
{
    public interface IAuthService
    {
         Task<User_Logged_Dto> Login(string account, string password);
    }
}