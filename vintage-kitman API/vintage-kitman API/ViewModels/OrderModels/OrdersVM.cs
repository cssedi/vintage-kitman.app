using vintage_kitman_API.Model;

namespace vintage_kitman_API.ViewModels.OrderModels
{
    public class OrdersVM
    {
        public int OrderId { get; set; }
        public string? CustomName { get; set; }
        public int? CustomNumber { get; set; }
        public int OrderStatusId { get; set; }

        public string Id { get; set; }
        //navigation
        public User User { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public ICollection<KitOrders> kitOrders { get; set; }
    }
}
