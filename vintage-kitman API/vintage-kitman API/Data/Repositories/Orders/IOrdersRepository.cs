using vintage_kitman_API.Model;
using vintage_kitman_API.ViewModels;
using vintage_kitman_API.ViewModels.OrderModels;

namespace vintage_kitman_API.Data.Repositories.Orders
{
    public interface IOrdersRepository
    {
        public Task<CustomOrder> CreateCustomOrder(CustomOrderVM model);
    }
}
