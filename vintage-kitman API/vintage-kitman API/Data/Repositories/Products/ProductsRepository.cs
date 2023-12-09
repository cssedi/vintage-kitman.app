﻿using Microsoft.EntityFrameworkCore;
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
        public async Task<KitVM> getKitByIdAsync(int id)
        {
            var kit = await _appDbContext.kits.Include(t => t.Team)
                .Where(k => k.KitId == id)
                .Select(k => new KitVM { Name = k.Name, FrontImage = k.FrontImage, Price = k.Price })
                .FirstOrDefaultAsync();

            if (kit == null)
                throw new NotFoundException("No kit found for the specified id");

            return kit;
        }

        public async Task<List<KitVM>> getKitsByTeamAsync(int id)
        {
           var kits = await _appDbContext.kits.Where(t=> t.TeamId == id)
                .Select(k => new KitVM { Name = k.Name, FrontImage = k.FrontImage, Price = k.Price })
                .ToListAsync();

            if (kits == null)
                throw new NotFoundException("No kits found for the specified team");

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
    }
}