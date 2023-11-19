using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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
    public class WebShopController : ControllerBase
    {
        private WebShopService _webShopService;
        private AccountService _accountService;
        private S3Service _s3Service;

        public WebShopController(WebShopService webShopService, AccountService accountService, S3Service s3Service)
        {
            _webShopService = webShopService;
            _accountService = accountService;
            _s3Service = s3Service;
        }

        [Authorize]
        [HttpGet("admStoreCategories")]
        public async Task<IActionResult> AdmStoreCategories()
        {
            var user = await _accountService.GetUserByToken(HttpContext);

            if (user.Value == null)
            {
                return Json(user);
            }

            var result = await _webShopService.GetAllAdmStoreCategory();
            return Json(result);
        }


        [HttpGet("store/{id?}")]
        public async Task<IActionResult> Store(string id)
        {
            //standout
            if (!string.IsNullOrEmpty(id))
            {
                var result = await _webShopService.GetStore(id);
                return Json(result);
            }
            //standout backend 
            else
            {
                var user = await _accountService.GetUserByToken(HttpContext);
                var result = await _webShopService.GetStore(user.Value);
                return Json(result);
            }
        }


        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> StoreSummary([FromBody] StoreSummaryDto storeSummaryDto)
        {
            var user = await _accountService.GetUserByToken(HttpContext);

            if (user.Value == null)
            {
                return Json(user);
            }

            StoreSummary storeSummary = new StoreSummary();
            storeSummary.StoreName = storeSummaryDto.StoreName;
            storeSummary.FbUrl = storeSummaryDto.FbUrl;
            storeSummary.InstagramUrl = storeSummaryDto.InstagramUrl;
            storeSummary.LinkedInUrl = storeSummaryDto.LinkedInUrl;
            storeSummary.Standout = storeSummaryDto.Standout;
            storeSummary.Logo = !string.IsNullOrEmpty(_s3Service.GetKeyUrl(storeSummaryDto.Logo)) ? _s3Service.GetKeyUrl(storeSummaryDto.Logo) : storeSummaryDto.Logo;
            storeSummary.CreatedBy = 1;
            storeSummary.User = user.Value;

            var result = await _webShopService.AddStore(storeSummary, user.Value);

            return Json(result);
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> StoreCategory([FromBody] IEnumerable<StoreCategoryDto> storeCategoryDtos)
        {
            var user = await _accountService.GetUserByToken(HttpContext);

            if (user.Value == null)
            {
                return Json(user);
            }

            List<StoreCategory> storeCategories = new List<StoreCategory>();

            // Read and insert list dto into list entity
            foreach (var item in storeCategoryDtos)
            {
                List<StoreCategorySize> storeCategorySizes = new List<StoreCategorySize>();

                if (item.StoreCategorySizes != null && item.StoreCategorySizes.Count > 0)
                {
                    // Read and insert array string into list entity
                    foreach (StoreCategorySizesDto storeCategorySizesDto in item.StoreCategorySizes)
                    {
                        storeCategorySizes.Add(new StoreCategorySize
                        {
                            Id = storeCategorySizesDto.Id ?? 0,
                            SizeCode = storeCategorySizesDto.SizeCode,
                            SizeName = storeCategorySizesDto.SizeCode,
                            CreatedBy = user.Value.Id
                        });
                    }
                }


                var admStoreCategories = await _webShopService.GetAdmCategoryById(item.CategoryId);

                if (admStoreCategories.HasErrors)
                {
                    return Json(admStoreCategories.Errors);
                }

                storeCategories.Add(new StoreCategory
                {
                    Id = item.Id ?? 0,
                    admStoreCategory = admStoreCategories.Value,
                    CreatedBy = user.Value.Id,
                    StoreCategorySizes = storeCategorySizes
                });
            }

            var result = await _webShopService.AddStoreCategory(storeCategories, user.Value);

            return Json(result);
        }
    }
}
