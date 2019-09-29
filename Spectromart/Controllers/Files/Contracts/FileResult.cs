using System;

namespace Spectromart.Controllers.Files.Contracts
{
    public class FileResult
    {
        public Guid Id { get; set; }

        public Guid EntityId { get; set; }

        public string Type { get; set; }

        public string MimeType { get; set; }
    }
}
