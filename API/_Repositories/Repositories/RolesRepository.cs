using API._Repositories.Interfaces;
using API.Data;
using API.Models;

namespace API._Repositories.Repositories
{
    public class RolesRepository : Repository<Roles>, IRolesRepository
    {
        public RolesRepository(GHFContext context) : base(context)
        {
        }
    }
}