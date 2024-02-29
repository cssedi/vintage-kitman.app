using Microsoft.AspNetCore.Mvc;
using vintage_kitman_API.Model;
using vintage_kitman_API.ViewModels;
using vintage_kitman_API.ViewModels.CategoriesModels;
using vintage_kitman_API.ViewModels.OrderModels;

namespace vintage_kitman_API.Data.Repositories.Orders
{
    public interface IOrdersRepository
    {
        public Task<CustomOrder> CreateCustomOrder(CustomOrderVM model, string userId);
        public Task<WishlistVM> AddToWishlist(WishlistVM model);
        public Task<WishlistVM> RemoveFromWishlist(WishlistVM model);
        public Task<List<KitVM>> GetWishList(string userId);
        public CartTotalVM GetCartTotal(List<CartVM> model);
        public List<CustomOrderVM> GetAllCustomOrders();
        public CustomOrder AcceptCustomOrder(CustomOrderVM model);
        public CustomOrder RejectCustomOrder(CustomOrderVM model);

        public List<CustomOrderVM> GetUserCustomOrders(string userId);
        public List<KitOrderVM> GetUserOrders(string userId);
        public OnStockKits AddNewOnStockKit(OnStockKitVM model);
        public OnStockKits DeleteOnStockKit(OnStockKitVM model);
        public List<OnStockKitVM> GetOnStockKits();

        public List<OnStockKitVM> CustomerViewOnStockKits();
        public Task<KitOrderVM> createOrder(List<KitOrderVM> model, string userId);  
        //public Task<KitOrders> newKitOrder(KitOrderVM model);

        //get monthly orders
        public List<KitOrderVM> GetMonthlyOrders();




    }
}
