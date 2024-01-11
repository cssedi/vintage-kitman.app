using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using vintage_kitman_API.Model;
using vintage_kitman_API.NewFolder;
using vintage_kitman_API.ViewModels;
using vintage_kitman_API.ViewModels.CategoriesModels;
using vintage_kitman_API.ViewModels.OrderModels;

namespace vintage_kitman_API.Data.Repositories.Orders
{
    public class OrdersRepository : IOrdersRepository
    {
        private readonly AppDbContext _appDbContext;
        public OrdersRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [Authorize(Roles = "Customer", AuthenticationSchemes ="Bearer")]
        public async Task<CustomOrder> CreateCustomOrder(CustomOrderVM model, string userId)
        {
            //get user
            var user = _appDbContext.Users.FirstOrDefault(x => x.Id == userId);

            CustomOrder customOrder = new CustomOrder()
            {
                Image = model.Image,
                Size = model.Size,
                IsSourcable = false,
                CustomName = model.CustomName,
                CustomNumber = model.CustomNumber,
                Quantity = model.Quantity,
                Name = model.Name,
                Id = userId,
                //assign order status of placed
                CustomOrderStatusId= 1,

            };

            await _appDbContext.customOrders.AddAsync(customOrder);
            await _appDbContext.SaveChangesAsync();

            return customOrder;
        }

        public async Task<WishlistVM> AddToWishlist(WishlistVM model)
        {
            var kitId = await _appDbContext.kits.Where(k=> k.Name == model.KitName)
                        .Select(k=> k.KitId).FirstOrDefaultAsync();

            var userId = await _appDbContext.Users.Where(u => u.Id == model.Id)
                        .Select(u=> u.Id).FirstOrDefaultAsync();

            UserWishlist userWishlist = new UserWishlist()
            {
                KitId = kitId,
                Id = userId
            };

            _appDbContext.UserWishlists.Add(userWishlist);
            await _appDbContext.SaveChangesAsync();

            return model;
        }

        public Task<List<KitVM>> GetWishList(string userId)
        {
            var user = _appDbContext.Users.FirstOrDefault(x => x.Id == userId);
            if (user == null)
            {
                return null;
            }

            var wishlist = _appDbContext.UserWishlists.Where(x => x.Id == userId)
                .Include(x => x.Kit)
                .Select(x=> new KitVM { FrontImage = x.Kit.FrontImage, Name = x.Kit.Name, Price = x.Kit.Price}).ToListAsync();

            if(wishlist == null)
            {
                return null;
            }

            return wishlist;
  
        }

        public CartTotalVM GetCartTotal(List<CartVM> model)
        {
            var totalPrice = 0;
            foreach (var item in model)
            {
                var kit = _appDbContext.kits.Where(k => k.Name == item.KitName).FirstOrDefault();
                if(item.IsCustomed == true)
                {
                    //fixed price for customed kits
                    totalPrice += (kit.Price+50) * item.Quantity;
                }
                else
                {
                    totalPrice += kit.Price * item.Quantity;
                }
            }   

            CartTotalVM cartTotal = new CartTotalVM()
            {
                Total = totalPrice
            };

            return cartTotal;
            
        }
        public List<CustomOrderVM> GetAllCustomOrders()
        {
            var customOrders= _appDbContext.customOrders.Include(u=> u.User)
                .Select(cu=> new CustomOrderVM 
                {Id =cu.Id, Image=cu.Image, Quantity=cu.Quantity, CustomName =cu.CustomName,
                 CustomNumber= cu.CustomNumber, IsSourcable=false, User = cu.User,
                Size= cu.Size, Name = cu.Name}).
                Where(cu=> cu.IsSourcable == false).
                ToList();

            var userIds = customOrders.Select(cu => cu.Id).ToList();
            foreach (var item in userIds)
            {
                var user = _appDbContext.Users.Where(u => u.Id == item).FirstOrDefault();
                if(user != null)
                {
                    var userOrders = customOrders.Where(cu => cu.Id == item).ToList();
                    foreach (var order in userOrders)
                    {
                        order.User = user;
                    }
                }
            }   


            if(customOrders == null)
            {
                return null;
            }
            return customOrders;
        }
    }
}
