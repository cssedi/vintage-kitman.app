using vintage_kitman_API.Model;

namespace vintage_kitman_API.ViewModels.AuthModels
{
    public class AddressVM
    {
        public string AddressName1 { get; set; }
        public string AddressName2 { get; set; }
        public string Province { get; set; }
        public string ZipCode { get; set; }
        public string BuildingName { get; set; }
        public string UnitNumber { get; set; }
        public bool IsMain { get; set; }
        public string Id { get; set; }
        public User User { get; set; }
    }
}
