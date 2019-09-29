using System;

namespace DataAccess.Entities
{
    public class EntityRelation
    {
        public Guid Id { get; set; }

        public Guid EntityId { get; set; }
        public Entity Entity { get; set; }

        public Guid EntityParentId { get; set; }
        public Entity EntityParent { get; set; }
    }
}
