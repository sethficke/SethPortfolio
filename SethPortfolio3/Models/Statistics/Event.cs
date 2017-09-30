using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SethPortfolio3.Models.Statistics
{
    public class Event
    {
        public Event(string type)
        {
            Type = type;    
        }

        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
    }
}
