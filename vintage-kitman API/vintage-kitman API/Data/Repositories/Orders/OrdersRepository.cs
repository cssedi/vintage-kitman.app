using vintage_kitman_API.Model;
using vintage_kitman_API.NewFolder;
using vintage_kitman_API.ViewModels;
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

        public Task<CustomOrder> CreateCustomOrder(CustomOrderVM model)
        {
            CustomOrder customOrder = new CustomOrder()
            {
                Image = model.Image,
                Size = model.Size,
                IsSourcable= model.IsSourcable,
                CustomName = model.CustomName,
                CustomNumber= model.CustomNumber,
                Id= model.Id
            };

            _appDbContext.customOrders.AddAsync(customOrder);
            
        }
    }
}
