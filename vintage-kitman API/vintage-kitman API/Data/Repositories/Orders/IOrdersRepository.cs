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
        public Task<List<KitVM>> GetWishList(string userId);
        public CartTotalVM GetCartTotal(List<CartVM> model);

    }
}
