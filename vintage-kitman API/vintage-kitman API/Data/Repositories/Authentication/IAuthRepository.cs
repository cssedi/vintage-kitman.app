using vintage_kitman_API.ViewModels.AuthModels;

namespace vintage_kitman_API.Data.Repositories.Authentication
{
    public interface IAuthRepository
    {
        public Task<UserManagerReponse> RegisterUserAsync(RegisterVM registerVM);
        public Task<UserManagerReponse> LoginUserAsync(LoginVM loginVM);
        public Task<UserManagerReponse> AdminLoginAsync(LoginVM loginVM);
        public Task<UserManagerReponse> SeedAdmins();
        public Task<RequestPasswordResetVM> ForgetPasswordAsync(RequestPasswordResetVM model);
        public Task<ResetPasswordVM> ResetPasswordAsync(ResetPasswordVM model);
    }
}
