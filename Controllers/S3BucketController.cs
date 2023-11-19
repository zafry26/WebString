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
    public class S3BucketController : ControllerBase
    {
        private WebCastService _webCastService;
        private AccountService _accountService;
        private S3Service _s3Service;

        public S3BucketController(WebCastService webCastService, AccountService accountService, S3Service s3Service)
        {
            _webCastService = webCastService;
            _accountService = accountService;
            _s3Service = s3Service;
        }

        [HttpPost]
        public async Task<IActionResult> FileUploadForm([FromForm] ImageDto imageDto)
        {
            string name = imageDto.FileName;
            string extension = Path.GetExtension(imageDto.FileName);

            var result = await _s3Service.UploadFileAsync(imageDto.FormFile, "brick-n-mortar", imageDto.Module, imageDto.Section);

            return Json(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetFile([FromQuery] string path)
        {
            if (string.IsNullOrEmpty(path))
            {
                return Json(Ok());
            }

            var result = await _s3Service.GetFileAsync("brick-n-mortar", path);

            return Json(result);
        }
    }
}
