using AutoMapper;
using BusinessLayer.Services.Contracts.Entities;
using Spectromart.Controllers.Entities.Contracts;

namespace Spectromart.Controllers.Authentication
{
    public class EntitiesMapperProfile : Profile
    {
        public EntitiesMapperProfile()
        {
            CreateMap<GetEntitiesContract, GetEntitiesServiceContract>().IgnoreAllPropertiesWithAnInaccessibleSetter().IgnoreAllSourcePropertiesWithAnInaccessibleSetter();
            CreateMap<AddEntityContract, AddEntityServiceContract>();
            CreateMap<DeleteEntityContract, DeleteEntityServiceContract>();
            CreateMap<AddParentContract, AddParentServiceContract>();
            CreateMap<RemoveParentContract, RemoveParentServiceContract>();
            CreateMap<UpdateEntityContract, UpdateEntityServiceContract>();
            CreateMap<BusinessLayer.Services.Contracts.Entities.GetEntityResult, Entities.Contracts.GetEntitiesResult>();
            CreateMap<BusinessLayer.Services.Contracts.Entities.GetEntityResult, Entities.Contracts.GetEntityResult>();
        }
    }
}
