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
using vintage_kitman_API.ViewModels;

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
            if (!await _roleManager.RoleExistsAsync("CUSTOMER"))
            {
                // Create the challenger role
                await _roleManager.CreateAsync(new IdentityRole("CUSTOMER"));
            }
            //create a new customer
            var customer = new User
            {
                UserName = model.username,
                Email = model.email,
                Name = model.name,
                surname = model.surname,
                PhoneNumber = model.phoneNumber,

            };

            //check if username or email already exists
            var existingUsername = await _appDbContext.Users
                .AnyAsync(u => u.UserName == customer.UserName);

            var existingEmail = await _appDbContext.Users
                .AnyAsync(u => u.Email == customer.Email);

            if (existingUsername)
            {
                return BadRequest(new { Message = "Username already taken" });
            }

            if (existingEmail)
            {
                return BadRequest(new { Message = "Email already taken" });
            }

            //check if user registration is successful
            var result = await _userManager.CreateAsync(customer, model.password);

            if (result.Succeeded)
            {
                //genrate Confirmation token
                //var token = await _userManager.GenerateEmailConfirmationTokenAsync(customer);
                //if (!string.IsNullOrEmpty(token))
                //{

                //}

                //send email
            }
            else
            {
                return BadRequest(new { Message = result.Errors });
            }

            await _userManager.AddToRoleAsync(customer, "CUSTOMER");


            return Ok(new { token = GenerateToken(customer) });
        }

        [HttpPost("CustomerLogin")]
        public async Task<IActionResult> CustomerLogin(LoginVM model)
        {
            var results = await _authRepository.LoginUserAsync(model);

                if (!results.isSuccess)
                {
                    return BadRequest(results);
                }
                else
                {
                    return Ok(new { token = results.token });
                }
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
