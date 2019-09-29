using System;
using System.IO;

namespace BusinessLayer.Services.Contracts.Files
{
    public class FileResult
    {
        public Guid Id { get; set; }

        public Guid EntityId { get; set; }

        public string Type { get; set; }

        public string MimeType { get; set; }

        public Stream Data { get; set; }
    }
}
