namespace vintage_kitman_API.ViewModels.AuthModels
{
    public class UserManagerReponse
    {
        public string token { get; set; }
        public string? Message { get; internal set; }
        public string Role { get; set; }
        public bool isSuccess { get; internal set; }
        public DateTime Date { get; internal set; }

        public string? username { get; set; }

        public string? name { get; set; }
        public string? password { get; set; }

        public string? email { get; set; }

        public string surname { get; set; }
    }
}
