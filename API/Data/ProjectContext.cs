
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public partial class ProjectContext : DbContext
    {
        public virtual DbSet<Users> Users { get; set; }
        
        public ProjectContext(DbContextOptions<ProjectContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => new { e.User_Account });
            });
            
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}