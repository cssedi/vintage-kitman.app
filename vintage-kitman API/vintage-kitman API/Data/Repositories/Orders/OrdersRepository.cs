using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MimeKit.Text;
using System.Net;
using System.Security.Claims;
using vintage_kitman_API.Model;
using vintage_kitman_API.NewFolder;
using vintage_kitman_API.ViewModels;
using vintage_kitman_API.ViewModels.CategoriesModels;
using vintage_kitman_API.ViewModels.OrderModels;

namespace vintage_kitman_API.Data.Repositories.Orders
{
    public class OrdersRepository : IOrdersRepository
    {
        private readonly AppDbContext _appDbContext;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public OrdersRepository(AppDbContext appDbContext, UserManager<User> userManager, IConfiguration configuration)
        {
            _appDbContext = appDbContext;
            _userManager = userManager;
            _configuration = configuration;
        }

        [Authorize(Roles = "Customer", AuthenticationSchemes ="Bearer")]
        public async Task<CustomOrder> CreateCustomOrder(CustomOrderVM model, string userId)
        {
            //get user
            var user = _appDbContext.Users.FirstOrDefault(x => x.Id == userId);

            CustomOrder customOrder = new CustomOrder()
            {
                Image = model.Image,
                Size = model.Size,
                IsSourcable = false,
                CustomName = model.CustomName,
                CustomNumber = model.CustomNumber,
                Quantity = model.Quantity,
                Name = model.Name,
                Id = userId,
                //assign order status of placed
                CustomOrderStatusId= 1,

            };

            await _appDbContext.customOrders.AddAsync(customOrder);
            await _appDbContext.SaveChangesAsync();

            return customOrder;
        }

        public async Task<WishlistVM> AddToWishlist(WishlistVM model)
        {
            var kitId = await _appDbContext.kits.Where(k=> k.Name == model.KitName)
                        .Select(k=> k.KitId).FirstOrDefaultAsync();

            var userId = await _appDbContext.Users.Where(u => u.Id == model.Id)
                        .Select(u=> u.Id).FirstOrDefaultAsync();

            UserWishlist userWishlist = new UserWishlist()
            {
                KitId = kitId,
                Id = userId
            };

            _appDbContext.UserWishlists.Add(userWishlist);
            await _appDbContext.SaveChangesAsync();

            return model;
        }

        public Task<List<KitVM>> GetWishList(string userId)
        {
            var user = _appDbContext.Users.FirstOrDefault(x => x.Id == userId);
            if (user == null)
            {
                return null;
            }

            var wishlist = _appDbContext.UserWishlists.Where(x => x.Id == userId)
                .Include(x => x.Kit)
                .Select(x=> new KitVM { FrontImage = x.Kit.FrontImage, Name = x.Kit.Name, Price = x.Kit.Price}).ToListAsync();

            if(wishlist == null)
            {
                return null;
            }

            return wishlist;
  
        }

        public CartTotalVM GetCartTotal(List<CartVM> model)
        {
            var totalPrice = 0;
            foreach (var item in model)
            {
                var kit = _appDbContext.kits.Where(k => k.Name == item.KitName).FirstOrDefault();
                if(item.IsCustomed == true)
                {
                    //fixed price for customed kits
                    totalPrice += (kit.Price+50) * item.Quantity;
                }
                else
                {
                    totalPrice += kit.Price * item.Quantity;
                }
            }   

            CartTotalVM cartTotal = new CartTotalVM()
            {
                Total = totalPrice
            };

            return cartTotal;
            
        }
        public List<CustomOrderVM> GetAllCustomOrders()
        {
            var customOrders= _appDbContext.customOrders.Include(u=> u.User)
                .Select(cu=> new CustomOrderVM 
                {CustomOrderId = cu.CustomOrderId ,Id =cu.Id, Image=cu.Image, Quantity=cu.Quantity, CustomName =cu.CustomName,
                 CustomNumber= cu.CustomNumber, IsSourcable=false, User = cu.User,
                Size= cu.Size, Name = cu.Name, IsReviewed = cu.IsReviewed}).
                Where(cu=> cu.IsReviewed == false).
                ToList();

            var userIds = customOrders.Select(cu => cu.Id).ToList();
            foreach (var item in userIds)
            {
                var user = _appDbContext.Users.Where(u => u.Id == item).FirstOrDefault();
                if(user != null)
                {
                    var userOrders = customOrders.Where(cu => cu.Id == item).ToList();
                    foreach (var order in userOrders)
                    {
                        order.User = user;
                    }
                }
            }   


            if(customOrders == null)
            {
                return null;
            }
            return customOrders;
        }

