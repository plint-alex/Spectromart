using System;

namespace BusinessLayer.Services.Contracts.Entities
{
    public class RemoveParentServiceContract
    {
        public Guid Id { get; set; }
        public Guid ParentId { get; set; }
    }
}
