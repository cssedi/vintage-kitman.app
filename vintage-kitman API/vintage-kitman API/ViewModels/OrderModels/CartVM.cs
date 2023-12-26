namespace vintage_kitman_API.ViewModels.OrderModels
{
    public class CartVM
    {
        public string KitName { get; set; }
        public string KitImage { get; set; }
        public int KitPrice { get; set; }
        public int Quantity { get; set; }
        public bool IsCustomed { get; set; }
        public string CustomName { get; set; }
        public int? CustomNumber { get; set; }
        public string SizeId { get; set; }
    }
}
