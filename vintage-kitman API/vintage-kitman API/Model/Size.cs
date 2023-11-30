namespace vintage_kitman_API.Model
{
    public class Size
    {
        public int SizeId { get; set; }
        public string name { get; set; }
        public int ProductTypeId { get; set; }
        //navigation
        public ProductType ProductType { get; set; }
        public ICollection<Kit> Kits { get; set; }
    }
}
