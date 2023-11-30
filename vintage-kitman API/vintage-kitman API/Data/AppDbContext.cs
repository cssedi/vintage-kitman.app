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
        public DbSet<User> users { get; set; }
        public DbSet<Country> countries { get; set; }
        public DbSet<Sport> sports { get; set; }
        public DbSet<Team> teams { get; set; }
        public DbSet<League> leagues { get; set; }
        public DbSet<Kit> kit { get; set; }
        public DbSet<Size> sizes { get; set; }
        public DbSet<ProductType> productTypes { get; set; }
        public DbSet<Orders> orders { get; set; }
        public DbSet<OrderStatus> orderStatuses { get; set; }
        public DbSet<KitOrders> kitOrders { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); 

            //associative entity configurations
            modelBuilder.Entity<KitOrders>()
                .HasKey(ko => new { ko.KitId, ko.OrderId });
        
        }

                                                                                                                              
        
        }
    }
