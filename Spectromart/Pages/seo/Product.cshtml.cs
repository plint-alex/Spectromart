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
using Spectromart.Controllers.Files.Contracts;
using BusinessLayer.Services.Contracts.Files;

namespace Spectromart.Pages.seo
{

    public class ProductModel : PageModel
    {
        private readonly IEntitiesService _entitiesService;
        private readonly IFilesService _filesService;
        private IMemoryCache _cache;
        private readonly IMapper _mapper;

        public ProductModel(IEntitiesService entitiesService, IFilesService filesService, IMemoryCache memoryCache, IMapper mapper)
        {
            _entitiesService = entitiesService;
            _filesService = filesService;
            _cache = memoryCache;
            _mapper = mapper;
        }

        public Guid ProductId { get; set; }

        public async Task<List<GetEntitiesResult>> GetEntities([FromBody] GetEntitiesContract contract)
        {
            var serviceContract = _mapper.Map<GetEntitiesServiceContract>(contract);
            var entities = await _entitiesService.GetEntities(serviceContract);

            var result = _mapper.Map<List<GetEntitiesResult>>(entities);

            return result;
        }

        public async Task<List<Controllers.Files.Contracts.FileResult>> GetFiles([FromBody] GetFilesContract contract)
        {
            return (await _filesService.GetFiles(new GetFilesServiceContract { EntitiIds = contract.EntityIds, Ids = contract.Ids, Types = contract.Types }))
                .Select(x => new Controllers.Files.Contracts.FileResult { EntityId = x.EntityId, Id = x.Id, MimeType = x.MimeType, Type = x.Type }).ToList();
        }

        public void OnGet(Guid productId)
        {
            ProductId = productId;
        }
    }
}