        public CustomOrder AcceptCustomOrder(CustomOrderVM model)
        {
            var customOrder = _appDbContext.customOrders.Where(co=> co.CustomOrderId == model.CustomOrderId).FirstOrDefault();

            User user = _appDbContext.Users.Where(u=> u.Id == customOrder.Id).FirstOrDefault();

            customOrder.IsSourcable = true;
            customOrder.Message = model.Message;
            customOrder.IsReviewed = true;
            customOrder.CustomOrderStatusId = 2;

            // Continue with your email sending logic using confirmationLink
            if(user != null && customOrder != null)
            {
                var link = "http://localhost:4200/my-orders";
                //send email confirmation
                var message = new MimeMessage();
                message.From.Add(MailboxAddress.Parse(_configuration["EmailConfig:Username"]));
                message.To.Add(MailboxAddress.Parse(user.Email));
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
                                                        <td style='padding: 10px; text-align: left; font-size: 14px; line-height: 140%;'>Hi {user.Name}!,</td>
                                                    </tr>
                                                    <tr>
                                                        <td style='padding: 10px; text-align: left; font-size: 14px; line-height: 140%;'>Your Custom Order for {customOrder.Name} has been sourced.</td>
                                                    </tr>
                                                    <tr>
                                                        <td style='padding: 10px; text-align: left; font-size: 14px; line-height: 140%;'> Please log into your account to find more information below</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style='width:100%; border-collapse: collapse; margin: 10px;' cellpadding='0' cellspacing='0'>
                                                <tbody>
                                                    <tr>
                                                        <td style='padding: 10px; text-align: center;'>
                                                            <a href='{link}' target='_blank' style='text-decoration: none; color: #ffffff; background-color: #000000; padding: 12px 40px; border-radius: 4px; display: inline-block; font-size: 14px; line-height: 120%;'>
                                                             View Orders
                                                            </a>
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
            }


            _appDbContext.SaveChanges();

            return customOrder;
        }

        public CustomOrder RejectCustomOrder(CustomOrderVM model)
        {
            var customOrder = _appDbContext.customOrders.Where(co=> co.CustomOrderId == model.CustomOrderId).FirstOrDefault();

            customOrder.IsSourcable = false;
            customOrder.Message = model.Message;
            customOrder.IsReviewed = true;
            customOrder.CustomOrderStatusId=3;

            _appDbContext.SaveChanges();

            return customOrder;
        }

        public List<CustomOrderVM> GetUserCustomOrders(string userId)
        {
            var customOrders = _appDbContext.customOrders.Include(u => u.User)
                .Select(cu => new CustomOrderVM
                {
                    CustomOrderId = cu.CustomOrderId,
                    Id = cu.Id,
                    Image = cu.Image,
                    Quantity = cu.Quantity,
                    CustomName = cu.CustomName,
                    CustomNumber = cu.CustomNumber,
                    IsSourcable = cu.IsSourcable,
                    User = cu.User,
                    Size = cu.Size,
                    Name = cu.Name,
                    IsReviewed = cu.IsReviewed,
                    CustomOrderStatus = cu.CustomOrderStatus,
                    Message = cu.Message
                    
                }).
                Where(cu => cu.Id == userId).
                ToList();
            return customOrders;
        }


    }
}
