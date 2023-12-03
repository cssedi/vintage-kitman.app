namespace vintage_kitman_API.Model
{
    public class Kit
    {
        public int KitId { get; set; }
        public string Name { get; set; }
        public string FrontImage { get; set; }
        public int Price { get; set; }
        public int TeamId { get; set; }
        public int ProductTypeId { get; set; }

        //navigation
        public ProductType ProductType { get; set; }
        public Team Team { get; set; }
        public ICollection<KitOrders> kitOrders { get; set; }


    }
}
