namespace vintage_kitman_API.Model
{
    public class Kit
    {
        public int KitId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int TeamId { get; set; }
        public int SizeId { get; set; }
        //navigation
        public Team Team { get; set; }
        public ICollection<Size> Sizes { get; set; }
        public ICollection<KitOrders> kitOrders { get; set; }


    }
}
