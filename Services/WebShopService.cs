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
    public class WebShopService : ServiceBase
    {
        private IConfiguration _config;
        private DatabaseContext _dbContext;

        private S3Service _s3Service;

        public WebShopService(IConfiguration config, DatabaseContext dbContext, S3Service s3Service)
        {
            _dbContext = dbContext;
            _config = config;
            _s3Service = s3Service;
        }

        public async Task<Result> GetAllAdmStoreCategory()
        {
            var result = await GetAdmCategories();

            if (result == null)
            {
                return Error($"Dont have category to displayed.");
            }

            return Ok(result);
        }

        public async Task<Result> GetAll()
        {
            var heroes = await GetAllStore();

            if (heroes == null)
            {
                return Error($"Dont have enough hero to displayed.");
            }

            return Ok(heroes);
        }

        public async Task<Result> GetStore(User user)
        {
            if (user == null)
            {
                return Error($"User is not found.");
            }

            var store = await GetStoreByUserId(user);

            if (store == null)
            {
                return Error($"Store is not found.");
            }

            var storeByIdWithImageURL = await _s3Service.GetImagesForStoreAsync(store.Value);

            return Ok(storeByIdWithImageURL.Value);
        }

        public async Task<Result> GetStore(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return Error($"Id is empty.");
            }

            var store = await GetStoreByStoreSummaryId(id);

            if (store.Value == null)
            {
                return Error($"Shop not found.");
            }

            var storeByIdWithImageURL = await _s3Service.GetImagesForStoreAsync(store.Value);

            return Ok(storeByIdWithImageURL.Value);
        }

        public async Task<Result> AddStore(StoreSummary storeSummary, User user)
        {
            var store = await GetStoreByUserId(user);

            if (store.Value == null)
            {
                store.Value = storeSummary;
                _dbContext.Entry(store.Value).State = EntityState.Added;
            }
            else
            {
                storeSummary.Id = store.Value.Id;
                _dbContext.Entry(store.Value).CurrentValues.SetValues(storeSummary);
            }

            await _dbContext.SaveChangesAsync();

            var storeWithImageURL = await _s3Service.GetImagesForStoreAsync(store.Value);

            return Ok(storeWithImageURL.Value);
        }

        public async Task<Result> AddStoreCategory(List<StoreCategory> storeCategories, User user)
        {
            var storeByUser = await GetStoreByUserId(user);

            if (storeByUser.HasErrors)
            {
                return Error($"{storeByUser.Errors}.");
            }

            try
            {
                var removeStoreCategies = storeByUser.Value.StoreCategories.Where(x => !storeCategories.Any(y => y.Id == x.Id));
                var takeStoreCategorySizes = storeByUser.Value.StoreCategories.SelectMany(x => x.StoreCategorySizes);
                var removeStoreCategorySizes = takeStoreCategorySizes.Where(x => !storeCategories.SelectMany(y => y.StoreCategorySizes).Any(z => z.Id == x.Id));

                if (removeStoreCategies.Count() > 0)
                {
                    foreach (var toRemove in storeByUser.Value.StoreCategories)
                    {
                        if (removeStoreCategies.Where(x => x.Id == toRemove.Id).Any())
                        {
                            _dbContext.Entry(toRemove).State = EntityState.Deleted;

                            foreach (var detail in toRemove.StoreCategorySizes)
                            {
                                _dbContext.Entry(detail).State = EntityState.Deleted;
                            }
                        }
                    }
                }

                if (removeStoreCategorySizes.Count() > 0)
                {
                    foreach (var toCheck in storeByUser.Value.StoreCategories)
                    {
                        foreach (var toRemove in toCheck.StoreCategorySizes)
                        {
                            if (removeStoreCategorySizes.Where(x => x.Id == toRemove.Id).Any())
                            {
                                _dbContext.Entry(toRemove).State = EntityState.Deleted;
                            }
                        }
                    }
                }

                foreach (var toAdd in storeCategories)
                {
                    if (toAdd.Id != 0)
                    {
                        _dbContext.Entry(storeByUser.Value.StoreCategories.Where(x => x.Id == toAdd.Id).Single()).CurrentValues.SetValues(toAdd);

                        foreach (var toAddDetail in toAdd.StoreCategorySizes)
                        {
                            if (toAddDetail.Id != 0)
                            {
                                _dbContext.Entry(storeByUser.Value.StoreCategories.SelectMany(x => x.StoreCategorySizes).ToList()
                                .Where(x => x.Id == toAddDetail.Id).Single()).CurrentValues.SetValues(toAddDetail);
                            }
                            else
                            {
                                storeByUser.Value.StoreCategories.Where(w => w.Id == toAdd.Id).SingleOrDefault()
                                .StoreCategorySizes.Add(toAddDetail);

                                _dbContext.Entry(toAddDetail).State = EntityState.Added;
                            }
                        }
                    }
                    else
                    {
                        storeByUser.Value.StoreCategories.Add(toAdd);
                        _dbContext.Entry(toAdd).State = EntityState.Added;

                        foreach (var toAddDetail in toAdd.StoreCategorySizes)
                        {
                            storeByUser.Value.StoreCategories.SelectMany(x => x.StoreCategorySizes).ToList().Add(toAddDetail);
                            _dbContext.Entry(toAddDetail).State = EntityState.Added;
                        }
                    }
                }

                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return Error($"Prepare to add and update store category for = {ex} is unsuccessful.");
            }

            var storeWithImageURL = await _s3Service.GetImagesForStoreAsync(storeByUser.Value);

            return Ok(storeWithImageURL.Value);

        }

        public async Task<Result> AddStorePayment(ICollection<StorePayment> storePayments, User user)
        {
            var store = await GetStoreByUserId(user);

            if (store.HasErrors)
            {
                return Error($"{store.Errors}.");
            }

            try
            {
                var removePayment = store.Value.StorePayments.Where(x => !storePayments.Any(y => y.Id == x.Id));

                if (removePayment.Count() > 0)
                {
                    foreach (var item in store.Value.StorePayments)
                    {
                        if (removePayment.Where(x => x.Id == item.Id).Any())
                        {
                            _dbContext.Entry(item).State = EntityState.Deleted;
                        }
                    }
                }

                foreach (var item in storePayments)
                {
                    if (item.Id != 0)
                    {
                        _dbContext.Entry(store.Value.StorePayments.Where(x => x.Id == item.Id).Single()).CurrentValues.SetValues(item);
                    }
                    else
                    {
                        store.Value.StorePayments.Add(item);
                        _dbContext.Entry(item).State = EntityState.Added;
                    }
                }

                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return Error($"Prepare to add and update education for = {ex} is unsuccessful.");
            }

            var storeWithImageURL = await _s3Service.GetImagesForStoreAsync(store.Value);

            return Ok(storeWithImageURL.Value);
        }

        private async Task<List<StoreSummary>> GetAllStore()
        {
            var result = await _dbContext.StoreSummaries.AsNoTracking()
                            .Include(b => b.StoreCategories).ThenInclude(c => c.StoreCategorySizes)
                            .Include(b => b.StorePayments)
                            .ToListAsync();

            return result;
        }

        private async Task<Result<StoreSummary>> GetStoreByUserId(User user)
        {
            if (user == null)
            {
                return Error<StoreSummary>($"Prepare to add and update education for = is unsuccessful.");
            }

            var result = await _dbContext.StoreSummaries.Where(a => a.User == user)
                            .Include(b => b.StoreCategories).ThenInclude(c => c.StoreCategorySizes)
                            .Include(b => b.StoreCategories).ThenInclude(c => c.admStoreCategory)
                            .Include(b => b.StorePayments)
                            .SingleOrDefaultAsync();

            return Ok(result);
        }

        private async Task<Result<StoreSummary>> GetStoreByStoreSummaryId(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return Error<StoreSummary>($"Prepare to add and update education for = is unsuccessful.");
            }

            var result = await _dbContext.StoreSummaries.Where(a => a.Id == long.Parse(id))
                            .Include(b => b.StoreCategories).ThenInclude(c => c.StoreCategorySizes)
                            .Include(b => b.StorePayments)
                            .SingleOrDefaultAsync();

            return Ok(result);
        }

        private async Task<List<AdmStoreCategory>> GetAdmCategories()
        {
            var result = await _dbContext.AdmStoreCategories.ToListAsync();

            return result;
        }

        public async Task<Result<AdmStoreCategory>> GetAdmCategoryById(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return Error<AdmStoreCategory>($"Prepare to add and update education for = is unsuccessful.");
            }

            var result = await _dbContext.AdmStoreCategories.Where(x => x.Id == long.Parse(id)).SingleOrDefaultAsync();

            if (result == null)
            {
                return Error<AdmStoreCategory>($"Prepare to add and update education for = is unsuccessful.");
            }

            return Ok(result);
        }
    }
}