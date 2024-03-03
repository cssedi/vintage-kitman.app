using vintage_kitman_API.ViewModels.CategoriesModels;

namespace vintage_kitman_API.Data.Repositories.Products
{
    public interface IProductsRepository
    {

        public Task<List<TeamVM>> getTeamsByLeagueNameAsync(string name);
        public Task<List<KitVM>> getKitsByTeamAsync(int id);
        public Task<KitVM> getKitByIdAsync(int id);
        public Task<List<KitVM>> getKitsByNameAsync(string name);
        public Task<List<KitVM>> getKitsByTeamNameAsync(string name);

        public Task<KitVM> getKitByName(string name);
        public Task<KitVM> getKitById(Guid id);
        public Task<List<KitVM>> searchKits(string searchString);
        //add new kit
        public Task<KitVM> addNewKit(string teamname, KitVM model);
        public Task<KitVM> updateKit(string name, KitVM model);
        public Task<KitVM> deleteKit(string name);
        



    }
}
