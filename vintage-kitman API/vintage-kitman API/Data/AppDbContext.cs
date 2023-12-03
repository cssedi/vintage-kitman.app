using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using vintage_kitman_API.Model;
using static System.Net.WebRequestMethods;

namespace vintage_kitman_API.NewFolder
{
    public class AppDbContext: IdentityDbContext<User,IdentityRole, string>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
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


            //seed data
            modelBuilder.Entity<Sport>()
                .HasData
                (
                new Sport { SportId = 1, Name = "Football" },
                new Sport { SportId = 2, Name = "Rugby" },
                new Sport { SportId = 3, Name = "NFL" },
                new Sport { SportId = 4, Name = "Formula 1" },
                new Sport { SportId = 5, Name = "Basketball" }     
                );

            modelBuilder.Entity<League>()
                .HasData
                (
                new League { LeagueId = 1, Name = "Premier League", SportId = 1, IsWomensLeague=false },
                new League { LeagueId = 2, Name = "La Liga", SportId = 1, IsWomensLeague=false },
                new League { LeagueId = 3, Name = "Serie A", SportId = 1, IsWomensLeague = false },
                new League { LeagueId = 4, Name = "Bundesliga", SportId = 1, IsWomensLeague = false },
                new League { LeagueId = 5, Name = "Ligue 1", SportId = 1, IsWomensLeague = false },
                new League { LeagueId = 6, Name="Saudi Pro League", SportId = 1, IsWomensLeague = false },
                new League { LeagueId = 7, Name="MLS", SportId = 1, IsWomensLeague = false },
                new League { LeagueId = 8, Name = "National Football Teams", SportId = 1, IsWomensLeague = false },
                new League { LeagueId = 9, Name = "National Rugby Teams", SportId = 2, IsWomensLeague = false },
                new League { LeagueId = 10, Name = "Formula 1", SportId = 4, IsWomensLeague = false },
                new League { LeagueId = 11, Name = "NBA", SportId = 5, IsWomensLeague = false }
                );

            modelBuilder.Entity<Country>()
                .HasData(
                new Country { CountryId = 1, Name = "England", Flag = "https://www.countryflags.io/gb/flat/64.png" },
                new Country { CountryId = 2, Name = "Spain", Flag = "https://www.countryflags.io/es/flat/64.png" },
                new Country { CountryId = 3, Name = "Italy", Flag = "https://www.countryflags.io/it/flat/64.png" },
                new Country { CountryId = 4, Name = "Germany", Flag = "https://www.countryflags.io/de/flat/64.png" },
                new Country { CountryId = 5, Name = "France", Flag = "https://www.countryflags.io/fr/flat/64.png" },
                new Country { CountryId = 6, Name = "Netherlands", Flag = "https://www.countryflags.io/nl/flat/64.png" },
                new Country { CountryId = 7, Name = "Saudi Arabia", Flag = "https://www.countryflags.io/sa/flat/64.png" },
                new Country { CountryId = 8, Name = "USA", Flag = "https://www.countryflags.io/us/flat/64.png" },
                new Country { CountryId = 9, Name = "New Zealand", Flag = "https://www.countryflags.io/nz/flat/64.png" },
                new Country { CountryId = 10, Name = "South Africa", Flag = "https://www.countryflags.io/za/flat/64.png" },
                new Country { CountryId = 11, Name = "Argentina", Flag = "https://www.countryflags.io/ar/flat/64.png" },
                new Country { CountryId = 12, Name = "Australia", Flag = "https://www.countryflags.io/au/flat/64.png" }
                );

