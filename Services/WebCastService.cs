using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RCB.JavaScript.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using RCB.JavaScript.Models;
using System.Threading.Tasks;
using RCB.JavaScript.DTO;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace RCB.JavaScript.Services
{
    public class WebCastService : ServiceBase
    {
        private IConfiguration _config;
        private DatabaseContext _dbContext;

        //private S3Service _s3Service;

        public WebCastService(IConfiguration config, DatabaseContext dbContext)
        {
            _dbContext = dbContext;
            _config = config;
            //_s3Service = s3Service;
        }

        public async Task<Result> GetAll()
        {
            var heroes = await GetAllHero();

            if (heroes == null)
            {
                return Error($"Dont have enough hero to displayed.");
            }

            return Ok(heroes);
        }

        public async Task<Result> GetHero(User user)
        {
            var heroById = await GetHeroByUserId(user);

            if (heroById == null)
            {
                return Ok();
            }

            //var heroByIdWithImageURL = await _s3Service.GetImagesForHeroAsync(heroById);

            return Ok(heroById);
        }

        public async Task<Result> GetHero(int id)
        {
            var heroById = await GetHeroByHeroId(id);

            if (heroById == null)
            {
                return Ok();
            }

            //var heroByIdWithImageURL = await _s3Service.GetImagesForHeroAsync(heroById);

            return Ok(heroById);
        }

        public async Task<Result> AddHero(Hero hero, User user)
        {
            var heroByUser = await GetHeroByUserId(user);

            try
            {
                if (heroByUser == null)
                {
                    heroByUser = hero;
                    _dbContext.Entry(heroByUser).State = EntityState.Added;
                }
                else
                {
                    hero.Id = heroByUser.Id;
                    _dbContext.Entry(heroByUser).CurrentValues.SetValues(hero);
                }

                await _dbContext.SaveChangesAsync();
            }
            catch (System.Exception)
            {
                return Error($"Save Hero with name = {hero.DisplayName} is unsuccessful.");
            }

            //var heroByUserWithImageURL = await _s3Service.GetImagesForHeroAsync(heroByUser);

            return Ok(heroByUser);
        }

        public async Task<Result> AddHeroSummary(HeroSummary heroSummary, User user)
        {
            var heroByUser = await GetHeroByUserId(user);

            if (heroByUser == null)
            {
                return Error($"Hero doesnt exist.");
            }

            try
            {
                if (heroByUser.HeroSummary == null)
                {
                    heroByUser.HeroSummary = heroSummary;
                    _dbContext.Entry(heroByUser).State = EntityState.Modified;
                }
                else
                {
                    heroSummary.Id = heroByUser.HeroSummary.Id;
                    _dbContext.Entry(heroByUser.HeroSummary).CurrentValues.SetValues(heroSummary);
                }

                await _dbContext.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {

                return Error($"Save Hero with name = {heroByUser.DisplayName} is unsuccessful.");
            }

            //var heroByUserWithImageURL = await _s3Service.GetImagesForHeroAsync(heroByUser);

            return Ok(heroByUser);
        }

        public async Task<Result> AddHeroEducation(ICollection<HeroEducation> heroEducations, User user)
        {
            var heroByUser = await GetHeroByUserId(user);

            if (heroByUser == null)
            {
                return Error($"Hero doesnt exist.");
            }

            try
            {
                var removeEducation = heroByUser.HeroEducations.Where(x => !heroEducations.Any(y => y.Id == x.Id));

                if (removeEducation.Count() > 0)
                {
                    foreach (var item in heroByUser.HeroEducations)
                    {
                        if (removeEducation.Where(x => x.Id == item.Id).Any())
                        {
                            _dbContext.Entry(item).State = EntityState.Deleted;
                        }
                    }
                }

                foreach (var item in heroEducations)
                {
                    if (item.Id != 0)
                    {
                        _dbContext.Entry(heroByUser.HeroEducations.Where(x => x.Id == item.Id).Single()).CurrentValues.SetValues(item);
                    }
                    else
                    {
                        heroByUser.HeroEducations.Add(item);
                        _dbContext.Entry(item).State = EntityState.Added;
                    }
                }

                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return Error($"Prepare to add and update education for = {ex} is unsuccessful.");
            }

            //var heroByUserWithImageURL = await _s3Service.GetImagesForHeroAsync(heroByUser);

            return Ok(heroByUser);
        }

        public async Task<Result> AddHeroExperience(List<HeroExperience> heroExperiences, User user)
        {
            var heroByUser = await GetHeroByUserId(user);

            if (heroByUser == null)
            {
                return Error($"Hero doesnt exist.");
            }

            try
            {
                var removeExperience = heroByUser.HeroExperiences.Where(x => !heroExperiences.Any(y => y.Id == x.Id));
                var takeExperienceDetail = heroByUser.HeroExperiences.SelectMany(x => x.HeroExperienceDetails);
                var removeExperienceDetail = takeExperienceDetail.Where(x => !heroExperiences.SelectMany(y => y.HeroExperienceDetails).Any(z => z.Id == x.Id));

                if (removeExperience.Count() > 0)
                {
                    foreach (var toRemoveHeroExperience in heroByUser.HeroExperiences)
                    {
                        if (removeExperience.Where(x => x.Id == toRemoveHeroExperience.Id).Any())
                        {
                            _dbContext.Entry(toRemoveHeroExperience).State = EntityState.Deleted;

                            foreach (var detail in toRemoveHeroExperience.HeroExperienceDetails)
                            {
                                _dbContext.Entry(detail).State = EntityState.Deleted;
                            }
                        }
                    }
                }

                if (removeExperienceDetail.Count() > 0)
                {
                    foreach (var toCheckHeroExperience in heroByUser.HeroExperiences)
                    {
                        foreach (var toRemoveHeroExperienceDetail in toCheckHeroExperience.HeroExperienceDetails)
                        {
                            if (removeExperienceDetail.Where(x => x.Id == toRemoveHeroExperienceDetail.Id).Any())
                            {
                                _dbContext.Entry(toRemoveHeroExperienceDetail).State = EntityState.Deleted;
                            }
                        }
                    }
                }

                foreach (var toAddHeroExperience in heroExperiences)
                {
                    if (toAddHeroExperience.Id != 0)
                    {
                        _dbContext.Entry(heroByUser.HeroExperiences.Where(x => x.Id == toAddHeroExperience.Id).Single()).CurrentValues.SetValues(toAddHeroExperience);

                        foreach (var toAddHeroExperienceDetail in toAddHeroExperience.HeroExperienceDetails)
                        {
                            if (toAddHeroExperienceDetail.Id != 0)
                            {
                                _dbContext.Entry(heroByUser.HeroExperiences.SelectMany(x => x.HeroExperienceDetails).ToList().Where(x => x.Id == toAddHeroExperienceDetail.Id).Single()).CurrentValues.SetValues(toAddHeroExperienceDetail);
                            }
                            else
                            {
                                heroByUser.HeroExperiences.Where(w => w.Id == toAddHeroExperience.Id).SingleOrDefault()
                                .HeroExperienceDetails.Add(toAddHeroExperienceDetail);

                                _dbContext.Entry(toAddHeroExperienceDetail).State = EntityState.Added;
                            }
                        }
                    }
                    else
                    {
                        heroByUser.HeroExperiences.Add(toAddHeroExperience);
                        _dbContext.Entry(toAddHeroExperience).State = EntityState.Added;

                        foreach (var toAddHeroExperienceDetailIfEmpty in toAddHeroExperience.HeroExperienceDetails)
                        {
                            heroByUser.HeroExperiences.SelectMany(x => x.HeroExperienceDetails).ToList().Add(toAddHeroExperienceDetailIfEmpty);
                            _dbContext.Entry(toAddHeroExperienceDetailIfEmpty).State = EntityState.Added;
                        }
                    }
                }

                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return Error($"Prepare to add and update experience for = {ex} is unsuccessful.");
            }

            return Ok(heroByUser);

        }

        public async Task<Result> AddHeroService(ICollection<HeroService> heroServices, User user)
        {
            var heroByUser = await GetHeroByUserId(user);

            if (heroByUser == null)
            {
                return Error($"Hero doesnt exist.");
            }

            try
            {
                var removeServices = heroByUser.HeroServices.Where(x => !heroServices.Any(y => y.Id == x.Id));

                if (removeServices.Count() > 0)
                {
                    foreach (var removeService in heroByUser.HeroServices)
                    {
                        if (removeServices.Where(x => x.Id == removeService.Id).Any())
                        {
                            _dbContext.Entry(removeService).State = EntityState.Deleted;
                        }
                    }
                }

                foreach (var heroService in heroServices)
                {
                    if (heroService.Id != 0)
                    {
                        _dbContext.Entry(heroByUser.HeroServices.Where(x => x.Id == heroService.Id).Single()).CurrentValues.SetValues(heroService);
                    }
                    else
                    {
                        heroByUser.HeroServices.Add(heroService);
                        _dbContext.Entry(heroService).State = EntityState.Added;
                    }
                }

                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return Error($"Prepare to add and update services for = {ex} is unsuccessful.");
            }

            //var heroByUserWithImageURL = await _s3Service.GetImagesForHeroAsync(heroByUser);

            return Ok(heroByUser);
        }

        public async Task<Result> AddHeroPortfolio(ICollection<HeroPortfolio> heroPortfolios, User user)
        {
            var heroByUser = await GetHeroByUserId(user);

            if (heroByUser == null)
            {
                return Error($"Hero doesnt exist.");
            }

            try
            {
                var removePortfolios = heroByUser.HeroPortfolios.Where(x => !heroPortfolios.Any(y => y.Id == x.Id));

                if (removePortfolios.Count() > 0)
                {
                    foreach (var heroPortfolio in heroByUser.HeroPortfolios)
                    {
                        if (removePortfolios.Where(x => x.Id == heroPortfolio.Id).Any())
                        {
                            _dbContext.Entry(heroPortfolio).State = EntityState.Deleted;
                            _dbContext.Entry(heroPortfolio.HeroPortfolioDetails).State = EntityState.Deleted;

                            foreach (var toDeletePortfolioImage in heroPortfolio.HeroPortfolioDetails.HeroPortfolioImages)
                            {
                                _dbContext.Entry(toDeletePortfolioImage).State = EntityState.Deleted;
                            }
                        }
                    }
                }

                foreach (var toAddHeroPortfolio in heroPortfolios)
                {
                    if (toAddHeroPortfolio.Id != 0)
                    {
                        _dbContext.Entry(heroByUser.HeroPortfolios.Where(x => x.Id == toAddHeroPortfolio.Id).Single()).CurrentValues.SetValues(toAddHeroPortfolio);

                        if (toAddHeroPortfolio.HeroPortfolioDetails.Id != 0)
                        {
                            _dbContext.Entry(heroByUser.HeroPortfolios.Select(x => x.HeroPortfolioDetails).Where(x => x.Id == toAddHeroPortfolio.HeroPortfolioDetails.Id).Single()).CurrentValues.SetValues(toAddHeroPortfolio.HeroPortfolioDetails);
                        }
                        else
                        {
                            heroByUser.HeroPortfolios.Where(w => w.Id == toAddHeroPortfolio.HeroPortfolioDetails.Id).SingleOrDefault()
                            .HeroPortfolioDetails = toAddHeroPortfolio.HeroPortfolioDetails;

                            _dbContext.Entry(toAddHeroPortfolio.HeroPortfolioDetails).State = EntityState.Added;
                        }

                        foreach (var toAddHeroPortfolioDetailImage in toAddHeroPortfolio.HeroPortfolioDetails.HeroPortfolioImages)
                        {
                            if (toAddHeroPortfolioDetailImage.Id == 0)
                            {
                                heroByUser.HeroPortfolios.Where(w => w.Id == toAddHeroPortfolio.Id).SingleOrDefault()
                                .HeroPortfolioDetails.HeroPortfolioImages.Add(toAddHeroPortfolioDetailImage);

                                _dbContext.Entry(toAddHeroPortfolioDetailImage).State = EntityState.Added;
                            }
                        }
                    }
                    else
                    {
                        heroByUser.HeroPortfolios.Add(toAddHeroPortfolio);
                        _dbContext.Entry(toAddHeroPortfolio).State = EntityState.Added;
                        _dbContext.Entry(toAddHeroPortfolio.HeroPortfolioDetails).State = EntityState.Added;

                        foreach (var toAddHeroPortfolioDetailImage in toAddHeroPortfolio.HeroPortfolioDetails.HeroPortfolioImages)
                        {
                            _dbContext.Entry(toAddHeroPortfolioDetailImage).State = EntityState.Added;
                        }
                    }
                }

                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return Error($"Prepare to add and update portfolio for = {ex} is unsuccessful.");
            }

            //var heroByUserWithImageURL = await _s3Service.GetImagesForHeroAsync(heroByUser);

            return Ok(heroByUser);
        }

        public async Task<Result> AddHeroTechnical(ICollection<HeroTechnical> heroTechnicals, User user)
        {
            var heroByUser = await GetHeroByUserId(user);

            if (heroByUser == null)
            {
                return Error($"Hero doesnt exist.");
            }

            try
            {
                var removeTechnicals = heroByUser.HeroTechnicals.Where(x => !heroTechnicals.Any(y => y.Id == x.Id));

                if (removeTechnicals.Count() > 0)
                {
                    foreach (var removeTechnical in heroByUser.HeroTechnicals)
                    {
                        if (removeTechnicals.Where(x => x.Id == removeTechnical.Id).Any())
                        {
                            _dbContext.Entry(removeTechnical).State = EntityState.Deleted;
                        }
                    }
                }

                foreach (var heroTechnical in heroTechnicals)
                {
                    if (heroTechnical.Id != 0)
                    {
                        _dbContext.Entry(heroByUser.HeroTechnicals.Where(x => x.Id == heroTechnical.Id).Single()).CurrentValues.SetValues(heroTechnical);
                    }
                    else
                    {
                        heroByUser.HeroTechnicals.Add(heroTechnical);
                        _dbContext.Entry(heroTechnical).State = EntityState.Added;
                    }
                }

                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return Error($"Prepare to add and update technicals for = {ex} is unsuccessful.");
            }

            //var heroByUserWithImageURL = await _s3Service.GetImagesForHeroAsync(heroByUser);

            return Ok(heroByUser);
        }

        private async Task<List<Hero>> GetAllHero()
        {
            var result = await _dbContext.Hero.AsNoTracking()
                            .Include(b => b.HeroSummary)
                            .Include(b => b.HeroSummary)
                            .Include(b => b.HeroEducations)
                            .Include(b => b.HeroExperiences).ThenInclude(c => c.HeroExperienceDetails)
                            .Include(b => b.HeroServices)
                            .Include(b => b.HeroTechnicals)
                            .ToListAsync();

            return result;
        }

        private async Task<Hero> GetHeroByUserId(User user)
        {
            var result = await _dbContext.Hero.Where(a => a.User == user)
                            .Include(b => b.HeroSummary)
                            .Include(b => b.HeroEducations)
                            .Include(b => b.HeroExperiences).ThenInclude(c => c.HeroExperienceDetails)
                            .Include(b => b.HeroServices)
                            .Include(b => b.HeroPortfolios).ThenInclude(c => c.HeroPortfolioDetails).ThenInclude(c => c.HeroPortfolioImages)
                            .Include(b => b.HeroTechnicals)
                            .SingleOrDefaultAsync();

            return result;
        }

        private async Task<Hero> GetHeroByHeroId(int heroId)
        {
            var result = await _dbContext.Hero.Where(a => a.Id == heroId)
                        .Include(b => b.HeroSummary)
                        .Include(b => b.HeroEducations)
                        .Include(b => b.HeroExperiences).ThenInclude(c => c.HeroExperienceDetails)
                        .Include(b => b.HeroServices)
                        .Include(b => b.HeroPortfolios).ThenInclude(c => c.HeroPortfolioDetails).ThenInclude(c => c.HeroPortfolioImages)
                        .Include(b => b.HeroTechnicals)
                        .SingleOrDefaultAsync();

            return result;
        }
    }
}