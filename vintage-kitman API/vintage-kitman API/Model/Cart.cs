using System.ComponentModel.DataAnnotations.Schema;

namespace vintage_kitman_API.Model
{
    public class Cart
    {
        public Guid CartId { get; set; }
        [ForeignKey("User")]
        public string Id { get; set; }
        //navigation
        public User User { get; set; }
        
    }
}
