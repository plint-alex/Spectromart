using System;

namespace Spectromart.Controllers.Entities.Contracts
{
    public class GetEntitiesContract
    {
        public Guid[] Ids { get; set; }
        public Guid[] ParentIds { get; set; }
        public Guid[] IdsToFindParents { get; set; }
        public bool ShowHidden { get; set; }
        public int Skip { get; set; }
        public int? Take { get; set; }
    }
}
