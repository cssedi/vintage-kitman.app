using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Asn1.Cmp;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using vintage_kitman_API.Data.Repositories.Authentication;
using vintage_kitman_API.Model;
using vintage_kitman_API.NewFolder;
using vintage_kitman_API.ViewModels.AuthModels;

namespace vintage_kitman_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AppDbContext _appDbContext;
        private readonly IConfiguration _configuration;
        private readonly IAuthRepository _authRepository;

        public AuthController( UserManager<User> userManager, SignInManager<User> signInManager,
                RoleManager<IdentityRole> roleManager,AppDbContext appDbContext,
                IConfiguration configuration, IAuthRepository authRepository)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _appDbContext = appDbContext;
            _configuration = configuration;
            _authRepository = authRepository;

        }
        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterVM model)
        {
            try
            {
                var result = await _authRepository.RegisterUserAsync(model);

                if (result.isSuccess)
                {
                    // User registration successful, extract the user information
                    User user = new User()
                    {
                        Email = model.email,
                        UserName = model.email.Substring(0, model.email.IndexOf("@")),
                        Name = model.name,
                        surname = model.surname
                    };

                    // Generate a token using the user information
                    var token = GenerateToken(user);
                    //create new wishlist for user

                    await _appDbContext.SaveChangesAsync();

                    // Return a success response with a token
                    return Ok(new { token });
                }
                else
                {
                    // User registration failed, return an error response
                    return BadRequest(new { message = result.Message });
                }
            }
            catch (Exception ex)
            {
                // Handle unexpected exceptions
                return StatusCode(500, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpPost("UserLogin")]
        public async Task<IActionResult> UserLogin(LoginVM model)
        {
            var results = await _authRepository.LoginUserAsync(model);

                if (!results.isSuccess)
                {
                    return BadRequest(results);
                }
                else
                {
                    return Ok(new { token = results.token, role = results.Role });
                }
        }

        [HttpPost("AdminLogin")]
        public async Task<IActionResult> AdminLogin(LoginVM model)
        {
            var results = await _authRepository.AdminLoginAsync(model);

            if (!results.isSuccess)
            {
                return BadRequest(results);
            }
            else
            {
                return Ok(new { token = results.token });
            }
        }

        [HttpPost("SeedAdmins")]
        public async Task<IActionResult> SeedAdmins()
        {
            var admins= await _authRepository.SeedAdmins();

            if (admins.isSuccess)
            {
                return Ok(admins);
            }
            else
            {
                return BadRequest(new {message= "an error occured in seeding admins"});
            }
        }

        [HttpPost("ForgotPassword/{email}")]
        public async Task<IActionResult> ForgotPassword(RequestPasswordResetVM model)
        {
            var result = await _authRepository.ResetPasswordAsync(model);   

            return Ok(result);
        }

        private string GenerateToken(User customer)
        {
            // Create a claims 
            var claims = new[]
            {
                    new Claim(ClaimTypes.Role, "Challenger"),
                    new Claim(ClaimTypes.Email, customer.Email),
                    new Claim(ClaimTypes.NameIdentifier, customer.Id.ToString()),
                    new Claim(ClaimTypes.Name, customer.Name),
                    new Claim(ClaimTypes.Surname, customer.surname),


             };
            // var tokenHandler = new JwtSecurityTokenHandler();
            //var key = Encoding.ASCII.GetBytes(_configuration["Jwt:SecretKey"]);
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

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
