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
        }
    }
}