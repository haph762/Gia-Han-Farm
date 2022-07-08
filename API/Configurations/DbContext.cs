using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Configurations
{
    public static class DbContext
    {
        public static void AddDbContextUtilities(this IServiceCollection service, IConfiguration config)
        {
            service.AddDbContext<GHFContext>(o => o.UseSqlServer(config.GetConnectionString("DefaultConnection")));

        }
    }
}