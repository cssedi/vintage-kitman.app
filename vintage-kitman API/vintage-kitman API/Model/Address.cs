using System.ComponentModel.DataAnnotations;

namespace vintage_kitman_API.Model
{
    public class Address
    {
        [Key]
        public int AddressId { get; set; }
        public string Name { get; set; }
        public string postalAddress { get; set; }
        public string Id { get; set; }
        //navigation
        public User User { get; set; }

    }
}
