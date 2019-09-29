using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class ApplicationDbContext : DbContext
    {

        public DbSet<User> Users { get; set; }
        public DbSet<Entity> Entities { get; set; }
        public DbSet<EntityRelation> EntityRelations { get; set; }
        public DbSet<File> Files { get; set; }


        //
        // Summary:
        //     /// Initializes a new instance of Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityDbContext.
        //     ///
        //
        // Parameters:
        //   options:
        //     The options to be used by a Microsoft.EntityFrameworkCore.DbContext.
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
        }

        //
        // Summary:
        //     /// Initializes a new instance of the Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityDbContext
        //     class. ///
        protected ApplicationDbContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(x => x.Login);

            modelBuilder.Entity<File>()
                .HasIndex(x => new { x.EntityId });

            modelBuilder.Entity<EntityRelation>()
                .HasIndex(x => new { x.EntityId });

            modelBuilder.Entity<EntityRelation>()
                .HasIndex(x => new { x.EntityParentId });

            modelBuilder.Entity<Entity>()
                .HasIndex(x => new { x.Code });

            modelBuilder.Entity<Value>()
                .HasIndex(x => new { x.IntValue, x.DoubleValue, x.DateTimeValue, x.StringValue  });
        }
    }
}
