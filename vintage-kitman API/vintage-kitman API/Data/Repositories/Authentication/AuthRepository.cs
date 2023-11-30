using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using vintage_kitman_API.Model;
using vintage_kitman_API.ViewModels;

namespace vintage_kitman_API.Data.Repositories.Authentication
{
    public class AuthRepository : IAuthRepository
    {

        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public AuthRepository(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }
 

        public async Task<UserManagerReponse> LoginUserAsync(LoginVM loginVM)
        {
            // Find the user 
            var user = await _userManager.FindByEmailAsync(loginVM.email);
            if (user == null)
            {
                //return response if email not found in the database
                return new UserManagerReponse
                {
                    Message = "There is no user with this email",
                    isSuccess = false,
                };
            }
            else
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                if (userRoles.Contains("ADMIN"))
                {
                    //return response if email not found in the database
                    return new UserManagerReponse
                    {
                        Message = "Not Authroized",
                        isSuccess = false,
                    };
                }
            //check if the password is correct
                var result = await _userManager.CheckPasswordAsync(user, loginVM.password);
                if (!result)
                {
                    //return response if the password is incorrect
                    return new UserManagerReponse
                    {
                        Message = "Password is not valid",
                        isSuccess = false
                    };
                }
                // Create a claims 
                var claims = new[]
                {
                    new Claim(ClaimTypes.Role, "CHALLENGER"),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Surname, user.surname),
                };

                //Create the the singin in key 
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));

                // Create a token 
                var token = new JwtSecurityToken
                (
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddDays(30),
                    signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );

                string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                return new UserManagerReponse
                {
                    token = tokenString,
                    isSuccess = true,
                    Date = DateTime.Now,
                    username = user.UserName,
                    email = user.Email,
                    name = user.Name,
                    surname = user.surname,
                };
            }
        }

        public Task<UserManagerReponse> RegisterUserAsync(RegisterVM registerVM)
        {
            throw new NotImplementedException();
        }
    }
}
