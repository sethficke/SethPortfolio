﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SethPortfolio.Controllers
{
    public class PrimesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}