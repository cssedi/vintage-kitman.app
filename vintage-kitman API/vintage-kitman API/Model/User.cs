using Microsoft.AspNetCore.Identity;

namespace vintage_kitman_API.Model
{
    public class User:IdentityUser
    {
        public string Name { get; set; }
        public string surname { get; set; }
        public string Address { get; set; }

        public ICollection<CustomOrder> CustomOrders { get; set; }
        public Wishlist Wishlist { get; set; }
    }
}
