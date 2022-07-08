using API.Helpers.AutoMapper;
using AutoMapper;

namespace API.Configurations
{
    public static class AutoMapper
    {
        public static void AddAutoMapperUtilities(this IServiceCollection service)
        {
            service.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            service.AddScoped<IMapper>(sp => new Mapper(AutoMapperConfig.RegisterMappings()));
            service.AddSingleton(AutoMapperConfig.RegisterMappings());
        }
    }
}