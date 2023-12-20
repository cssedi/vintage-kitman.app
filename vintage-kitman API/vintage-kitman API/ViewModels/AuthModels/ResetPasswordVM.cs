using System.ComponentModel.DataAnnotations;

namespace vintage_kitman_API.ViewModels.AuthModels
{
    public class ResetPasswordVM
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Token { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
        public string? Message { get; set; }
    }
}
