namespace vintage_kitman_API.Model
{
    public class OrderStatus
    {
        public int OrderStatusId { get; set; }
        public string Name { get; set; }
        //navigation
        public ICollection<Orders> Orders { get; set; }
    }
}
