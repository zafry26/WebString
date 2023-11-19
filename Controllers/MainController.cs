using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using RCB.JavaScript.Infrastructure;
using RCB.JavaScript.Models;

namespace RCB.JavaScript.Controllers
{
    public class MainController : ControllerBase
    {
        private readonly DatabaseContext _databaseContext;

        public MainController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public IActionResult Index()
        {
            // var webSessionContext = new WebSessionContext
            // {
            //     Ssr = new SsrSessionData
            //     {
            //         Cookie = string.Join(", ", Request.Cookies.Select(x => $"{x.Key}={x.Value};"))
            //     },
            //     Isomorphic = new IsomorphicSessionData
            //     {
            //         ServiceUser = ServiceUser
            //     }
            // };

            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}