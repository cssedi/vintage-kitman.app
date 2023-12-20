namespace vintage_kitman_API.Model
{
    public class UserWishlist
    {
        public int KitId { get; set; }
        public string Id { get; set; }
        public User User { get; set; }
        public Kit Kit { get; set; }
    }
}
