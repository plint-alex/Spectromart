using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using GetEntityResult = Spectromart.Controllers.Entities.Contracts.GetEntityResult;
using GetEntitiesResult = Spectromart.Controllers.Entities.Contracts.GetEntitiesResult;
using BusinessLayer.Services.Contracts.Entities;
using Microsoft.Extensions.Caching.Memory;
using AutoMapper;
using Spectromart.Controllers.Entities.Contracts;

namespace Spectromart.Pages.seo
{
    public class CatalogModel : PageModel
    {
        private readonly IEntitiesService _entitiesService;
        private IMemoryCache _cache;
        private readonly IMapper _mapper;

        public CatalogModel(IEntitiesService entitiesService, IMemoryCache memoryCache, IMapper mapper)
        {
            _entitiesService = entitiesService;
            _cache = memoryCache;
            _mapper = mapper;
        }

        public async Task<List<GetEntitiesResult>> GetEntities([FromBody] GetEntitiesContract contract)
        {
            var serviceContract = _mapper.Map<GetEntitiesServiceContract>(contract);
            var entities = await _entitiesService.GetEntities(serviceContract);

            var result = _mapper.Map<List<GetEntitiesResult>>(entities);

            return result;
        }

        public void OnGet()
        {

        }
    }
}