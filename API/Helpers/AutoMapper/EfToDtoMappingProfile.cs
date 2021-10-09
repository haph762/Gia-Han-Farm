using API.Dtos;
using API.Models;
using AutoMapper;

namespace API.Helpers.AutoMapper
{
    public class EfToDtoMappingProfile : Profile
    {
        public EfToDtoMappingProfile()
        {
            CreateMap<Users, Users_Dto>();
            CreateMap<Users, Users_Not_Password_Dto>();
            CreateMap<News, News_Dto>();
            CreateMap<Product_Service, Product_Service_Dto>();
            CreateMap<Product_Service_Category, Product_Service_Category_Dto>();
        }
    }
}