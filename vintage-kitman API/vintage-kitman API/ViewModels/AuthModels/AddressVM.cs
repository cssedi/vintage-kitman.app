using vintage_kitman_API.Model;

namespace vintage_kitman_API.ViewModels.AuthModels
{
    public class AddressVM
    {
        public string Name { get; set; }
        public string PostalAddress { get; set; }
        public bool IsMain { get; set; }
        public string Id { get; set; }
        //navigation
        public User User { get; set; }
    }
}
