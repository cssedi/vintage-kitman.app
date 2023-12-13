namespace vintage_kitman_API.Model
{
    public class CartItems
    {
        public int CartId { get; set; }
        public int KitId { get; set; }
        public int SizeId { get; set; }
        public int Quantity { get; set; }
        public string? CustomName { get; set; }
        public int? CustomNumber { get; set; }
        //navigation
        public Cart Cart { get; set; }
        public Kit Kit { get; set; }
        public Size Size { get; set; }
    }
}
