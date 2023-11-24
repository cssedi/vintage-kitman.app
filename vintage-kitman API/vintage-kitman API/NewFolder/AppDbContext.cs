using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using vintage_kitman_API.Model;

namespace vintage_kitman_API.NewFolder
{
    public class AppDbContext: IdentityDbContext<User,IdentityRole, string>
    {
        public AppDbContext (DbContextOptions<AppDbContext> options) : base(options)
        {



        }
        public DbSet<User> Users { get; set; }
        public DbSet<Country> Countries { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); 
        
        }

                                                                                                                              );
        }
    }
}
