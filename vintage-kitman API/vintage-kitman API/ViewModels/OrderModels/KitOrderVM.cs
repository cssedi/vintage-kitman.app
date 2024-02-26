using vintage_kitman_API.Model;

namespace vintage_kitman_API.ViewModels.OrderModels
{
    public class KitOrderVM
    {
        public int KitId { get; set; }
        public int OrderId { get; set; }
        public string uniqueOrdenum { get; set; }
        public int OrderStatusId { get; set; }

        public string Id { get; set; }
        //kit props
        public string Name { get; set; }
        public string FrontImage { get; set; }
        public int Price { get; set; }
        public string Size { get; set; }
        public int Quantity { get; set; }
        public string? CustomName { get; set; }
        public int? CustomNumber { get; set; }
        public User User { get; set; }
        public OrderStatus OrderStatus { get; set; }
    }
}
