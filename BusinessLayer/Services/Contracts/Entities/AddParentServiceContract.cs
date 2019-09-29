using System;

namespace BusinessLayer.Services.Contracts.Entities
{
    public class AddParentServiceContract
    {
        public Guid Id { get; set; }

        public Guid ParentId { get; set; }
    }
}
