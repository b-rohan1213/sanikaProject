using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UtsavVista.Data.Models
{
    public class EventRequest
    {
        public int RequestID { get; set; }
        public int UserID { get; set; }
        public string EventName { get; set; }
        public string EventType { get; set; }
        public DateTime EventDate { get; set; }
        public int VenuePreference { get; set; }
        public int NumberOfPeoples { get; set; }
        public string City { get; set; }
        public decimal Budget { get; set; }
        public string Status { get; set; }
        public string RejectionReason { get; set; }
        public string RevisionReason { get; set; }
    }

}
