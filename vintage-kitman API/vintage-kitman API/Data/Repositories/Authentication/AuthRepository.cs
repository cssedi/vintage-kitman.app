using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using Org.BouncyCastle.Asn1.X509;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Xml.Linq;
using vintage_kitman_API.Model;
using vintage_kitman_API.ViewModels.AuthModels;
using static System.Net.Mime.MediaTypeNames;

namespace vintage_kitman_API.Data.Repositories.Authentication
{
    public class AuthRepository : IAuthRepository
    {

        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole> _roleManager;


        public AuthRepository(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
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
                    email = user.Email,
                    name = user.Name,
                    surname = user.surname,
                };
            }
        }

        public Task<UserManagerReponse> RegisterUserAsync(RegisterVM registerVM)
        {


            //send email confirmation
            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(_configuration["MailConfig:Email"]));
            message.Subject = "Account Created";

            var body=@$"<!DOCTYPE html>
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
                                                        <td style='padding: 10px; text-align: left; font-size: 14px; line-height: 140%;'>Dear {{registerVM.name}},</td>
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

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, false);
                client.Authenticate(_configuration["Mail:Email"], _configuration["Mail:Password"]);
                client.Send(message);
                client.Disconnect(true);
            }






            message.To.Add(MailboxAddress.Parse(registerVM.email));
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
    }
}
