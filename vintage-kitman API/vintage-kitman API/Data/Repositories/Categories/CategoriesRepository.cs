using Microsoft.EntityFrameworkCore;
using vintage_kitman_API.Model;
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

            var sports = _appDbContext.sports.Include(l=>l.Leagues)
                         .Select(s => new SportVM { Name = s.Name, SportId=s.SportId, Leagues = s.Leagues })
                         .ToListAsync();

            if(sports == null)
            {
                throw new NotFoundException("No sports found");
            }

            return sports;
        }

        public async Task<List<TeamVM>> GetTeamsByLeagueAsync(string name)
        {
            throw new NotFoundException("No leagues found for the specified sport");
        }

        public Task<List<TeamVM>> GetTeamsBySport(string name)
        {
            var teams = _appDbContext.teams.Include(l => l.League).Where(s => s.League.Sport.Name == name)
                .Select(t => new TeamVM { Name = t.Name, TeamId = t.TeamId, Logo = t.Logo }).ToListAsync();

            if(teams == null)
            {
                throw new NotFoundException("No teams found for the specified sport");
            }

            return teams;
        }

        public Task<List<Size>> GetAllSizes()
        {
            var sizes = _appDbContext.sizes.ToListAsync();
            if(sizes == null)
            {
                throw new NotFoundException("No sizes found");
            }

            return sizes;
        }

        public List<LeagueVM> getLeaguesBySport(string name)
        {
            var leagues = _appDbContext.leagues.Include(s => s.Sport).Where(s => s.Sport.Name == name)
                .Select(l => new LeagueVM { Name = l.Name, }).ToList();

            if(leagues == null)
            {
                throw new NotFoundException("No leagues found for the specified sport");
            }
            return leagues;
        }
        //creates
        public async Task<Team> CreateTeam(TeamVM team)
        {
            var newTeam = new Team
            {
                Name = team.Name,
                Logo = team.Logo,
                LeagueId= _appDbContext.leagues.FirstOrDefault(l => l.Name == team.League.Name).LeagueId,
                //get league from route param
                League = _appDbContext.leagues.FirstOrDefault(l => l.Name == team.League.Name)
            };

            await _appDbContext.teams.AddAsync(newTeam);
            await _appDbContext.SaveChangesAsync();

            return newTeam;
        }

        public Task<Team> DeleteTeam(string name)
        {
           var team = _appDbContext.teams.FirstOrDefault(t => t.Name == name);

            if(team == null)
            {
                throw new NotFoundException("No team found for the specified name");
            }

            _appDbContext.teams.Remove(team);
            _appDbContext.SaveChanges();

            return Task.FromResult(team);
        }
    }
}
