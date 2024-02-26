using System.ComponentModel.DataAnnotations;

namespace vintage_kitman_API.Model
{
    public class Address
    {
        [Key]
        public int AddressId { get; set; }
        public string AddressName1 { get; set; }
        public string AddressName2 { get; set; }
        public string Province { get; set; }
        public string ZipCode { get; set; }
        public string Name { get; set; }
        public string? BuildingName { get; set; }
        public string? UnitNumber { get; set; }
        public bool IsMain { get; set; } 
        //map this as a foreign key to the user table
        public string UserId { get; set; }
        //navigation
        public User User { get; set; }

    }
}
