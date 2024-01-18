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
        public Task<Team> CreateTeam(TeamVM team)
        {
            var leagueId = _appDbContext.leagues.Where(l => l.Name == team.League.Name).Select(l => l.LeagueId).FirstOrDefault();

            try
            {
                var newTeam = new Team
                {
                    Name = team.Name,
                    Logo = team.Logo,
                    LeagueId = leagueId
                };

                _appDbContext.teams.Add(newTeam);
                _appDbContext.SaveChanges();

                return Task.FromResult(newTeam);
            }
            catch (Exception)
            {
                return Task.FromResult<Team>(null); 

            }
        }


        //teams
        public Task<Team> UpdateTeam(string name, TeamVM model)
        {
            //get team
            var team = _appDbContext.teams.Where(t => t.Name == name).FirstOrDefault();
            if(team == null)
            {
                throw new NotFoundException("No team found");
            }
            //update team
            team.Name = model.Name;
            team.Logo = model.Logo;
            //
            _appDbContext.SaveChanges();
            return Task.FromResult(team);

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
        //leagues
        public Task<League> CreateLeague(LeagueVM league)
        {
            var sportId = _appDbContext.sports.Where(s => s.Name == league.Sport.Name).Select(s => s.SportId).FirstOrDefault();
            var newLeague = new League
            {
                Name = league.Name,
                SportId = sportId,
            };

            _appDbContext.leagues.Add(newLeague);
            _appDbContext.SaveChanges();

            return Task.FromResult(newLeague);
        }
        public Task<League> DeleteLeague(string name)
        {
            var league = _appDbContext.leagues.FirstOrDefault(l => l.Name == name);

            if(league == null)
            {
                throw new NotFoundException("No league found for the specified name");
            }

            _appDbContext.leagues.Remove(league);
            _appDbContext.SaveChanges();

            return Task.FromResult(league);
        }
        //Sports
        public Task<Sport> CreateSport(SportVM sport)
        {
            var newSport = new Sport
            {
                Name = sport.Name,
            };

            _appDbContext.sports.Add(newSport);
            _appDbContext.SaveChanges();
            return Task.FromResult(newSport);
        }

        public Task<Sport> DeleteSport(string name)
        {
            var sport = _appDbContext.sports.FirstOrDefault(l => l.Name == name);

            if (sport == null)
            {
                throw new NotFoundException("No league found for the specified name");
            }

            _appDbContext.sports.Remove(sport);
            _appDbContext.SaveChanges();

            return Task.FromResult(sport);
        }
    }
}
