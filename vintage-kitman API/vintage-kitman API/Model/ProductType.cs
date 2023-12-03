namespace vintage_kitman_API.Model
{
    public class ProductType
    {
        public int ProductTypeId { get; set; }
        public string Name { get; set; }
        public string? SizeChart { get; set; }

        //navigtaion
        public ICollection<Kit> Kits { get; set; }
    }
}
