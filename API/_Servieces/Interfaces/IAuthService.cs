using System.Threading.Tasks;
using API.Dtos;

namespace API._Servieces.Interfaces
{
    public interface IAuthService
    {
         Task<Users_Dto> Login(string account, string password);
    }
}