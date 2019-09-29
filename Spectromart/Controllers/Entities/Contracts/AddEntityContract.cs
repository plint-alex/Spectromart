using System;

namespace Spectromart.Controllers.Entities.Contracts
{
    public class AddEntityContract
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Code { get; set; }

        public int Order { get; set; }

        public Guid[] ParentIds { get; set; }

        public bool Hidden { get; set; }
    }
}
