using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.Contracts
{
    public interface IFileService
    {
        Task AddFile(File file);
        Task<File> GetFile(Guid fileId);
        Task<List<File>> GetFiles(Func<IQueryable<File>, IQueryable<File>> filter);
        Task DeleteFile(Guid fileId);
    }
}
