using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.Contracts
{
    public interface IEntityService
    {
        Task<Entity> GetEntity(Guid entityId);
        Task<List<Entity>> GetEntities(Func<IQueryable<Entity>, IQueryable<Entity>> filter);

        Task AddEntity(Entity entity);
        Task AddRelation(EntityRelation entityRelation);
        Task UpdateEntity(Entity entity);
        Task DeleteEntity(Guid entityId);
        Task DeleteRelation(Guid entityId, Guid entityParentId);
    }
}
