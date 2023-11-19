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
    public class DeveloperService : ServiceBase
    {
        private IConfiguration _config;
        private DatabaseContext _dbContext;

        public DeveloperService(IConfiguration config, DatabaseContext dbContext)
        {
            _dbContext = dbContext;
            _config = config;
        }

        // public async Result<List<PersonModel>> GetAll()
        // {
        //     // var result =
        //     //     PeopleList
        //     //     // .Where(x =>
        //     //     //     x.FirstName.ToLower().Contains(term) ||
        //     //     //     x.LastName.ToLower().Contains(term)
        //     //     // )
        //     //     .ToList();

        //     return Ok();


        //     //return Ok(PeopleList);
        // }

        public async Task<Result> Search(string term = null)
        {
            if (!string.IsNullOrEmpty(term))
            {
                term = term.ToLower();
                term = term.Trim();

                var resultSearch =
                    _dbContext.Developers
                    .Where(x =>
                        x.Username.ToLower().Contains(term) ||
                        x.Email.ToLower().Contains(term)
                    )
                    .ToList();

                return Ok(resultSearch);
            }

            var resultAll =
                  _dbContext.Developers.ToList();

            return Ok(resultAll);
        }

        public async Task<Result> Add(Developer model)
        {
            if (model == null)
            {
                return Error($"Developer info is null");
            }

            TrimStrings(model);

            var personExists =
                 _dbContext.Developers
                .Any(x =>
                    x.Username == model.Username &&
                    x.Email == model.Email
                    );
            if (personExists)
            {
                return Error($"Developer with the same username and email already exists.");
            }

            _dbContext.Developers.Add(model);
            await _dbContext.SaveChangesAsync();

            return Ok(model);
        }

        public async Task<Result> Update(Developer model)
        {
            if (model == null)
            {
                return Error($"Developer info is null");
            }

            TrimStrings(model);

            var developer = _dbContext.Developers.SingleOrDefault(x => x.Id == model.Id);

            if (developer == null)
            {
                return Error("Developer with id is not exist");
            }

            _dbContext.Entry(developer).CurrentValues.SetValues(model);

            await _dbContext.SaveChangesAsync();

            return Ok(developer);
        }

        public async Task<Result> Delete(int id)
        {
            var developer = _dbContext.Developers.Where(x => x.Id == id).SingleOrDefault();

            if (developer == null)
                return Error($"Can't find person with Id = {id}.");

            _dbContext.Developers.Remove(developer);

            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        private static void TrimStrings(Developer model)
        {
            model.Username = model.Username.Trim();
            model.Email = model.Email.Trim();
            model.PhoneNumber = model.PhoneNumber.Trim();
            model.Skillsets = model.Skillsets.Trim();
            model.Hobby = model.Hobby.Trim();
        }
    }
}
