using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UtsavVista.Data.Models
{
    public class ApprovedEvent
    {
        public int ApprovedEventID { get; set; }
        public int? RequestID { get; set; }
        public DateTime ApprovalDate { get; set; }
        public int ActualVenue { get; set; }
        public decimal TotalCostToCustomer { get; set; }
    }
}
