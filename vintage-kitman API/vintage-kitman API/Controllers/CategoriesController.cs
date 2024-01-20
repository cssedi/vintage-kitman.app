using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vintage_kitman_API.Data.Repositories.Categories;
using vintage_kitman_API.ViewModels.CategoriesModels;

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

        [Authorize(AuthenticationSchemes ="Bearer", Roles = "ADMIN")]
        [HttpGet("GetLeaguesBySport/{name}")]
        public async Task<IActionResult> GetLeaguesBySport(string name)
        {
            var leagues = _categoriesRepository.getLeaguesBySport(name);

            if (leagues == null)
            {
                return NotFound(new { message = "No Leagues Found" });
            }

            return Ok(leagues);
        }

        //[Authorize(AuthenticationSchemes ="Bearer", Roles = "ADMIN")]
        [HttpPost("CreateTeam")]
        public async Task<IActionResult> CreateTeam(TeamVM model)
        {
            var team = _categoriesRepository.CreateTeam(model);

            if (team == null)
            {
                return NotFound(new { message = "Team not created" });
            }

            return Ok(team);
        }

        [Authorize(AuthenticationSchemes ="Bearer", Roles = "ADMIN")]
        [HttpDelete("DeleteTeam/{name}")]
        public async Task<IActionResult> DeleteTeam(string name)
        {
            var team = await _categoriesRepository.DeleteTeam(name);

            if (team == null)
            {
                return NotFound(new { message = "Team not found" });
            }

            return Ok(team);
        }

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "ADMIN")]
        [HttpPut("UpdateTeam/{name}")]
        public async Task<IActionResult> UpdateTeam(string name,TeamVM model)
        {
            var team = await _categoriesRepository.UpdateTeam(name, model);

            if (team == null)
            {
                return NotFound(new { message = "Team not found" });
            }

            return Ok(team);
        }

        [Authorize(AuthenticationSchemes ="Bearer", Roles = "ADMIN")]
        [HttpPost("CreateLeague")]
        public async Task<IActionResult> CreateLeague(LeagueVM model)
        {
            var league = await _categoriesRepository.CreateLeague(model);

            if (league == null)
            {
                return NotFound(new { message = "League not created" });
            }

            return Ok(league);
        }

        [Authorize(AuthenticationSchemes ="Bearer", Roles = "ADMIN")]
        [HttpDelete("DeleteLeague/{name}")]
        public async Task<IActionResult> DeleteLeague(string name)
        {
            var league = await _categoriesRepository.DeleteLeague(name);

            if (league == null)
            {
                return NotFound(new { message = "League not found" });
            }

            return Ok(league);
        }
        //Sport
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "ADMIN")]
        [HttpPost("CreateSport")]
        public async Task<IActionResult> CreateSport(SportVM model)
        {
            
            var sport = await _categoriesRepository.CreateSport(model);
            if(sport == null)
            {
                return BadRequest("Could not create sport");
            }
            return Ok(sport);
        }

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "ADMIN")]
        [HttpPut("UpdateSport/{name}")]
        public async Task<IActionResult> UpdateSport(string name, SportVM model)
        {
            var team = await _categoriesRepository.UpdateSport(name, model);

            if (team == null)
            {
                return NotFound(new { message = "Sport not found" });
            }

            return Ok(team);
        }

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "ADMIN")]
        [HttpDelete("DeleteSport/{name}")]
        public async Task<IActionResult> DeleteSport(string name)
        {
            var sport = await _categoriesRepository.DeleteSport(name);

            if (sport == null)
            {
                return NotFound(new { message = "Sport not found" });
            }

            return Ok(sport);
        }
    }
}
