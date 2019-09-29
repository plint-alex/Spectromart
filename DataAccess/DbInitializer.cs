using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class DbInitializer
    {
        private readonly ApplicationDbContext _dbContext;

        public DbInitializer(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Seed(List<(Guid Id, string Name, string Description, string Code, bool hidden, Guid? parentId)> entities)
        {
            //await _dbContext.Database.EnsureCreatedAsync();

            await _dbContext.Database.MigrateAsync();

            if (await _dbContext.Users.AllAsync(x => x.Login != "admin"))
            {
                await _dbContext.Users.AddAsync(new Entities.User { Login = "admin", Password = MD5Hash("admin") });
                await _dbContext.SaveChangesAsync();
            }

            foreach (var (Id, Name, Description, Code, hidden, parentId) in entities)
            {
                if (await _dbContext.Entities.AllAsync(x => x.Id != Id))
                {
                    var newEntity = new Entities.Entity { Id = Id, Name = Name, Description = Description, Code = Code, Hiddenn = hidden };

                    if (parentId.HasValue)
                    {
                        newEntity.Parents = new List<Entities.EntityRelation> { new Entities.EntityRelation { EntityId = Id, EntityParentId = parentId.Value } };
                    }

                    await _dbContext.Entities.AddAsync(newEntity);
                    await _dbContext.SaveChangesAsync();
                }
            }
        }



        private static string MD5Hash(string input)
        {
            using (var md5 = MD5.Create())
            {
                var result = md5.ComputeHash(Encoding.ASCII.GetBytes(input));
                return Encoding.ASCII.GetString(result);
            }
        }
    }
}