            modelBuilder.Entity<Team>()
                .HasData(

                new Team { TeamId = 1, Name = "Arsenal", LeagueId = 1 },
                new Team { TeamId = 2, Name = "Manchester City", LeagueId = 1 },
                new Team { TeamId = 3, Name = "Liverpool", LeagueId = 1 },
                new Team { TeamId = 4, Name = "Tottenham Hotspur", LeagueId = 1 },
                new Team { TeamId = 5, Name = "Manchester United", LeagueId = 1 },
                new Team { TeamId = 6, Name = "Newcastle", LeagueId = 1 },
                new Team { TeamId = 7, Name = "Real Madrid", LeagueId = 2 },
                new Team { TeamId = 8, Name = "Barcelona", LeagueId = 2 },
                new Team { TeamId = 9, Name = "Inter", LeagueId = 3 },
                new Team { TeamId = 10, Name = "Juventus", LeagueId = 3 },
                new Team { TeamId = 11, Name = "AC Milan", LeagueId = 3 },
                new Team { TeamId = 12, Name = "Bayern Munich", LeagueId = 4 },
                new Team { TeamId = 13, Name = "Borussia Dortmund", LeagueId = 4 },
                new Team { TeamId = 14, Name = "Paris Saint Germain", LeagueId = 5 },
                new Team { TeamId = 15, Name = "England", LeagueId = 8 },
                new Team { TeamId = 16, Name = "France", LeagueId = 8 },
                new Team { TeamId = 17, Name = "Germany", LeagueId = 8 },
                new Team { TeamId = 18, Name = "New Zealand", LeagueId = 9 },
                new Team { TeamId = 19, Name = "South Africa", LeagueId = 9 },
                new Team { TeamId = 20, Name = "Mercedes", LeagueId = 10 },
                new Team { TeamId = 21, Name = "Ferrari", LeagueId = 10 },
                new Team { TeamId = 22, Name = "Golden State Warriors", LeagueId = 11 },
                new Team { TeamId = 23, Name = "Los Angeles Lakers", LeagueId = 11 }
                );

            modelBuilder.Entity<ProductType>()
                .HasData(
                new ProductType { ProductTypeId = 1, Name = "Adults New Kit" },
                new ProductType { ProductTypeId = 2, Name = "Childrens Kit" },
                new ProductType { ProductTypeId = 3, Name = "Adults Retro Kit" }
                );

            modelBuilder.Entity<Size>()
                .HasData(
                new Size { SizeId = 1, Name = "XS" },
                new Size { SizeId = 2, Name = "S" },
                new Size { SizeId = 3, Name = "M" },
                new Size { SizeId = 4, Name = "L" },
                new Size { SizeId = 5, Name = "XL" },
                new Size { SizeId = 6, Name = "XXL"  }
                );

