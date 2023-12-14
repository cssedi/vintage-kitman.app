using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vintage_kitman_API.Data.Repositories.Categories;
using vintage_kitman_API.Data.Repositories.Products;
using vintage_kitman_API.NewFolder;
using vintage_kitman_API.ViewModels.CategoriesModels;

namespace vintage_kitman_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ICategoriesRepository _categoriesRepository;
        private readonly AppDbContext _appDbContext;
        private readonly IProductsRepository _productsRepository;

        public ProductsController(ICategoriesRepository categoriesRepository, AppDbContext appDbContext, IProductsRepository productsRepository)
        {
            _categoriesRepository = categoriesRepository;
            _appDbContext = appDbContext;
            _productsRepository = productsRepository;
        }

        [HttpGet("GetAllSports")]
        public async Task<IActionResult> GetSports()
        {
            var sports = await _categoriesRepository.GetSportsAsync();

            if (sports == null)
            {
                return NotFound(sports);
            }

            return Ok(sports);
        }

        [HttpGet("GetKitsByLeague/{name}")]
        public async Task<IActionResult> GetKitsByLeague(string name)
        {
            name = name.Replace("%20", " ");
            var kits = await _appDbContext.kits.Include(t => t.Team).ThenInclude(l => l.League)
                .Where(k => k.Team.League.Name == name)
                .ToListAsync();

            var kitsVM = new List<KitVM>();
            foreach (var kit in kits)
            {
                kitsVM.Add(new KitVM
                {
                    Name = kit.Name,
                    FrontImage = kit.FrontImage,
                    Price = kit.Price,
                });
            }

            if (kits == null)
            {
                return NotFound(new { message = "No Kits Found" });
            }

            return Ok(kitsVM);


        }

        [HttpGet("GetTeamsByLeague/{name}")]
        public async Task<IActionResult> GetTeamsByLeagueName(string name)
        {
            name = name.Replace("%20", " ");
            var teams = await _productsRepository.getTeamsByLeagueNameAsync(name);

            if (teams == null)
            {
                return NotFound(new { message = "No Teams Found" });
            }

            return Ok(teams);
        }

        [HttpGet("GetKitsByTeam/{id}")]
        public async Task<IActionResult> GetKitsByTeam(int id)
        {
            var kits = await _productsRepository.getKitsByTeamAsync(id);

            if (kits == null)
            {
                return NotFound(new { message = "No Kits Found" });
            }

            return Ok(kits);
        }

        [HttpGet("GetKitByName/{name}")]
        public async Task<IActionResult> GetKitByName(string name)
        {
            var kit = await _productsRepository.getKitByName(name);

            if(kit == null)
            {
                return NotFound(new { message = "No Kit found" });
            }
            return Ok(kit);
        }
    }
}
