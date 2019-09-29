using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer.Services.Contracts.Authentication
{
    public class LoginServiceResult
    {
        public string Error { get; set; }
        public bool Success { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
    }
}
