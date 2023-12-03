using System.ComponentModel.DataAnnotations;

namespace vintage_kitman_API.ViewModels.AuthModels
{
    public class RegisterVM
    {
        public string name { get; set; }
        public string surname { get; set; }
        [EmailAddress]
        public string email { get; set; }
        public string phoneNumber { get; set; }
        public string password { get; set; }
        public string username { get; set; }

    }
}
