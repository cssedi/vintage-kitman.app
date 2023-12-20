using System.ComponentModel.DataAnnotations;

namespace vintage_kitman_API.ViewModels.AuthModels
{
    public class RequestPasswordResetVM
    {
        [Required]
        [EmailAddress]
        public string email { get; set; }
        public string? Message { get; set; }
    }
}
