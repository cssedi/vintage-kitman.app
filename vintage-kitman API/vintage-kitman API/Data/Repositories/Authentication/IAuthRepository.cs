using vintage_kitman_API.ViewModels;

namespace vintage_kitman_API.Data.Repositories.Authentication
{
    public interface IAuthRepository
    {
        public Task<UserManagerReponse> RegisterUserAsync(RegisterVM registerVM);
        public Task<UserManagerReponse> LoginUserAsync(LoginVM loginVM);
    }
}
