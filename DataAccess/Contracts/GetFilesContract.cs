using System;

namespace DataAccess.Contracts
{
    public class GetFilesContract
    {
        public Guid[] Ids { get; set; }
        public Guid[] EntityIds { get; set; }
        public string[] Types { get; set; }
    }
}
