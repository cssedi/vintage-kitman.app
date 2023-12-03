namespace vintage_kitman_API.Model
{
    public class Size
    {
        public int SizeId { get; set; }
        public string Name { get; set; }
        //navigation
        public ICollection<KitOrders> Kits { get; set; }
    }
}
