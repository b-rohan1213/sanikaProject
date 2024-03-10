using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UtsavVista.Data
{
    public class RequestEvent
    {
        public string EventName { get; set; }
        public string EventType { get; set; }
        public DateTime EventDate { get; set; }
        public int NumberOfPeoples { get; set; }
        public string City { get; set; }
        public decimal Budget { get; set; }
    }
}
