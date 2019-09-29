using System;

namespace Spectromart.Controllers.Files.Contracts
{
    public class GetFilesContract
    {
        public Guid[] Ids { get; set; }
        public Guid[] EntityIds { get; set; }
        public string[] Types { get; set; }
    }
}
