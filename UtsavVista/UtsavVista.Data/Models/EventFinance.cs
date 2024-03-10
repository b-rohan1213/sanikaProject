using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UtsavVista.Data.Models
{
    public class EventFinance
    {
        public int FinanceID { get; set; }
        public int ApprovedEventID { get; set; }
        public decimal TotalCostToCustomer { get; set; }
        public decimal Paid { get; set; }
        public decimal YetToPay { get; set; }
    }
}
