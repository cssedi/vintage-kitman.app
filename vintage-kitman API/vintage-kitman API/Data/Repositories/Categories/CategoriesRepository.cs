using Microsoft.EntityFrameworkCore;
using vintage_kitman_API.NewFolder;
using vintage_kitman_API.ViewModels.CategoriesModels;

namespace vintage_kitman_API.Data.Repositories.Categories
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private readonly AppDbContext _appDbContext;
        public CategoriesRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<List<LeagueVM>> GetLeagueById(int sportId)
        {
            var leagues = await _appDbContext.leagues.Where(l=> l.SportId == sportId)
                .Select(l => new LeagueVM { Name = l.Name}).ToListAsync();

            if(leagues == null)
            {
                throw new NotFoundException("No leagues found for the specified sport");
            }
                
            return leagues;

        }

        public Task<List<SportVM>> GetSportsAsync()
        {
            var sports = _appDbContext.sports.Select(s => new SportVM { Name = s.Name }).ToListAsync();

            return sports;
        }
    }
}
