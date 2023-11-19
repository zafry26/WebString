using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using RCB.JavaScript.Services;
using RCB.JavaScript.Infrastructure;
using RCB.JavaScript.DTO;

namespace RCB.JavaScript.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        public IEmailSender EmailSender { get; set; }

        public EmailController(IEmailSender emailSender)
        {
            EmailSender = emailSender;
        }

        public async Task<IActionResult> Send([FromBody] EmailDto model)
        {
            var toAddress = "zafry08@gmail.com";

            await EmailSender.SendEmailAsync(toAddress, $"{model.FullName} send a message about {model.Subject}", model.Message);
            return Json("Your email has been received. Thank you.");
        }
    }
}
