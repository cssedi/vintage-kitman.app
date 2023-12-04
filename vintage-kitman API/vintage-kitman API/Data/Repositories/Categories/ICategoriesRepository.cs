using vintage_kitman_API.ViewModels.CategoriesModels;

namespace vintage_kitman_API.Data.Repositories.Categories
{
    public interface ICategoriesRepository
    {
        public Task<List<SportVM>> GetSportsAsync();
        public Task<List<LeagueVM>> GetLeagueById(int sportId);
        public Task<List<TeamVM>> GetTeamsByLeagueAsync(string name);

    }
}
