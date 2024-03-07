using vintage_kitman_API.Model;
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
        public Task<User> AdminGetUserDetails(string id);
        public Task<User> GetUserOrderDetails(string id);
        public Task<List<User>> GetAllUsers();
        public Task<AddressVM> AddAddress(string userId, AddressVM address);
        public Task<List<AddressVM>> GetAddressesAsync(string userId);
        public Task<AddressVM> SetMainAddress(Address model, string userId);
        public Task<AddressVM> DeleteAddress(int addressId);
        public Task<Address> GetMainAddress(string userId);
    }
}
