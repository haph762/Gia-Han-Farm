using API._Repositories.Interfaces;
using API.Data;
using API.Models;

namespace API._Repositories.Repositories
{
    public class UserRepository : Repository<Users>, IUserRepository
    {
        public UserRepository(ProjectContext context) : base(context)
        {
        }
    }
}