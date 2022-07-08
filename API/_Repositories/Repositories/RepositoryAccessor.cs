using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API._Repositories.Interfaces;
using API.Data;

namespace API._Repositories.Repositories
{
    public class RepositoryAccessor : IRepositoryAccessor
    {
        private GHFContext _dbContext;

        public RepositoryAccessor(GHFContext dbContext)
        {
            _dbContext = dbContext;
            New = new NewsRepository(_dbContext);
            Product_Service_Category = new Product_Service_CategoryRepository(_dbContext);
            Product_Service = new Product_ServiceRepository(_dbContext);
            Roles = new RolesRepository(_dbContext);
            RoleUser = new RoleUserRepository(_dbContext);
            User = new UserRepository(_dbContext);
        }

        public INewsRepository New { get; private set; }

        public IProduct_Service_CategoryRepository Product_Service_Category { get; private set; }

        public IProduct_ServiceRepository Product_Service { get; private set; }

        public IRolesRepository Roles { get; private set; }

        public IRoleUserRepository RoleUser { get; private set; }

        public IUserRepository User { get; private set; }

        public async Task<bool> Save()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}