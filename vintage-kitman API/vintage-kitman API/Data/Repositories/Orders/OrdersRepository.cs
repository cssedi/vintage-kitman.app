using vintage_kitman_API.NewFolder;
using vintage_kitman_API.ViewModels;

namespace vintage_kitman_API.Data.Repositories.Orders
{
    public class OrdersRepository : IOrdersRepository
    {
        private readonly AppDbContext _appDbContext;
        public OrdersRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
    }
}
