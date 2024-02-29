using System.ComponentModel.DataAnnotations;

namespace vintage_kitman_API.Model
{
    public class Orders
    {
        [Key]
        public int OrderId { get; set; }
        public string? CustomName { get; set; }
        public int? CustomNumber { get; set; }
        public string orderNumber { get; set; }
        public int OrderStatusId { get; set; }
        public DateTime OrderDate { get; set; }
        public string UserId { get; set; }
        //navigation
        public User User { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public ICollection<KitOrders> kitOrders { get; set; }
    }
}
