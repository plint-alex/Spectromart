using System;
using System.Threading.Tasks;

namespace DataAccess.Contracts
{
    public interface IUserService
    {
        Task AddUser(Entities.User user);
        Task<Entities.User> GetUser(string userLogin);
        Task<Entities.User> GetUser(Guid userId);
        Task UpdateRefreshToken(Guid userId, Guid? refreshToken);
    }
}
