using System;

namespace DataAccess.Entities
{
    public class File
    {
        public Guid Id { get; set; }

        public Guid EntityId { get; set; }

        public string Type { get; set; }

        public byte[] Data { get; set; }

        public string MimeType { get; set; }
    }
}
