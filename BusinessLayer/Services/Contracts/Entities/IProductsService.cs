using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Contracts.Entities
{
    public interface IEntitiesService
    {
        Task<Guid> AddEntity(AddEntityServiceContract contract);
        Task UpdateEntity(UpdateEntityServiceContract contract);
        Task<GetEntityResult> GetEntity(Guid entityId);
        Task<List<GetEntityResult>> GetEntities(GetEntitiesServiceContract contract);
        Task DeleteEntity(DeleteEntityServiceContract contract);

        Task AddParent(AddParentServiceContract contract);
        Task RemoveParent(RemoveParentServiceContract contract);
    }
}
