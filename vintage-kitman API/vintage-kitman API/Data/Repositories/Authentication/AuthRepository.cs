using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using MimeKit.Text;
using Org.BouncyCastle.Asn1.X509;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Xml.Linq;
using vintage_kitman_API.Model;
using vintage_kitman_API.NewFolder;
using vintage_kitman_API.ViewModels.AuthModels;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace vintage_kitman_API.Data.Repositories.Authentication
{
    public class AuthRepository : IAuthRepository
    {

        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AppDbContext _appDbContext;


        public AuthRepository(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration,
                                RoleManager<IdentityRole> roleManager, AppDbContext appDbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
            _appDbContext = appDbContext;
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
                //if user is admin
                if (userRoles.Contains("ADMIN"))
                {
                    // Create a claims 
                    var claims = new[]
                    {
                    new Claim(ClaimTypes.Role, "ADMIN"),
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
                        Role= "ADMIN",
                        email = user.Email,
                        name = user.Name,
                        surname = user.surname,
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
                else
                {
                    // Create a claims 
                    var claims = new[]
                    {
                    new Claim(ClaimTypes.Role, "CUSTOMER"),
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
                        Role = "CUSTOMER",
                        email = user.Email,
                        name = user.Name,
                        surname = user.surname,
                    };
                }

            }
        }

        public async Task<UserManagerReponse> RegisterUserAsync(RegisterVM registerVM)
        {
            if (!await _roleManager.RoleExistsAsync("CUSTOMER"))
            {
                // Create the "CUSTOMER" role if it doesn't exist
                await _roleManager.CreateAsync(new IdentityRole("CUSTOMER"));
            }

            var customer = new User
            {
                UserName = registerVM.email.Substring(0, registerVM.email.IndexOf("@")),
                Email = registerVM.email,
                Name = registerVM.name,
                surname = registerVM.surname,
            };

            var existingUsername = await _appDbContext.Users.AnyAsync(u => u.UserName == customer.UserName);
            var existingEmail = await _appDbContext.Users.AnyAsync(u => u.Email == customer.Email);

            if (existingUsername)
            {
                return new UserManagerReponse
                {
                    Message = "Existing user with this email",
                    isSuccess = false,
                };
            }

            if (existingEmail)
            {
                return new UserManagerReponse
                {
                    Message = "Existing user with this email",
                    isSuccess = false,
                };
            }

            var result = await _userManager.CreateAsync(customer, registerVM.password);

            if (result.Succeeded)
            {
                // Generate and send email confirmation token
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(customer);

                // Send email confirmation
                if (!string.IsNullOrEmpty(token))
                {
                    var confirmationLink = $"{_configuration["AppBaseUrl"]}/Account/ConfirmEmail?userId={customer.Id}&token={WebUtility.UrlEncode(token)}";

                    // Continue with your email sending logic using confirmationLink
                    //send email confirmation
                    var message = new MimeMessage();
                    message.From.Add(MailboxAddress.Parse(_configuration["EmailConfig:Username"]));
                    message.To.Add(MailboxAddress.Parse(registerVM.email));
                    message.Subject = "Account Created";

                    var body = @$"<!DOCTYPE html>
                        <html lang='en'>
                        <head>
                            <meta charset='UTF-8'>
                            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                            <title>Account Registration Confirmation</title>
                        </head>
                        <body style='margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f7f7f7; color: #000000; font-family: Arial, Helvetica, sans-serif;'>

                            <table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f7f7f7; width:100%;' cellpadding='0' cellspacing='0'>
                                <tbody style=""text-align: center;"">
                                    <tr>
                                        <img src ='https://i.ibb.co/n3SX2cC/image-3.png' 
                                        style='background-color: #000000; height: 85px; margin: 0 auto; display: block; width: max-content; object-fit: contain;'/>
                                    </tr>
                                    <tr style='vertical-align: top;'>
                                        <td style='word-break: break-word; border-collapse: collapse !important; vertical-align: top;'>

                                            <!-- Email content starts here -->
                                            <h1 style='margin: 20px 10px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 26px; font-weight: 400;'>Account Registered!</h1>

                                            <table style='width:100%; border-collapse: collapse; margin: 20px 10px;' cellpadding='0' cellspacing='0'>
                                                <tbody>
                                                    <tr>
                                                        <td style='padding: 10px; text-align: left; font-size: 14px; line-height: 140%;'>Hi {registerVM.name}!,</td>
                                                    </tr>
                                                    <tr>
                                                        <td style='padding: 10px; text-align: left; font-size: 14px; line-height: 140%;'>Thanks for joining the Vintage Kitman family!</td>
                                                    </tr>
                                                    <tr>
                                                        <td style='padding: 10px; text-align: left; font-size: 14px; line-height: 140%;'>Before you can start ordering and building your collection, we'd like for you to confirm your account here:</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style='width:100%; border-collapse: collapse; margin: 10px;' cellpadding='0' cellspacing='0'>
                                                <tbody>
                                                    <tr>
                                                        <td style='padding: 10px; text-align: center;'>
                                                            <a href='' target='_blank' style='text-decoration: none; color: #ffffff; background-color: #000000; padding: 12px 40px; border-radius: 4px; display: inline-block; font-size: 14px; line-height: 120%;'>Confirm Account</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style='width:100%; border-collapse: collapse; margin: 10px;' cellpadding='0' cellspacing='0'>
                                                <tbody>
                                                    <tr>
                                                        <td style='padding: 10px; text-align: left; font-size: 14px; line-height: 140%;'>If you didn't create an account with us, please ignore this email.</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- Email content ends here -->

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </body>
                        </html>
                        ";

                    var bodyBuilder = new BodyBuilder();
                    bodyBuilder.TextBody = body;
                    message.Body = new TextPart(TextFormat.Html) { Text = body };

                    using (var client = new SmtpClient())
                    {
                        client.Connect("smtp.gmail.com", 587, false);
                        client.Authenticate(_configuration["EmailConfig:Username"], _configuration["EmailConfig:Password"]);
                        client.Send(message);
                        client.Disconnect(true);
                    }



                    return new UserManagerReponse
                    {
                        Message = "User created successfully! Please check your email for confirmation.",
                        isSuccess = true,
                    };
                }
                else
                {
                    // Handle token generation failure
                    return new UserManagerReponse
                    {
                        Message = "Failed to generate email confirmation token.",
                        isSuccess = false,
                    };
                }
            }
            else
            {
                // Handle user creation failure
                return new UserManagerReponse
                {
                    Message = "User creation failed.",
                    isSuccess = false,
                };
            }
        }

        public async Task<UserManagerReponse> AdminLoginAsync(LoginVM loginVM)
        {
            // Find the user 
            var user = await _userManager.FindByEmailAsync(loginVM.email);

            var roles = await _userManager.GetRolesAsync(user);

            if (roles.Contains("ADMIN"))
            {
                // Create a claims 
                var claims = new[]
                {
                    new Claim(ClaimTypes.Role, "ADMIN"),
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
            else
            {
                return new UserManagerReponse
                {
                    Message = "Not Authroized",
                    isSuccess = false,
                };
            }
               
        }

        public async Task<UserManagerReponse> SeedAdmins()
        {
            if (!await _roleManager.RoleExistsAsync("ADMIN"))
            {
                // Create the ADMIN role
                await _roleManager.CreateAsync(new IdentityRole("ADMIN"));
            }
            var Owner = new User
            {
                Name = "Ntobeko",
                UserName = "tobacz086",
                Email = "tobacz086@gmail.com",
                surname = "Ntombela",         
            };

            var result = await _userManager.CreateAsync(Owner, "PotLuck#182");

            if (!result.Succeeded)
            {
                return new UserManagerReponse { isSuccess = false, Message= result.Errors.ToString() };
            }

            await _userManager.AddToRoleAsync(Owner, "ADMIN");

            var admin = new User
            {
                Name = "Vintage",
                UserName = "vintagekitman",
                Email = "VintageKitman1@gmail.com",
                surname = "Kitman",
            };

            var result1 = await _userManager.CreateAsync(admin, "PotLuck#182");

            if (!result1.Succeeded)
            {
                return new UserManagerReponse { isSuccess = false, Message = result1.Errors.ToString() };
            }
            await _userManager.AddToRoleAsync(admin, "ADMIN");


            return new UserManagerReponse { isSuccess = true, Message = "Admins seeded" };

        }

        public async Task<RequestPasswordResetVM> ResetPasswordAsync(RequestPasswordResetVM vm)
        {
            var user = await _userManager.FindByEmailAsync(vm.email);
            if (user == null)
            {
                return new RequestPasswordResetVM { email = vm.email, Message = vm.Message = " Email not found" };
            }
            else
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var userId = user.Id; // get user ID
                var callbackUrl = "http://localhost:4200/reset-password/?token=" + Uri.EscapeDataString(token) + "&userId=" + Uri.EscapeDataString(userId);

                var body = $@"<!DOCTYPE html>
                <html>
                <head>
                  <title>Forgot Password</title>
                </head>
                <body>
                  <div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; border-radius: 15px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); background-color: #f8f8f8;'>
                    <tbody style='text-align: center;width:100%;margin-bottom: 30px; background-color: #000000;'>
                        <tr style='background-color: #000000;''>
                            <img src ='https://i.ibb.co/n3SX2cC/image-3.png' 
                            style='background-color: #000000; height: 85px; margin: 0 auto; display: block; width: max-content; object-fit: contain;'/>
                        </tr>
                    </tbody>
                    <div style='text-align: center; font-size: 24px; margin-bottom: 30px;margin-top: 10px;'>Forgot Your Password?</div>
                    <p>Hi {user.Name} {user.surname} ,</p>
                    <p>No worries, we've got you covered. Click the link below to reset your password:</p>
                    <p>
                      <a href='{callbackUrl}' target='_blank' style='display: block; text-align: center; background-color: #000; color: #fff; text-decoration: none; font-weight: bold; padding: 12px 20px; border-radius: 5px;'>Click here to reset</a>
                    </p>
                    <p>If you did not make this request or made it by mistake, please ignore this email. Your password will remain the same.</p>
                    <div style='text-align: center; margin-top: 30px; color: #888;'>Thank you,<br> Vintage Kitman Team </div>
                  </div>
                </body>
                </html>";

                var message = new MimeMessage();
                message.From.Add(MailboxAddress.Parse(_configuration["EmailConfig:Username"]));
                message.To.Add(new MailboxAddress("", vm.email));
                message.Subject = "Forgot Password";

                var bodyBuilder = new BodyBuilder();
                bodyBuilder.TextBody = body;
                message.Body = new TextPart(TextFormat.Html) { Text = body };

                using (var client = new SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 587, false);
                    client.Authenticate(_configuration["EmailConfig:Username"], _configuration["EmailConfig:Password"]);
                    client.Send(message);
                    client.Disconnect(true);
                }
            }
            return new RequestPasswordResetVM { email = vm.email, Message = vm.Message = " Email sent to customer" };

        }
    }
}
