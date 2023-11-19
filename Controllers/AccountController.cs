using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RCB.JavaScript.DTO;
using RCB.JavaScript.Services;

namespace RCB.JavaScript.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("[action]")]
        public IActionResult LoginAsync([FromBody] LoginDto model)
        {
            var result = _accountService.Login(model.Username, model.Password);

            return Json(result.Result);
        }

        [HttpPost("[action]")]
        public IActionResult RegisterAsync([FromBody] RegisterDto model)
        {
            var result = _accountService.Register(model);

            return Json(result.Result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> LogoutAsync()
        {
            //var result = AccountService.Logout(HttpContext);
            //await HttpContext.SignOutAsync(
            //CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok();
            //return Json(result);
        }
    }
}
