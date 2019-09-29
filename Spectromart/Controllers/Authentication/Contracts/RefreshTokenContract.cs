using System;

namespace Spectromart.Controllers.Authentication.Contracts
{
    public class RefreshTokenContract
    {
        public string AccessToken { get; set; }
        public Guid RefreshToken { get; set; }
    }
}
