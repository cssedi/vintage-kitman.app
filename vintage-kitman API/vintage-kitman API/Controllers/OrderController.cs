using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using vintage_kitman_API.Data.Repositories.Orders;
using vintage_kitman_API.NewFolder;
using vintage_kitman_API.ViewModels.OrderModels;

namespace vintage_kitman_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class OrderController : ControllerBase
    {
        private readonly IOrdersRepository _ordersRepository;

        public OrderController(IOrdersRepository ordersRepository)
        {
            _ordersRepository = ordersRepository;
        }

        [Authorize(AuthenticationSchemes ="Bearer",Roles = "CUSTOMER")]
        [HttpPost("CreateCustomOrder")]
        public async Task<IActionResult> CreateCustomOrder(CustomOrderVM model)
        {
            //get user details
            var httppUser = HttpContext.User;
            var userId = httppUser.FindFirst(ClaimTypes.NameIdentifier)?.Value; // retrieve the user id  
            var order = await _ordersRepository.CreateCustomOrder(model, userId);

            if (order == null)
            {
                return NotFound(new { message = "Order not created" });
            }

            return Ok(order);
        }

        [Authorize(AuthenticationSchemes ="Bearer", Roles = "CUSTOMER")]
        [HttpPost("AddToWishlist")]
        public async Task<IActionResult> AddToWishlist(WishlistVM model)
        {
            //get user details
            var httppUser = HttpContext.User;
            var userId = httppUser.FindFirst(ClaimTypes.NameIdentifier)?.Value; // retrieve the user id  
            model.Id = userId;
            var wishlist = await _ordersRepository.AddToWishlist(model);

            if (wishlist == null)
            {
                return NotFound(new { message = "Wishlist not created" });
            }

            return Ok(wishlist);
        }
    }
}
