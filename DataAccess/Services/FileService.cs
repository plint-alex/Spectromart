using DataAccess.Contracts;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.Services
{
    public class FileService : IFileService
    {
        public readonly ApplicationDbContext _applicationDbContext;

        public FileService(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task AddFile(File file)
        {
            await _applicationDbContext.AddAsync(file);

            await _applicationDbContext.SaveChangesAsync();
        }

        public async Task<File> GetFile(Guid fileId)
        {
            return await _applicationDbContext.Files.AsNoTracking().Where(x => x.Id == fileId).FirstOrDefaultAsync();
        }

        public async Task<List<File>> GetFiles(Func<IQueryable<File>, IQueryable<File>> filter)
        {
            return await filter(_applicationDbContext.Files.AsNoTracking()).Select(x => new File { EntityId = x.EntityId, Id = x.Id, MimeType = x.MimeType, Type = x.Type }).ToListAsync();
        }

        public async Task DeleteFile(Guid fileId)
        {
            await _applicationDbContext.Database.ExecuteSqlRawAsync($"DELETE From Files WHERE Id = @Id", new { Id = fileId });
        }
    }
}
