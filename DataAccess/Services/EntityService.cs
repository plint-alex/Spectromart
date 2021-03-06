﻿using DataAccess.Contracts;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.Services
{
    public class EntityService : IEntityService
    {
        public readonly ApplicationDbContext _applicationDbContext;

        public EntityService(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Entity> GetEntity(Guid entityId)
        {
            return await _applicationDbContext.Entities.AsNoTracking().FirstOrDefaultAsync(x => x.Id == entityId);
        }

        public async Task<List<Entity>> GetEntities(Func<IQueryable<Entity>, IQueryable<Entity>> filter)
        {
            return await filter(_applicationDbContext.Entities.AsNoTracking())
            //.Select(x => new Entity
            //{
            //    Id = x.Id,
            //    Name = x.Name,
            //    Description = x.Description,
            //    Code = x.Code,
            //    Order = x.Order,
            //    CreationTime = x.CreationTime,
            //    Hiddenn = x.Hiddenn,                
            //})
            .ToListAsync();
        }

        public async Task AddEntity(Entity entity)
        {
            await _applicationDbContext.AddAsync(entity);

            await _applicationDbContext.SaveChangesAsync();
        }

        public async Task AddRelation(EntityRelation entityRelation)
        {
            await _applicationDbContext.AddAsync(entityRelation);

            await _applicationDbContext.SaveChangesAsync();
        }

        public async Task UpdateEntity(Entity entity)
        {
            _applicationDbContext.Entities.Attach(entity);

            var dbEntity = _applicationDbContext.Entry(entity);
            dbEntity.Property(x => x.Name).IsModified = true;
            dbEntity.Property(x => x.Description).IsModified = true;
            dbEntity.Property(x => x.Code).IsModified = true;
            dbEntity.Property(x => x.Hiddenn).IsModified = true;
            dbEntity.Property(x => x.Order).IsModified = true;
            await _applicationDbContext.SaveChangesAsync();
        }

        public async Task DeleteEntity(Guid entityId)
        {
            await _applicationDbContext.Database.ExecuteSqlInterpolatedAsync($"DELETE FROM Entities WHERE Id = {entityId}");
        }

        public async Task DeleteRelation(Guid entityId, Guid entityParentId)
        {
            await _applicationDbContext.Database.ExecuteSqlInterpolatedAsync($"DELETE FROM EntityRelations WHERE EntityId = {entityId} AND EntityParentId = {entityParentId}");
        }
    }
}
