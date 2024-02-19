using System.ComponentModel.DataAnnotations;

namespace vintage_kitman_API.Model
{
    public class OnStockKits
    {
        [Key]
        public int OnStockKitId { get; set; }
        public string Name { get; set; }
        public string FrontImage { get; set; }
        public int Price { get; set; }
        public string Size { get; set; }
        public int Quantity { get; set; }
        public string Status { get; set; }
        public int ProductTypeId { get; set; }
        //navigtaion
        public ProductType ProductType { get; set; }


    }
}
