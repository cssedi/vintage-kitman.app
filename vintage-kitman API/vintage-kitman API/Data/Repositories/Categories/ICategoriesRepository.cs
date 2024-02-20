using vintage_kitman_API.Model;
using vintage_kitman_API.ViewModels.CategoriesModels;

namespace vintage_kitman_API.Data.Repositories.Categories
{
    public interface ICategoriesRepository
    {
        public Task<List<SportVM>> GetSportsAsync();
        public Task<List<LeagueVM>> GetLeagueById(int sportId);
        public Task<List<TeamVM>> GetTeamsByLeagueAsync(string name);
        public Task<List<TeamVM>> GetTeamsBySport(string name);
        public List<LeagueVM> getLeaguesBySport(string name);
        public Task<List<Size>> GetAllSizes();

        //create 
        public Task<Team> CreateTeam(TeamVM sport);
        public Task<League> CreateLeague(LeagueVM league);
        public Task<Sport> CreateSport(SportVM sport);

        //update
        public Task<Team> UpdateTeam(string name, TeamVM model);
        public Task<Sport> UpdateSport(string name, SportVM sport);
        //delete
        public Task<Team> DeleteTeam(string name);
        public Task<League> DeleteLeague(string name);
        public Task<Sport> DeleteSport(string name);
        public Task<List<ProductType>> GetProductTypes();


    }
}
