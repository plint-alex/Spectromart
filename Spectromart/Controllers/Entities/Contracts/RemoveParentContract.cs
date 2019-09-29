using System;

namespace Spectromart.Controllers.Entities.Contracts
{
    public class RemoveParentContract
    {
        public Guid Id { get; set; }
        public Guid ParentId { get; set; }
    }
}
