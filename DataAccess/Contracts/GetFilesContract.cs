using System;

namespace DataAccess.Contracts
{
    public class GetFilesContract
    {
        public Guid[] Ids { get; set; }
        public Guid[] EntitiIds { get; set; }
        public string[] Types { get; set; }
    }
}
