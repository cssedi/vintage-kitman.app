using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace vintage_kitman_API.Model
{
    public class CustomOrder
    {
        [Key]
        public int CustomOrderId { get; set; }
        public string Size { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public bool? IsSourcable { get; set; }
        public string? CustomName { get; set; }
        public int? CustomNumber { get; set; }
        public string Id { get; set; }
        public int CustomOrderStatusId { get; set; }
        //navigation
        public User User { get; set; }
        public CustomOrderStatus CustomOrderStatus { get; set; }

    }
}
