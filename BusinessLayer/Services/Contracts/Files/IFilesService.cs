using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Contracts.Files
{
    public interface IFilesService
    {
        Task AddFile(AddFileServiceContract file);
        Task DeleteFile(DeleteFileServiceContract file);
        Task<FileResult> GetFile(Guid fileId);
        Task<List<FileResult>> GetFiles(GetFilesServiceContract contract);
    }
}
