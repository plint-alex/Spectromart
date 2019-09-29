using System;
using System.IO;

namespace BusinessLayer.Services.Contracts.Files
{
    public class AddFileServiceContract
    {
        public Guid? FileId { get; set; }
        public Guid EntityId { get; set; }

        public string Type { get; set; }

        public Stream Data { get; set; }

        public string MimeType { get; set; }
    }
}
