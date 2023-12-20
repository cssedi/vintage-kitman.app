using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace vintage_kitman_API.Model
{
    public class Wishlist
    {
        [Key]
        public int WishListId { get; set; }
        public string Id { get; set; }
        //navigation
        public User User { get; set; }
        public ICollection<Kit> WishlistItems { get; set; }
    }
}
