using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCB.JavaScript.Models;
using RCB.JavaScript.Services;
using RCB.JavaScript.DTO;
using System.Threading.Tasks;

namespace RCB.JavaScript.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class DeveloperController : ControllerBase
    {
        private DeveloperService _developerService;
        private AccountService _accountService;

        public DeveloperController(DeveloperService developerService, AccountService accountService)
        {
            _developerService = developerService;
            _accountService = accountService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Search([FromQuery] string term = null)
        {
            var result = await _developerService.Search(term);

            return Json(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Add(DeveloperDto model)
        {
            if (model == null)
                return BadRequest($"{nameof(model)} is null.");

            var user = await _accountService.GetUserByToken(HttpContext);

            Developer developer = new Developer();
            developer.Username = model.Username;
            developer.Email = model.Email;
            developer.PhoneNumber = model.PhoneNumber;
            developer.Skillsets = model.Skillsets;
            developer.Hobby = model.Hobby;
            developer.CreatedBy = user.Value.Id;

            var result = await _developerService.Add(developer);
            return Json(result);
        }

        [HttpPatch("{id:int}")]
        public async Task<IActionResult> Update(DeveloperDto model)
        {
            if (model == null)
                return BadRequest($"{nameof(model)} is null.");

            var user = await _accountService.GetUserByToken(HttpContext);

            Developer developer = new Developer();
            developer.Id = !string.IsNullOrEmpty(model.Id) ? int.Parse(model.Id) : 0;
            developer.Username = model.Username;
            developer.Email = model.Email;
            developer.PhoneNumber = model.PhoneNumber;
            developer.Skillsets = model.Skillsets;
            developer.Hobby = model.Hobby;

            var result = await _developerService.Update(developer);
            return Json(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
                return BadRequest($"{nameof(id)} <= 0.");

            var result = await _developerService.Delete(id);
            return Json(result);
        }
    }
}