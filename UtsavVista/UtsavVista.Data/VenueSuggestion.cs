using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UtsavVista.Data
{
    public class VenueSuggestion
    {
        public int VenuID { get; set; }
        public string VenueAddress { get; set; }
        public decimal TotalCost { get; set; }
        public DateTime TimeOfEvent { get; set; }
        public DateTime DateOfEvent { get; set; }
    }
}
