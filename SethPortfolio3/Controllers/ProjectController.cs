using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SethPortfolio.Controllers
{
    public class ProjectController : Controller
    {
        public IActionResult JsPrimes()
        {
            return View();
        }

        public IActionResult LamplighterFineGifts()
        {
            return View();
        }

        public IActionResult NtcSyllabusGenerator()
        {
            return View();
        }

        public IActionResult ShippingAndReceivingDataSystem()
        {
            return View();
        }
    }
}