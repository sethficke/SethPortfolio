using Microsoft.AspNetCore.Mvc;
using SethPortfolio3.Models.Statistics;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SethPortfolio3.Controllers
{
    public class EventController : Controller
    {
        private static ConcurrentBag<Event> events = new ConcurrentBag<Event>();

        [HttpPost]
        public void PostEvent(string type)
        {
            Event e = new Event(type);
            events.Add(e);
        }
        [HttpGet]
        [ResponseCache(VaryByHeader = "User-Agent", Duration = 10)]
        public async Task<int> CountEvents(string type)
        {
            int count = 0;
            await events.ToAsyncEnumerable().ForEachAsync((e) =>
            {
                if (type == e.Type) count++;
            });
            return count;
        }
    }
}
