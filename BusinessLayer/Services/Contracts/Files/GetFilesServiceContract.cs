using System;

namespace BusinessLayer.Services.Contracts.Files
{
    public class GetFilesServiceContract
    {
        public Guid[] Ids { get; set; }
        public Guid[] EntitiIds { get; set; }
        public string[] Types { get; set; }
    }
}
