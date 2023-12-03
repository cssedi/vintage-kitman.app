using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vintage_kitman_API.Data.Repositories.Categories;

namespace vintage_kitman_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ICategoriesRepository _categoriesRepository;
        public ProductsController(ICategoriesRepository categoriesRepository)
        {
            _categoriesRepository = categoriesRepository;
        }

        [HttpGet("GetSports")]
        public async Task<IActionResult> GetSports()
        {
            var sports = await _categoriesRepository.GetSportsAsync();

            if (sports == null)
            {
                return NotFound(sports);
            }

            return Ok(sports);
        }

    }
}
