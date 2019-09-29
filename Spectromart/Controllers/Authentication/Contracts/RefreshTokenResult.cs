﻿using System;

namespace Spectromart.Controllers.Authentication.Contracts
{
    public class RefreshTokenResult
    {
        public string AccessToken { get; set; }
        public Guid? RefreshToken { get; set; }

        public DateTime ExpirationTime { get; set; }
    }
}
