using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Utilities;
using RCB.JavaScript.DTO;
using RCB.JavaScript.Models;
using RCB.JavaScript.Services;

namespace RCB.JavaScript.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WebCastController : ControllerBase
    {
        private WebCastService _webCastService;
        private AccountService _accountService;
        //private S3Service _s3Service;

        public WebCastController(WebCastService webCastService, AccountService accountService)
        {
            _webCastService = webCastService;
            _accountService = accountService;
            //_s3Service = s3Service;
        }

        [HttpGet("Heroes")]
        public async Task<IActionResult> Heroes()
        {
            var result = await _webCastService.GetAll();

            return Json(result);
        }

        [HttpGet("hero/{id:int?}")]
        public async Task<IActionResult> Hero(int id)
        {
            //standout
            if (id != 0)
            {
                var result = await _webCastService.GetHero(id);
                return Json(result);
            }
            //standout backend 
            else
            {
                var user = await _accountService.GetUserByToken(HttpContext);
                var result = await _webCastService.GetHero(user.Value);
                return Json(result);
            }
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> Hero([FromBody] HeroDto heroDto)
        {
            var user = await _accountService.GetUserByToken(HttpContext);

            if (user.Value == null)
            {
                return Json(user);
            }

            Hero hero = new Hero();
            hero.FullName = heroDto.FullName;
            hero.DisplayName = heroDto.DisplayName;
            hero.FbUrl = heroDto.FbUrl;
            hero.InstagramUrl = heroDto.InstagramUrl;
            hero.LinkedInUrl = heroDto.LinkedInUrl;
            hero.Standout = heroDto.Standout;
            //hero.BackgroundImage = !string.IsNullOrEmpty(_s3Service.GetKeyUrl(heroDto.BackgroundImage)) ? _s3Service.GetKeyUrl(heroDto.BackgroundImage) : heroDto.BackgroundImage;
            hero.CreatedBy = 1;
            hero.User = user.Value;

            var result = await _webCastService.AddHero(hero, user.Value);

            return Json(result);
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> HeroSummary([FromBody] HeroSummaryDto heroSummaryDto)
        {
            var user = await _accountService.GetUserByToken(HttpContext);

            if (user.Value == null)
            {
                return Json(user);
            }

            HeroSummary heroSummary = new HeroSummary();
            heroSummary.City = heroSummaryDto.City;
            heroSummary.State = heroSummaryDto.State;
            heroSummary.Country = heroSummaryDto.Country;
            heroSummary.Summary = heroSummaryDto.Summary;
            heroSummary.Email = heroSummaryDto.Email;
            heroSummary.CreatedBy = user.Value.Id;

            var result = await _webCastService.AddHeroSummary(heroSummary, user.Value);

            return Json(result);
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> HeroEducation([FromBody] IEnumerable<HeroEducationDto> heroEducationDtos)
        {
            var user = await _accountService.GetUserByToken(HttpContext);

            if (user.Value == null)
            {
                return Json(user);
            }

            if (heroEducationDtos == null)
            {
                return Json(Ok());
            }

            List<HeroEducation> heroEducations = new List<HeroEducation>();

            // Read and insert list dto into list entity
            foreach (var item in heroEducationDtos)
            {
                heroEducations.Add(new HeroEducation
                {
                    Id = item.Id ?? 0,
                    Qualification = item.Qualification,
                    University = item.University,
                    FromYear = item.FromYear,
                    ToYear = item.ToYear,
                    State = item.State,
                    Country = item.Country,
                    CreatedBy = user.Value.Id,
                });
            }

            var result = await _webCastService.AddHeroEducation(heroEducations, user.Value);

            return Json(result);
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> HeroExperience([FromBody] IEnumerable<HeroExperienceDto> heroExperienceDtos)
        {
            var user = await _accountService.GetUserByToken(HttpContext);

            if (user.Value == null)
            {
                return Json(user);
            }

            List<HeroExperience> heroExperiences = new List<HeroExperience>();

            // Read and insert list dto into list entity
            foreach (var item in heroExperienceDtos)
            {
                List<HeroExperienceDetail> heroExperienceDetails = new List<HeroExperienceDetail>();

                if (item.HeroExperienceDetails != null && item.HeroExperienceDetails.Count > 0)
                {
                    // Read and insert array string into list entity
                    foreach (HeroExperienceDetailsDto workscope in item.HeroExperienceDetails)
                    {
                        heroExperienceDetails.Add(new HeroExperienceDetail
                        {
                            Id = workscope.Id ?? 0,
                            WorkScope = workscope.WorkScope,
                            CreatedBy = user.Value.Id
                        });
                    }
                }

                heroExperiences.Add(new HeroExperience
                {
                    Id = item.Id ?? 0,
                    PositionTitle = item.PositionTitle,
                    FromYear = item.FromYear,
                    ToYear = item.ToYear,
                    Company = item.Company,
                    State = item.State,
                    Country = item.Country,
                    City = item.City,
                    CreatedBy = user.Value.Id,
                    HeroExperienceDetails = heroExperienceDetails
                });
            }

            var result = await _webCastService.AddHeroExperience(heroExperiences, user.Value);

            return Json(result);
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> HeroService([FromBody] IEnumerable<HeroServiceDto> heroServiceDtos)
        {
            var user = await _accountService.GetUserByToken(HttpContext);

            if (user.Value == null)
            {
                return Json(user);
            }

            List<HeroService> heroService = new List<HeroService>();

            // Read and insert list dto into list entity
            foreach (var item in heroServiceDtos)
            {
                heroService.Add(new HeroService
                {
                    Id = item.Id ?? 0,
                    //Image = !string.IsNullOrEmpty(_s3Service.GetKeyUrl(item.Image)) ? _s3Service.GetKeyUrl(item.Image) : item.Image,
                    Title = item.Title,
                    Detail = item.Detail,
                    CreatedBy = user.Value.Id
                });
            }

            var result = await _webCastService.AddHeroService(heroService, user.Value);

            return Json(result);
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> HeroPortfolio([FromBody] IEnumerable<HeroPortfolioDto> heroPortfolioDtos)
        {
            var user = await _accountService.GetUserByToken(HttpContext);

            if (user.Value == null)
            {
                return Json(user);
            }

            List<HeroPortfolio> heroPortfolios = new List<HeroPortfolio>();

            // Read and insert list dto into list entity
            foreach (var item in heroPortfolioDtos)
            {
                List<HeroPortfolioImage> heroPortfolioImages = new List<HeroPortfolioImage>();

                if (item.HeroPortfolioDetails != null && item.HeroPortfolioDetails.HeroPortfolioImages.Count > 0)
                {
                    // Read and insert array string into list entity
                    foreach (HeroPortfolioImagesDto value in item.HeroPortfolioDetails.HeroPortfolioImages)
                    {
                        heroPortfolioImages.Add(new HeroPortfolioImage
                        {
                            Id = value.Id ?? 0,
                            //Image = !string.IsNullOrEmpty(_s3Service.GetKeyUrl(value.Image)) ? _s3Service.GetKeyUrl(value.Image) : value.Image,
                            CreatedBy = user.Value.Id
                        });
                    }
                }

                heroPortfolios.Add(new HeroPortfolio
                {
                    Id = item.Id ?? 0,
                    //Image = !string.IsNullOrEmpty(_s3Service.GetKeyUrl(item.Image)) ? _s3Service.GetKeyUrl(item.Image) : item.Image,
                    Title = item.Title,
                    Category = item.Category,
                    CreatedBy = user.Value.Id,
                    HeroPortfolioDetails = new HeroPortfolioDetail()
                    {
                        Id = item.HeroPortfolioDetails.Id ?? 0,
                        Title = item.HeroPortfolioDetails.Title,
                        Detail = item.HeroPortfolioDetails.Detail,
                        CreatedBy = user.Value.Id,
                        HeroPortfolioImages = heroPortfolioImages
                    }
                });
            }

            var result = await _webCastService.AddHeroPortfolio(heroPortfolios, user.Value);

            return Json(result);
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> HeroTechnical([FromBody] IEnumerable<HeroTechnicalDto> heroTechnicalDtos)
        {
            var user = await _accountService.GetUserByToken(HttpContext);

            if (user.Value == null)
            {
                return Json(user);
            }

            List<HeroTechnical> heroTechnicals = new List<HeroTechnical>();

            // Read and insert list dto into list entity
            foreach (var item in heroTechnicalDtos)
            {
                heroTechnicals.Add(new HeroTechnical
                {
                    //Image = !string.IsNullOrEmpty(_s3Service.GetKeyUrl(item.Image)) ? _s3Service.GetKeyUrl(item.Image) : item.Image,
                    Title = item.Title,
                    Detail = item.Detail,
                    CreatedBy = user.Value.Id
                });
            }

            var result = await _webCastService.AddHeroTechnical(heroTechnicals, user.Value);

            return Json(result);
        }
    }
}
