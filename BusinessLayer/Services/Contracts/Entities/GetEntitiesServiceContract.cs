using System;

namespace BusinessLayer.Services.Contracts.Entities
{
    public class GetEntitiesServiceContract
    {
        public Guid[] Ids { get; set; }
        public Guid[] ParentIds { get; set; }
        public Guid[] IdsToFindParents { get; set; }
        public string[] Words { get; set; }
        public int Skip { get; set; }
        public int? Take { get; set; }
        public bool ShowHidden { get; set; }
    }
}
