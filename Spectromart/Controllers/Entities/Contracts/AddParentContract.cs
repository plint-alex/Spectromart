using System;

namespace Spectromart.Controllers.Entities.Contracts
{
    public class AddParentContract
    {
        public Guid Id { get; set; }

        public Guid ParentId { get; set; }
    }
}
