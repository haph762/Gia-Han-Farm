using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API._Repositories.Interfaces
{
    public interface IRepositoryAccessor
    {
        INewsRepository New { get; }
        IProduct_Service_CategoryRepository Product_Service_Category { get; }
        IProduct_ServiceRepository Product_Service { get; }
        IRolesRepository Roles { get; }
        IRoleUserRepository RoleUser { get; }
        IUserRepository User { get; }
        //
        Task<bool> Save();
    }
}