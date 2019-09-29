using BusinessLayer.Services.Contracts.Entities;
using DataAccess.Contracts;
using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer.Services
{
    public class EntitiesService : IEntitiesService
    {
        private readonly IEntityService _entityService;

        public EntitiesService(IEntityService entityService)
        {
            _entityService = entityService;
        }

        public async Task<Guid> AddEntity(AddEntityServiceContract contract)
        {
            var entity = new Entity
            {
                Id = Guid.NewGuid(),
                CreationTime = DateTime.UtcNow,
                Name = contract.Name,
                Description = contract.Description,
                Code = contract.Code,
                Hiddenn = contract.Hidden,
                Order = contract.Order,
            };

            if (contract.ParentIds != null && contract.ParentIds.Any())
            {
                entity.Parents = new List<EntityRelation>();
                foreach (var parentId in contract.ParentIds)
                {
                    entity.Parents.Add(new EntityRelation { Id = Guid.NewGuid(), EntityId = entity.Id, EntityParentId = parentId });
                }
            }

            await _entityService.AddEntity(entity);

            return entity.Id;
        }

        public async Task UpdateEntity(UpdateEntityServiceContract contract)
        {
            await _entityService.UpdateEntity(new Entity
            {
                Id = contract.Id,
                Name = contract.Name,
                Description = contract.Description,
                Code = contract.Code,
                Hiddenn = contract.Hidden,
                Order = contract.Order,
            });
        }

        public async Task<GetEntityResult> GetEntity(Guid entityId)
        {
            var entity = await _entityService.GetEntity(entityId);


            var result = new GetEntityResult
            {
                Description = entity.Description,
                Id = entity.Id,
                Name = entity.Name,
                Code = entity.Code,
                Hidden = entity.Hiddenn,
                Order = entity.Order,
                CreationTime = entity.CreationTime,
            };

            return result;
        }

        public async Task<List<GetEntityResult>> GetEntities(GetEntitiesServiceContract contract)
        {
            if (contract == null) return new List<GetEntityResult>();
            IQueryable<Entity> filter(IQueryable<Entity> query)
            {
                if (contract.Ids != null && contract.Ids.Any())
                {
                    query = query.Where(x => contract.Ids.Contains(x.Id));
                }

                if (contract.IdsToFindParents != null && contract.IdsToFindParents.Any())
                {
                    query = query.Where(x => contract.IdsToFindParents.Contains(x.Id)).SelectMany(x => x.Parents.Select(y => y.EntityParent));
                }

                if (contract.ParentIds != null && contract.ParentIds.Any())
                {
                    foreach (var parentId in contract.ParentIds)
                    {
                        query = query.Where(x => x.Parents.Any(y => y.EntityParentId == parentId));
                    }
                }
                else if ((contract.Ids == null || !contract.Ids.Any()) &&
                    (contract.IdsToFindParents == null || !contract.IdsToFindParents.Any()))
                {
                    query = query.Where(x => !x.Parents.Any());
                }

                if (contract.Words != null && contract.Words.Any())
                {
                    query = query.Where(x => contract.Words.All(y => x.Name.Contains(y) || x.Description.Contains(y)));
                }

                if (!contract.ShowHidden)
                {
                    query = query.Where(x => !x.Hiddenn);
                }

                return query.OrderBy(x => x.Order).ThenByDescending(x => x.CreationTime).Skip(contract.Skip).Take(contract.Take ?? 100);
            }

            var entities = await _entityService.GetEntities(filter);

            return entities.Select(x => new GetEntityResult
            {
                Description = x.Description,
                Id = x.Id,
                Name = x.Name,
                Code = x.Code,
                Hidden = x.Hiddenn,
                Order = x.Order,
                CreationTime = x.CreationTime,
            }).ToList();
        }

        public async Task DeleteEntity(DeleteEntityServiceContract contract)
        {
            await _entityService.DeleteEntity(contract.Id);
        }

        public async Task AddParent(AddParentServiceContract contract)
        {
            await _entityService.AddRelation(new EntityRelation { EntityId = contract.Id, EntityParentId = contract.ParentId });
        }

        public async Task RemoveParent(RemoveParentServiceContract contract)
        {
            await _entityService.DeleteRelation(contract.Id, contract.ParentId);
        }
    }
}
