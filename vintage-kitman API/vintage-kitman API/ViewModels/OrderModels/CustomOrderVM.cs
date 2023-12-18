using vintage_kitman_API.Model;

namespace vintage_kitman_API.ViewModels.OrderModels
{
    public class CustomOrderVM
    {
        public int CustomOrderId { get; set; }
        public string Size { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Image { get; set; }
        public bool? IsSourcable { get; set; }
        public string? CustomName { get; set; }
        public int? CustomNumber { get; set; }
        public string Id { get; set; }
        //navigation
    }
}
