
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public partial class ProjectContext : DbContext
    {
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<RoleUser> RoleUser { get; set; }
        public virtual DbSet<News> News {get; set;}
        public virtual DbSet<Product_Service> Product_Service { get; set; }
        public virtual DbSet<Product_Service_Category> Product_Service_Category { get; set; }
        
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
            modelBuilder.Entity<News>(entity =>
            {
                entity.HasKey(e => new{ e.News_ID});
                
                entity.Property(e => e.News_ID).ValueGeneratedOnAdd();
            });
            modelBuilder.Entity<Product_Service>(entity =>
            {
                entity.Property(e => e.Price_Sale).IsFixedLength(true);

                entity.Property(e => e.Product_Service_Cate_ID).IsUnicode(false);

                entity.Property(e => e.Update_By).IsUnicode(false);
            });

            modelBuilder.Entity<Product_Service_Category>(entity =>
            {
                entity.Property(e => e.Product_Service_Cate_ID).IsUnicode(false);

                entity.Property(e => e.Update_By).IsUnicode(false);
            });
            
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}