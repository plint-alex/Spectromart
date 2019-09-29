using System;

namespace BusinessLayer.Services.Contracts.Entities
{
    public class GetEntitiesResult
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
