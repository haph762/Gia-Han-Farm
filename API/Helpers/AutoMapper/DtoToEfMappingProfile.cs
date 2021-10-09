using API.Dtos;
using API.Models;
using AutoMapper;

namespace API.Helpers.AutoMapper
{
    public class DtoToEfMappingProfile : Profile
    {
        public DtoToEfMappingProfile()
        {
            CreateMap<Users_Dto, Users>();
            CreateMap<Users_Not_Password_Dto, Users>();
            CreateMap<News_Dto, News>();
            CreateMap<Product_Service_Dto, Product_Service>();
            CreateMap<Product_Service_Category_Dto, Product_Service_Category>();
        }
    }
}