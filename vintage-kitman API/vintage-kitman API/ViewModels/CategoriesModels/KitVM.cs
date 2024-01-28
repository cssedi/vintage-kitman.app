using vintage_kitman_API.Model;

namespace vintage_kitman_API.ViewModels.CategoriesModels
{
    public class KitVM
    {
        public string Name { get; set; }
        public string FrontImage { get; set; }
        public int Price { get; set; }
        public ProductType productType { get; set; }
    }
}
