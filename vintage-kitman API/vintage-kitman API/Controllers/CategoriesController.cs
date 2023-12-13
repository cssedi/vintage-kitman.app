using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vintage_kitman_API.Data.Repositories.Categories;

namespace vintage_kitman_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesRepository _categoriesRepository;
        public CategoriesController(ICategoriesRepository categoriesRepository)
        {
            _categoriesRepository = categoriesRepository;
        }

        [HttpGet("GetTeamsBySport/{name}")]
        public async Task<IActionResult> GetTeamsBySport(string name)
        {
            name = name.Replace("%20", " ");
            var teams = await _categoriesRepository.GetTeamsBySport(name);

            if (teams == null)
            {
                return NotFound(new { message = "No Teams Found" });
            }

            return Ok(teams);
        }

        [HttpGet("GetAllSizes")]
        public async Task<IActionResult> GetAllSizes()
        {
            var sizes = await _categoriesRepository.GetAllSizes();

            if(sizes == null)
            {
                return NotFound(new { message = "No sizes found" });
            }

            return Ok(sizes);
        }


    }
}
