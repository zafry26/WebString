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
using System.Security.Claims;
using Amazon.S3;
using Amazon.S3.Model;
using System.Reflection;
using Amazon.S3.Util;
using Org.BouncyCastle.Utilities.Zlib;

namespace RCB.JavaScript.Services
{
    public class S3Service : ServiceBase
    {
        private IConfiguration _config;
        private readonly IAmazonS3 _s3Client;

        public S3Service(IConfiguration config, IAmazonS3 s3Client)
        {
            _config = config;
            _s3Client = s3Client;
        }

        public async Task<Result<string>> UploadFileAsync(IFormFile file, string bucketName, string module, string section)
        {
            var bucketExists = await _s3Client.DoesS3BucketExistAsync(bucketName);
            if (!bucketExists)
            {
                return Error<string>($"Bucket = {bucketName} does not exist.");
            }

            var request = new PutObjectRequest()
            {
                BucketName = bucketName,
                Key = string.IsNullOrEmpty(module) || string.IsNullOrEmpty(section) ? file.FileName : $"{module.TrimEnd('/')}/{section}/{file.FileName}_{new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds()}",
                InputStream = file.OpenReadStream()
            };

            // if (request.InputStream.Length < 2097152)
            // {
            //     return Error<string>($"Image size more than 2mb.");
            // }

            request.Metadata.Add("Content-Type", file.ContentType);
            await _s3Client.PutObjectAsync(request);

            var s3FullPath = await GetFileAsync("brick-n-mortar", request.Key);

            return Ok(s3FullPath.Value);
        }

        public async Task<Result> GetAllFilesAsync(string bucketName, string? prefix)
        {
            var bucketExists = await _s3Client.DoesS3BucketExistAsync(bucketName);
            if (!bucketExists) return Error($"Bucket {bucketName} does not exist.");
            var request = new ListObjectsV2Request()
            {
                BucketName = bucketName,
                Prefix = prefix
            };
            var result = await _s3Client.ListObjectsV2Async(request);
            var s3Objects = result.S3Objects.Select(s =>
            {
                var urlRequest = new GetPreSignedUrlRequest()
                {
                    BucketName = bucketName,
                    Key = s.Key,
                    Expires = DateTime.UtcNow.AddMinutes(1)
                };
                return new S3ObjectDto()
                {
                    Name = s.Key.ToString(),
                    PresignedUrl = _s3Client.GetPreSignedURL(urlRequest),
                };
            });
            return Ok(s3Objects);
        }

        public async Task<Result<string>> GetFileAsync(string bucketName, string? key)
        {
            var bucketExists = await _s3Client.DoesS3BucketExistAsync(bucketName);

            if (!bucketExists)
            {
                return Error<string>($"Bucket = {bucketName} does not exist.");
            };

            if (!string.IsNullOrEmpty(key))
            {
                var isExist = await IsS3FileExists(bucketName, key);

                if (!isExist)
                {
                    return Ok("");
                }

                // Create a CopyObject request
                GetPreSignedUrlRequest request = new GetPreSignedUrlRequest
                {
                    BucketName = bucketName,
                    Key = key,
                    Expires = DateTime.Now.AddMinutes(5)
                };

                // Get path for request
                string path = _s3Client.GetPreSignedURL(request);

                return Ok(path);
            }

            return Ok("");
        }

        public async Task<Result<Hero>> GetImagesForHeroAsync(Hero hero)
        {
            foreach (PropertyInfo prop in hero.GetType().GetProperties())
            {
                if (prop.Name.Equals("BackgroundImage"))
                {
                    var path = prop.GetValue(hero, null) == null ? "" : prop.GetValue(hero, null);

                    var s3FullPath = await GetFileAsync("brick-n-mortar", path.ToString());
                    // manipulate
                    prop.SetValue(hero, s3FullPath.Value);
                }
            }

            foreach (HeroService heroService in hero.HeroServices ?? Enumerable.Empty<HeroService>())
            {
                var path = heroService.Image;

                var s3FullPath = await GetFileAsync("brick-n-mortar", path);

                heroService.Image = s3FullPath.Value;
            }

            foreach (HeroTechnical heroTechnical in hero.HeroTechnicals ?? Enumerable.Empty<HeroTechnical>())
            {
                var path = heroTechnical.Image;

                var s3FullPath = await GetFileAsync("brick-n-mortar", path);

                heroTechnical.Image = s3FullPath.Value;
            }

            foreach (HeroPortfolio heroPortfolio in hero.HeroPortfolios ?? Enumerable.Empty<HeroPortfolio>())
            {
                var path = heroPortfolio.Image;

                var s3FullPath = await GetFileAsync("brick-n-mortar", path);

                heroPortfolio.Image = s3FullPath.Value;

                foreach (HeroPortfolioImage heroPortfolioImage in heroPortfolio.HeroPortfolioDetails.HeroPortfolioImages ?? Enumerable.Empty<HeroPortfolioImage>())
                {
                    var pathDetail = heroPortfolioImage.Image;

                    var detailS3FullPath = await GetFileAsync("brick-n-mortar", pathDetail);

                    heroPortfolioImage.Image = detailS3FullPath.Value;
                }
            }

            return Ok(hero);
        }

        public async Task<Result<StoreSummary>> GetImagesForStoreAsync(StoreSummary storeSummary)
        {
            foreach (PropertyInfo prop in storeSummary.GetType().GetProperties())
            {
                if (prop.Name.Equals("Logo"))
                {
                    var path = prop.GetValue(storeSummary, null) == null ? "" : prop.GetValue(storeSummary, null);

                    var s3FullPath = await GetFileAsync("brick-n-mortar", path.ToString());
                    // manipulate
                    prop.SetValue(storeSummary, s3FullPath.Value);
                }
                // }

                // foreach (HeroService heroService in hero.HeroServices)
                // {
                //     var path = heroService.Image;

                //     var s3FullPath = await GetFileAsync("brick-n-mortar", path);

                //     heroService.Image = s3FullPath.Value;
                // }

                // foreach (HeroTechnical heroTechnical in hero.HeroTechnicals)
                // {
                //     var path = heroTechnical.Image;

                //     var s3FullPath = await GetFileAsync("brick-n-mortar", path);

                //     heroTechnical.Image = s3FullPath.Value;
                // }

                // foreach (HeroPortfolio heroPortfolio in hero.HeroPortfolios)
                // {
                //     var path = heroPortfolio.Image;

                //     var s3FullPath = await GetFileAsync("brick-n-mortar", path);

                //     heroPortfolio.Image = s3FullPath.Value;
            }

            return Ok(storeSummary);
        }

        public string GetKeyUrl(string path)
        {
            try
            {
                var uri = new AmazonS3Uri(path);

                var bucketName = uri.Bucket;
                var key = uri.Key;

                return key;
            }
            catch (UriFormatException ex)
            {
                return "";
            }
        }

        private async Task<bool> IsS3FileExists(string bucketName, string fileName)
        {
            try
            {
                // var s3Client = new AmazonS3Client();
                var request = new GetObjectMetadataRequest()
                {
                    BucketName = bucketName,
                    Key = fileName

                };

                var response = await _s3Client.GetObjectMetadataAsync(request);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public class S3ObjectDto
        {
            public string? Name { get; set; }
            public string? PresignedUrl { get; set; }
        }
    }
}