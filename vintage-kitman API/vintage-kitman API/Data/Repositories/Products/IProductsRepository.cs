using vintage_kitman_API.ViewModels.CategoriesModels;

namespace vintage_kitman_API.Data.Repositories.Products
{
    public interface IProductsRepository
    {

        public Task<List<TeamVM>> getTeamsByLeagueNameAsync(string name);
        public Task<List<KitVM>> getKitsByTeamAsync(int id);
        public Task<KitVM> getKitByIdAsync(int id);
        public Task<List<KitVM>> getKitsByNameAsync(string name);

        public Task<KitVM> getKitById(Guid id);

    }
}
