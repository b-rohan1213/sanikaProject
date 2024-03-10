namespace UtsavVista.Data
{
    public class EventWithVenueResponse
    {
        public int approvedEvents { get; set; }
        public string EventName { get; set; }
        public string Venue { get; set; }
        public DateTime EventDate { get; set; }
        public decimal Cost { get; set; }
        public int NoOfPeoples { get; set; }
        public string EventType { get; set; }
        public string VenueType { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
    }
}
