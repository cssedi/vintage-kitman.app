namespace vintage_kitman_API.Model
{
    public class KitOrders
    {
        public int KitId { get; set; }
        public int OrderId { get; set; }
        public string Size { get; set; }
        public int Quantity { get; set; }
        public bool IsLongSleeve { get; set; }

        public DateTime OrderDate { get; set; }
        //navigation
        public Kit Kit { get; set; }
        public Orders Order { get; set; }
    }
}
