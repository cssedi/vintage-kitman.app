using Microsoft.EntityFrameworkCore;
using vintage_kitman_API.Model;
using vintage_kitman_API.NewFolder;
using vintage_kitman_API.ViewModels.CategoriesModels;

namespace vintage_kitman_API.Data.Repositories.Products
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly AppDbContext _appDbContext;
        public ProductsRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public Task<KitVM> addNewKit(string teamname, KitVM model)
        {
            var team = _appDbContext.teams.Where(t => t.Name == teamname).FirstOrDefault();
            var kit = new Kit
            {
                Name = model.Name,
                FrontImage = model.FrontImage,
                Price = model.Price,
                TeamId = team.TeamId,
                ProductTypeId = model.ProductTypeId
            };

            _appDbContext.kits.Add(kit);
            _appDbContext.SaveChanges();

            return Task.FromResult(model);
        }

        public Task<KitVM> getKitById(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<KitVM> getKitByIdAsync(int id)
        {
            var kit = await _appDbContext.kits.Include(t => t.Team)
                .Where(k => k.KitId == id)
                .Select(k => new KitVM { Name = k.Name, FrontImage = k.FrontImage, Price = k.Price, ProductTypeId = k.ProductTypeId, TeamId=k.TeamId  })
                .FirstOrDefaultAsync();

            if (kit == null)
                throw new NotFoundException("No kit found for the specified id");

            return kit;
        }

        public Task<KitVM> getKitByName(string name)
        {
            var kit = _appDbContext.kits.Include(t => t.Team).Include(pt=>pt.ProductType)
                .Where(k => k.Name == name)
                .Select(k => new KitVM { Name = k.Name, FrontImage = k.FrontImage, Price = k.Price, productType = k.ProductType })
                .FirstOrDefaultAsync();

            return kit;
        }

        public Task<List<KitVM>> getKitsByNameAsync(string name)
        {
            var kits = _appDbContext.kits.Include(t => t.Team)
                .Where(k => k.Team.Name.Contains(name) || k.Name.Contains(name))
                .Select(k => new KitVM { Name = k.Name, FrontImage = k.FrontImage, Price = k.Price })
                .ToListAsync();

            return kits;
        }

        public async Task<List<KitVM>> getKitsByTeamAsync(int id)
        {
            var kits = await _appDbContext.kits.Where(t => t.TeamId == id)
                 .Select(k => new KitVM { Name = k.Name, FrontImage = k.FrontImage, Price = k.Price })
                 .ToListAsync();

            if (kits == null)
                throw new NotFoundException("No kits found for the specified team");

            return kits;
        }

        public Task<List<KitVM>> getKitsByTeamNameAsync(string name)
        {
            var kits = _appDbContext.kits.Include(t => t.Team)
                .Where(k => k.Team.Name == name)
                .Select(k => new KitVM { Name = k.Name, FrontImage = k.FrontImage, Price = k.Price, ProductTypeId = k.ProductTypeId })
                .ToListAsync();

            return kits;
        }

        public async Task<List<TeamVM>> getTeamsByLeagueNameAsync(string name)
        {
            var teams = await _appDbContext.teams.Include(l => l.League)
                .Where(t => t.League.Name == name)
                .Select(t => new TeamVM { Name = t.Name, TeamId = t.TeamId, Logo = t.Logo })
                .ToListAsync();

            if (teams == null)
                throw new NotFoundException("No teams found for the specified league");

            return teams;
        }

        public async Task<List<KitVM>> searchKits(string searchString)
        {
            var kits = await _appDbContext.kits
                .Where(k => k.Name.Contains(searchString) || k.Team.Name.Contains(searchString) || k.Team.League.Name.Contains(searchString))
                .Select(k => new KitVM { Name = k.Name, FrontImage = k.FrontImage, Price = k.Price })
                .ToListAsync();

            if(kits == null)
            {
                throw new NotFoundException("No kits found for the specified search");
            }

            return kits;
        }
    }
}
