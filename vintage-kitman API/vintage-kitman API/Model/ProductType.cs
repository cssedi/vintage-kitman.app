namespace vintage_kitman_API.Model
{
    public class ProductType
    {
        public int ProductTypeId { get; set; }
        public string Name { get; set; }
        //navigtaion
        public ICollection<Size> Sizes { get; set; }
    }
}
