using BusinessLayer.Services.Contracts.Files;
using DataAccess.Contracts;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer.Services
{
    public class FilesService : IFilesService
    {
        private readonly IFileService _fileService;
        public FilesService(IFileService fileService)
        {
            _fileService = fileService;
        }
        public async Task AddFile(AddFileServiceContract file)
        {
            var dbFile = new DataAccess.Entities.File { Id = Guid.NewGuid(), EntityId = file.EntityId, MimeType = file.MimeType, Type = file.Type };

            using (var memoryStream = new MemoryStream())
            {
                await file.Data.CopyToAsync(memoryStream);
                dbFile.Data = memoryStream.ToArray();
            }

            await _fileService.AddFile(dbFile);
        }

        public async Task<FileResult> GetFile(Guid fileId)
        {
            var file = await _fileService.GetFile(fileId);

            return new FileResult { Data = new MemoryStream(file.Data), EntityId = file.EntityId, Id = file.Id, MimeType = file.MimeType, Type = file.Type };
        }

        public async Task<List<FileResult>> GetFiles(GetFilesServiceContract contract)
        {
            if (contract.EntitiIds == null || !contract.EntitiIds.Any() &&
                (contract.Ids == null || !contract.Ids.Any()))
                return new List<FileResult>();

            IQueryable<DataAccess.Entities.File> filter(IQueryable<DataAccess.Entities.File> query)
            {
                if (contract.EntitiIds != null && contract.EntitiIds.Any())
                {
                    query = query.Where(x => contract.EntitiIds.Contains(x.EntityId));
                }

                if (contract.Ids != null && contract.Ids.Any())
                {
                    query = query.Where(x => contract.Ids.Contains(x.Id));
                }

                if (contract.Types != null && contract.Types.Any())
                {
                    query = query.Where(x => contract.Types.Contains(x.Type));
                }

                return query;
            }

            var result = await _fileService.GetFiles(filter);

            return result.Select(x => new FileResult { EntityId = x.EntityId, Id = x.Id, MimeType = x.MimeType, Type = x.Type }).ToList();
        }


        public async Task DeleteFile(DeleteFileServiceContract file)
        {
            await _fileService.DeleteFile(file.FileId);
        }
    }
}
