
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public partial class ProjectContext : DbContext
    {
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<RoleUser> RoleUser { get; set; }
        
        public ProjectContext(DbContextOptions<ProjectContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => new { e.User_Account });
            });
            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => new { e.role_unique });
            });
            modelBuilder.Entity<RoleUser>(entity =>
            {
                entity.HasKey(e => new { e.user_account, e.role_unique });
            });
            
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}