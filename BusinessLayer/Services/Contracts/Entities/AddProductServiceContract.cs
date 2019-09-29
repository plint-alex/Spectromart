using System;

namespace BusinessLayer.Services.Contracts.Entities
{
    public class AddEntityServiceContract
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Code { get; set; }

        public int Order { get; set; }

        public bool Hidden { get; set; }

        public Guid[] ParentIds { get; set; }
    }
}
