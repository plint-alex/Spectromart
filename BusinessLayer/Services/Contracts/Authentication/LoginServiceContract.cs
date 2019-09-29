using System;

namespace BusinessLayer.Services.Contracts.Authentication
{
    public class LoginServiceContract
    {
        public string Login { get; set; }

        public string Password { get; set; }

        public Guid RefreshToken { get; set; }
    }
}
