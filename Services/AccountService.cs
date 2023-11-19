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

namespace RCB.JavaScript.Services
{
    public class AccountService : ServiceBase
    {
        private IConfiguration _config;
        private UserManager<User> userManager;

        public AccountService(IConfiguration config, UserManager<User> userManager)
        {
            _config = config;
            this.userManager = userManager;
        }

        public async Task<Result> Login(string email, string password)
        {
            //var user = AuthenticateUser(username, password);

            var user = await userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return Error($"Email with email = {email} does not exist.");
            }

            var tokenString = GenerateJSONWebToken(user);

            return Ok(new ServiceLogin { token = tokenString });
        }

        public async Task<Result> Register(RegisterDto registerModel)
        {
            var user = await userManager.FindByEmailAsync(registerModel.Email);

            if (user != null)
            {
                return Error($"User with email = {registerModel} already registered.");
            }

            // Copy data from RegisterViewModel to IdentityUser
            var userNew = new User
            {
                Name = registerModel.FullName,
                Email = registerModel.Email,
                UserName = registerModel.Username
            };
            // Create user
            var resultAddUser = await userManager.CreateAsync(userNew, registerModel.Password);

            if (!resultAddUser.Succeeded)
            {
                List<IdentityError> errorList = resultAddUser.Errors.ToList();
                var errors = string.Join(", ", errorList.Select(e => e.Description));

                return Error($"Error {errors}. Please try again later.");
            }

            return Ok("Register is Successfull");

        }

        public Result Logout(HttpContext user)
        {
            var principal = user.User as ClaimsPrincipal;
            var identity = principal.Identity as ClaimsIdentity;
            var claim = principal.Claims.Where(x => x.Type == ClaimTypes.Email).SingleOrDefault();
            identity.RemoveClaim(claim);

            return Ok();
        }

        private string GenerateJSONWebToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("DateOfJoin", user.Created.ToString("yyyy-MM-dd")),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(20),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<Result<User>> GetUserByToken(HttpContext user)
        {
            var identity = user.User.Identity as ClaimsIdentity;
            if (!identity.IsAuthenticated)
            {
                return Error<User>($"No user context defined.");
            }

            IEnumerable<Claim> claims = identity.Claims;

            if (!claims.Any())
            {
                return Error<User>($"Claims is empty");
            }

            var emailClaim = claims?.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault().Value;

            if (String.IsNullOrEmpty(emailClaim))
            {
                return Error<User>($"No user email defined.");
            }

            var userByClaim = await userManager.FindByEmailAsync(emailClaim);

            if (userByClaim == null)
            {
                return Error<User>($"Email does not exist.");
            }

            return Ok(userByClaim);
        }

        public async Task<Result<User>> GetUserById(string id)
        {
            var user = await userManager.FindByIdAsync(id);

            return Ok(user);
        }
    }
}