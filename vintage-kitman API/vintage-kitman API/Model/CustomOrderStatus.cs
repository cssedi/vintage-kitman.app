namespace vintage_kitman_API.Model
{
    public class CustomOrderStatus
    {
        public int CustomOrderStatusId { get; set; }
        public string Name { get; set; }
        public ICollection<CustomOrder> CustomOrders { get; set; }
    }
}
