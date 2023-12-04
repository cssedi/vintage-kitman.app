﻿using Microsoft.EntityFrameworkCore;
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
                         .Select(s => new SportVM { Name = s.Name, SportId=s.SportId })
                         .ToListAsync();

            //get leagues for each sport
            foreach(var sport in sports.Result)
            {
                sport.Leagues = GetLeagueById(sport.SportId).Result;
                //if sports has no leagues, throw exception
                if(sport.Leagues == null)
                {
                    throw new NotFoundException("No leagues found for the specified sport");
                }
            }

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
    }
}
