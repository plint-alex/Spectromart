using System;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Contracts.Authentication
{
    public interface IAuthenticationService
    {
        Task<LoginServiceResult> Login(LoginServiceContract contract);

        Task Logout(Guid userId);

        Task<bool> UpdateRefreshToken(Guid userId, Guid oldRefreshToken, Guid newRefreshToken);
    }
}
