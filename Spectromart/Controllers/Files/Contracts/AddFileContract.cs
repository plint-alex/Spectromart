using Microsoft.AspNetCore.Http;
using System;

namespace Spectromart.Controllers.Files.Contracts
{
    public class AddFileContract
    {
        public IFormFile File { get; set; }
        public Guid EntityId { get; set; }
        public Guid? FileId { get; set; }
    }
}
