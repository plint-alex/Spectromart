using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Services.Contracts.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Caching.Memory;
using Spectromart.Controllers.Entities.Contracts;
using GetEntityResult = Spectromart.Controllers.Entities.Contracts.GetEntityResult;
using GetEntitiesResult = Spectromart.Controllers.Entities.Contracts.GetEntitiesResult;

namespace Spectromart.Pages
{
    public class Index2Model : PageModel
    {
        private readonly IEntitiesService _entitiesService;
        private IMemoryCache _cache;
        private readonly IMapper _mapper;

        public Index2Model(IEntitiesService entitiesService, IMemoryCache memoryCache, IMapper mapper)
        {
            _entitiesService = entitiesService;
            _cache = memoryCache;
            _mapper = mapper;
        }

        public void OnGet()
        {
        }

        public async Task<List<GetEntitiesResult>> GetEntities([FromBody] GetEntitiesContract contract)
        {
            var serviceContract = _mapper.Map<GetEntitiesServiceContract>(contract);
            var entities = await _entitiesService.GetEntities(serviceContract);

            var result = _mapper.Map<List<GetEntitiesResult>>(entities);

            return result;
        }
    }
}