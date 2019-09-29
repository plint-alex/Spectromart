using AutoMapper;
using BusinessLayer.Services.Contracts.Authentication;
using Spectromart.Controllers.Authentication.Contracts;

namespace Spectromart.Controllers.Authentication
{
    public class AuthenticationMapperProfile : Profile
    {
        public AuthenticationMapperProfile()
        {
            CreateMap<LoginContract, LoginServiceContract>()
                .ForMember(x => x.RefreshToken, x => x.Ignore());
        }
    }
}
