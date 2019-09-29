using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    public class Entity
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Code { get; set; }

        public int Order { get; set; }

        public DateTime CreationTime { get; set; }

        public bool Hiddenn { get; set; }

        [InverseProperty("Entity")]
        public List<EntityRelation> Parents { get; set; }

        public Guid ValueParentId { get; set; }
        public Entity Value { get; set; }


        //public virtual ICollection<File> Files { get; set; }
    }
}
