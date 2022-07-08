using API._Repositories.Interfaces;
using API._Repositories.Repositories;
using API._Servieces.Interfaces;
using API._Servieces.Services;

namespace API.Configurations
{
    public static class Dependency
    {
        public static void AddDependencyUtilities(this IServiceCollection services)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));
            // Add Scoped
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRolesRepository, RolesRepository>();
            services.AddScoped<IRoleUserRepository, RoleUserRepository>();
            services.AddScoped<INewsRepository, NewsRepository>();
            services.AddScoped<IProduct_Service_CategoryRepository, Product_Service_CategoryRepository>();
            services.AddScoped<IProduct_ServiceRepository, Product_ServiceRepository>();
            //Add service
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUsersService, UsersService>();
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<INewsService, NewsService>();
            services.AddScoped<IProduct_Service_CategoryService, Product_Service_CategoryService>();
        }
    }
}