            modelBuilder.Entity<Kit>()
                .HasData(
                    new Kit
                    { KitId = 1, ProductTypeId = 1, TeamId = 1, Name = "Arsenal Home Jersey 2022/23 ",
                        FrontImage = "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2579c29427554b5a9fc8e492c29d29d8_9366/Arsenal_23-24_Home_Jersey_Red_HR6929_HM30.jpg",
                        Price = 900 
                    },
                    new Kit
                    {
                        KitId = 2,ProductTypeId = 3,TeamId =1 ,  Name = "Arsenal Away Jersey 88/90",
                        FrontImage = "https://soccerkingz.nl/wp-content/uploads/2022/07/546as4g65as-1-1.png",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 3, ProductTypeId = 1, TeamId = 1, Name = "Arsenal Home Jersey 99/00",
                        FrontImage = "https://soccerkingz.nl/wp-content/uploads/2022/09/7f8aa5db-1-800x800.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 4, ProductTypeId = 1, TeamId = 2, Name = "Manchester City Home Jersey 2022/23",
                        FrontImage = "https://frostyfooty.com/cdn/shop/files/image_8a218b23-1482-4c92-b7ca-ec9cb0ea13f7.jpg?v=1685456474",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 5, ProductTypeId = 1, TeamId = 2, Name = "Manchester City Home Jersey 2011/12",
                        FrontImage = "https://retrosleague.com/cdn/shop/products/a61_cb91b325-009e-4e88-87f1-fbc954a72908_1946x.jpg?v=1657566430",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 6, ProductTypeId = 1, TeamId = 2, Name = "Manchester City The 10th Anniversary 93:20 jersey",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/157-scaled.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 7, ProductTypeId = 3, TeamId = 3, Name = "Liverpool Home Jersey 2011/11",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/440.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 8, ProductTypeId = 3, TeamId = 3, Name = "Liverpool Away Jersey 2001/01",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/456.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 9, ProductTypeId = 2, TeamId = 4, Name = "Tottenham Hotspur Kids Home Jersey 2023/24",
                        FrontImage = "https://media.karousell.com/media/photos/products/2023/6/24/tottenham_hotspur_kids_2324_ho_1687582867_5033c5ca_progressive",
                        Price = 600
                    },
                    new Kit
                    {
                        KitId = 10, ProductTypeId = 1, TeamId = 4, Name = "Tottenham Hotspur Third Jersey 2023/24",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1436.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 11, ProductTypeId = 1, TeamId = 4, Name = "Tottenham Hotspur Home Jersey 2006/07",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/429.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 12, ProductTypeId = 3, TeamId = 5, Name = "Manchester United Home Jersey 96/97",
                        FrontImage = "https://soccerkingz.nl/wp-content/uploads/2022/07/6a5s4gh6523g-1-1-1.png",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 13, ProductTypeId = 3, TeamId = 5, Name = "Manchester United Green Rosey Standard Version Special Jersey 2022/23",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/166-scaled.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 14, ProductTypeId = 3, TeamId = 5, Name = "Manchester United Away Jersey 1982/83",
                        FrontImage = "https://soccerkingz.nl/wp-content/uploads/2022/07/65a4g65a4g65-1.png",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 15, ProductTypeId = 3, TeamId = 6, Name = "Newcastle Home Jersey 1995/97",
                        FrontImage = "https://www.fandomkits.net/cdn/shop/products/Newcastle_Home_InsaneKits.com.png?v=1657965593",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 16, ProductTypeId = 1, TeamId = 6, Name = "Newcastle Home Jersey 2023/24",
                        FrontImage = "https://www.fandomkits.net/cdn/shop/files/c650837a.jpg?v=1689615936",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 17, ProductTypeId = 1, TeamId = 7, Name = "Real Madrid Away Jersey 2023/24",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1414.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 18, ProductTypeId = 1, TeamId = 7, Name = "Real Madrid Home Jersey 2017/18",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/445.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 19, ProductTypeId = 3, TeamId = 7, Name = "Real Madrid Champions League Commemorative Edition Jersey 1997/",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/462.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 20, ProductTypeId = 1, TeamId = 7, Name = "Real Madrid Dragon Standard Version Special Jersey 22/23",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/142-scaled.jpg",
                        Price = 900
                    },
                    new Kit 
                    {
                        KitId = 21, ProductTypeId = 2,TeamId = 8, Name = "Barcelona Baby Romper Home Jersey 2023/24",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1526.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 22, ProductTypeId = 1, TeamId = 8, Name = "Barcelona Home Jersey 2023/24",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1410.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 23, ProductTypeId = 3, TeamId = 8, Name = "Barcelona Away Jersey 2003/04",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/475.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 24, ProductTypeId = 3, TeamId = 9, Name = "Inter Home Jersey 1995/96",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/472.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 25, ProductTypeId = 3, TeamId = 9, Name = "Inter Home Jersey 2004/005",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/422.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 26, ProductTypeId = 1, TeamId = 10, Name = "Juventus Home Jersey 2014/15",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/467.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 27, ProductTypeId = 1, TeamId = 10, Name = "Juventus Gucci Jersey 2023/24",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/137-scaled.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 28, ProductTypeId = 3, TeamId = 11, Name = "AC Milan Away Jersey 1995/96",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/468.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 29, ProductTypeId = 3,TeamId = 11, Name = "AC Milan Away Jersey 1995/96",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/441.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 30, ProductTypeId = 1, TeamId = 11, Name = "AC Milan Camo Green Standard Version Special Jersey 22/23",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/131.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 31, ProductTypeId = 3, TeamId = 12, Name = "Bayern Munich Home Jersey 1997/98",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/426.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 32, ProductTypeId = 2, TeamId = 12, Name = "Bayern Munich Home Baby Romper 2022/23",
                        FrontImage = "https://d2j6dbq0eux0bg.cloudfront.net/images/64844288/3166492166.jpg",
                        Price = 450
                    },
                    new Kit
                    {
                        KitId = 33, ProductTypeId = 1, TeamId = 12, Name = "Bayern Munich Home Jersey 2023/24",
                        FrontImage = "https://www.fandomkits.net/cdn/shop/files/9c76d112.jpg?v=1684700866",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 34, ProductTypeId = 1, TeamId = 13, Name = "Borussia Dortmund Home Jersey 23/24",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1409.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 35, ProductTypeId = 3, TeamId = 13, Name = "Borussia Dortmund Home Jersey 1989",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/477.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 36, ProductTypeId = 2, TeamId = 14, Name = "Paris Saint Germain Home Kids Jersey 2023/24",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1494.jpg",
                        Price = 450
                    },
                    new Kit
                    {
                        KitId = 37, ProductTypeId = 1, TeamId = 14, Name = "Paris Saint Germain Home Jersey 2023/24",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1408.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 38, ProductTypeId = 3, TeamId = 15, Name = "England Home Jersey 1990",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1039.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 39,ProductTypeId = 3,TeamId = 15, Name = "England Home Jersey 1996",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1020.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 40, ProductTypeId = 1, TeamId = 16, Name = "France Graffiti Special World Cup Jersey 2022",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1305.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 41, ProductTypeId = 3, TeamId = 16, Name = "France Home Jersey 1998",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1059.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 42, ProductTypeId = 3, TeamId = 16, Name = "France Home Jersey 2000",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/STvQZrkF-879.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 43, ProductTypeId = 1, TeamId = 17, Name = "Germany Away Jersey 2014",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/988.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 44, ProductTypeId = 3, TeamId = 17, Name = "Germany Home Jersey 1994",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1024.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 45, ProductTypeId = 3, TeamId = 17, Name = "Germany Home Jersey 1998",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1047.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 46, ProductTypeId = 1, TeamId = 18, Name = "New Zealand All Blacks Home Jersey 2010",
                        FrontImage = "https://classic-shirts.com/eng_pm_ALL-BLACKS-NEW-ZELAND-RUGBY-ADIDAS-SHIRT-S-167044_1.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 47 ,ProductTypeId = 1, TeamId = 19,
                        Name = "South Africa Sprinboks Alternate Jersey 2023",
                        FrontImage = "https://classic-shirts.com/eng_pm_ALL-BLACKS-NEW-ZELAND-RUGBY-ADIDAS-SHIRT-S-167044_1.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 48, ProductTypeId = 1,TeamId = 19,Name = "South Africa Sprinboks Home Jersey 2023",
                        FrontImage = "https://thefoschini.vtexassets.com/arquivos/ids/99734459-1200-1200?v=638358239488070000&width=1200&height=1200&aspect=true",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 49, ProductTypeId =1,TeamId = 20,Name= "Mercedes Mens 2023 Team Polo Black",
                        FrontImage = "https://shop-int.mercedesamgf1.com/cdn/shop/products/MAPF1RPMENSDRIVERTEE-BLACK-FRONT.jpg?v=1700594659&width=540",
                        Price = 800
                    },
                    new Kit
                    {
                        KitId = 50,ProductTypeId = 1,TeamId = 21, Name = "Scuderia Ferrari Team T-shirt",
                        FrontImage = "https://store.ferrari.com/product_image/1647597308912076/f/w1230.jpg",
                        Price = 800
                    },
                    new Kit
                    {
                        KitId = 51, ProductTypeId = 1,TeamId = 22, Name = "Golden State Warriors Home Jersey 2022/23",
                        FrontImage = "https://media.karousell.com/media/photos/products/2023/3/2/jersey_nba_golden_state_warrio_1677763452_37614dc0_progressive.jpg",
                        Price = 900
                    },
                    new Kit
                    {
                        KitId = 52, ProductTypeId = 1,TeamId = 23, Name = "Los Angeles Lakers Home Jersey 2022/23",
                        FrontImage = "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/526.jpeg",
                        Price = 900
                    });


        }

                                                                                                                              
        
        }
    }
