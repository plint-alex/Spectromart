using AutoMapper;
using BusinessLayer.Services.Contracts.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Spectromart.Controllers.Entities.Contracts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GetEntityResult = Spectromart.Controllers.Entities.Contracts.GetEntityResult;
using GetEntitiesResult = Spectromart.Controllers.Entities.Contracts.GetEntitiesResult;
using Microsoft.Extensions.Caching.Memory;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Spectromart.Controllers.Entities
{
    [Authorize]
    [Route("api/[controller]")]
    public class EntitiesController : Controller
    {
        private readonly IEntitiesService _entitiesService;
        private IMemoryCache _cache;
        private readonly IMapper _mapper;
        public EntitiesController(IEntitiesService entitiesService, IMemoryCache memoryCache, IMapper mapper)
        {
            _entitiesService = entitiesService;
            _cache = memoryCache;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet("GetEntity/{id}")]
        public async Task<GetEntityResult> GetEntity(Guid id)
        {
            var entity = await _entitiesService.GetEntity(id);

            return _mapper.Map<GetEntityResult>(entity);
        }

        [AllowAnonymous]
        [HttpPost("GetEntities")]
        public async Task<List<GetEntitiesResult>> GetEntities([FromBody] GetEntitiesContract contract)
        {
            var serviceContract = _mapper.Map<GetEntitiesServiceContract>(contract);
            var entities = await _entitiesService.GetEntities(serviceContract);

            var result = _mapper.Map<List<GetEntitiesResult>>(entities);

            return result;
        }

        [HttpPost("AddEntity")]
        public async Task<object> AddEntity([FromBody] AddEntityContract contract)
        {
            var serviceContract = _mapper.Map<AddEntityServiceContract>(contract);

            var id = await _entitiesService.AddEntity(serviceContract);

            return new { id };
        }

        [HttpPost("UpdateEntity")]
        public async Task<object> UpdateEntity([FromBody] UpdateEntityContract contract)
        {
            var serviceContract = _mapper.Map<UpdateEntityServiceContract>(contract);

            await _entitiesService.UpdateEntity(serviceContract);

            return new { };
        }

        [HttpPost("DeleteEntity")]
        public async Task<object> DeleteEntity([FromBody] DeleteEntityContract contract)
        {
            var serviceContract = _mapper.Map<DeleteEntityServiceContract>(contract);

            await _entitiesService.DeleteEntity(serviceContract);

            return new { };
        }

        [HttpPost("AddParent")]
        public async Task<object> AddParent([FromBody] AddParentContract contract)
        {
            var serviceContract = _mapper.Map<AddParentServiceContract>(contract);

            await _entitiesService.AddParent(serviceContract);

            return new { };
        }

        [HttpPost("RemoveParent")]
        public async Task<object> RemoveParent([FromBody] RemoveParentContract contract)
        {
            var serviceContract = _mapper.Map<RemoveParentServiceContract>(contract);

            await _entitiesService.RemoveParent(serviceContract);

            return new { };
        }

    }
}
