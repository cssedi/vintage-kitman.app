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

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "CUSTOMER")]
        [HttpDelete("RemoveFromWishlist")]
        public async Task<IActionResult> RemoveFromWishlist(WishlistVM model)
        {
            //get user details
            var httppUser = HttpContext.User;
            var userId = httppUser.FindFirst(ClaimTypes.NameIdentifier)?.Value; // retrieve the user id  
            model.Id = userId;
            var wishlist = await _ordersRepository.RemoveFromWishlist(model);

            if (wishlist == null)
            {
                return NotFound(new { message = "Wishlist not created" });
            }

            return Ok(wishlist);
        }

        [Authorize(AuthenticationSchemes ="Bearer", Roles = "CUSTOMER")]
        [HttpGet("GetWishList")]
        public async Task<IActionResult> GetWishList()
        {
            //get user details
            var httppUser = HttpContext.User;
            var userId = httppUser.FindFirst(ClaimTypes.NameIdentifier)?.Value; // retrieve the user id  

            var wishlist = await _ordersRepository.GetWishList(userId);

            if (wishlist == null)
            {
                return NotFound(new { message = "Wishlist empty" });
            }

            return Ok(wishlist);
        }

        [HttpPost("GetCartTotalPrice")]
        public async Task<IActionResult> GetCartTotalPrice(List<CartVM> model)
        {
            var total = _ordersRepository.GetCartTotal(model);
            
            return Ok(new { total = total.Total });
        }
        [Authorize(AuthenticationSchemes ="Bearer", Roles = "ADMIN")]
        [HttpGet("GetAllCustomOrders")]
        public async Task<IActionResult> GetAllCustomOrders()
        {
            var orders = _ordersRepository.GetAllCustomOrders();

            if (orders == null)
            {
                return NotFound(new { message = "No orders found" });
            }

            return Ok(orders);
        }
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "ADMIN")]
        [HttpPut("RejectOrder")]
        public async Task<IActionResult> RejectOrder(CustomOrderVM model)
        {
            var order = _ordersRepository.RejectCustomOrder(model);

            if(order == null)
            {

            }

            return Ok(order);
        }

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "ADMIN")]
        [HttpPut("AcceptOrder")]
        public async Task<IActionResult> AcceptOrder(CustomOrderVM model)
        {
            var order = _ordersRepository.AcceptCustomOrder(model);

            if (order == null)
            {

            }

            return Ok(order);
        }

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "CUSTOMER")]
        [HttpGet("GetUserCustomOrders")]
        public async Task<IActionResult> GetUserCustomOrders()
        {
            //get user details
            var httpUser = HttpContext.User;
            var userId = httpUser.FindFirst(ClaimTypes.NameIdentifier)?.Value; // retrieve the user id  
            var orders = _ordersRepository.GetUserCustomOrders(userId);

            if (orders == null)
            {
                return NotFound(new { message = "No Orders found for this user" });
            }
            return Ok(orders);

        }

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "CUSTOMER")]
        [HttpGet("GetUserOrders")]
        public async Task<IActionResult> GetUserOrders()
        {
            //get user details
            var httpUser = HttpContext.User;
            var userId = httpUser.FindFirst(ClaimTypes.NameIdentifier)?.Value; // retrieve the user id  
            var orders = _ordersRepository.GetUserOrders(userId);

            if (orders == null)
            {
                return NotFound(new { message = "No Orders found for this user" });
            }
            return Ok(orders);

        }

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "ADMIN")]
        [HttpGet("AddNewOnStockOrder")]
        public async Task<IActionResult> AddNewOnStockOrder(OnStockKitVM model)
        {
 
            var orders = _ordersRepository.AddNewOnStockKit(model);

            if (orders == null)
            {
                return NotFound(new { message = "No Orders found for this user" });
            }
            return Ok(orders);

        }

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "ADMIN")]
        [HttpGet("GetAllOnStockKits")]
        public async Task<IActionResult> GetAllOnStockKits()
        {
            var kits = _ordersRepository.GetOnStockKits();

            if (kits == null)
            {
                return NotFound(new { message = "No On stock kits found" });
            }
            return Ok(kits);
        }

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "ADMIN")]
        [HttpPost("AddOnStockOrder")]
        public async Task<IActionResult> AddOnStockOrder(OnStockKitVM model)
        {
            var kits = _ordersRepository.AddNewOnStockKit(model) ;

            if (kits == null)
            {
                return NotFound(new { message = "No On stock kits found" });
            }
            return Ok(kits);
        }

        [HttpGet("GetHomePageOnStockKits")]
        public async Task<IActionResult> GetHomePageOnStockKits()
        {
            var kits = _ordersRepository.CustomerViewOnStockKits();

            if (kits == null)
            {
                return NotFound(new { message = "No On stock kits found" });
            }
            return Ok(kits);
        }

        [Authorize(AuthenticationSchemes="Bearer", Roles="CUSTOMER")]
        [HttpPost("CreateOrder")]
        public async Task<IActionResult> CreateOrder(List<KitOrderVM> model)
        {
            var httppUser = HttpContext.User;
            var userId = httppUser.FindFirst(ClaimTypes.NameIdentifier)?.Value; // retrieve the user id
            var order = await _ordersRepository.createOrder(model, userId);

            if (order == null)
            {
                return NotFound(new { message = "Order not created" });
            }

            return Ok(order);
        }








    }
}
