using Microsoft.AspNetCore.Mvc;
using UtsavVista.Data;
using UtsavVista.Data.Models;

namespace UtsavVista.Web.Controllers
{
    [Route("/")]
    [Controller]
    public class EventController : ControllerBase
    {
        private readonly EventDbContext dbcontext;
        public EventController(EventDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        [HttpPost("user/register")]
        public ActionResult<UserInfo> Register([FromBody] Register user)
        {
            if (user == null)
            {
                throw new Exception("user details cannot be empty");
            }

            var isUserAvailable = this.dbcontext.Users.Any(u => u.Email == user.Email);

            if (isUserAvailable)
            {
                throw new Exception("Username or Email are already available please Login or user Different Username and Email");
            }

            User registerUser = new User()
            {
                Name = user.Name,
                Email = user.Email,
                Password = user.Password,
                UserType = "",
            };

            this.dbcontext.Users.Add(registerUser);
            this.dbcontext.SaveChanges();

            var currentUser = this.dbcontext.Users.FirstOrDefault(u => u.Email == user.Email);

            if (currentUser != null)
            {
                if (user.Email.ToLower().Contains("eventvista"))
                {
                    currentUser.UserType = "staff";
                    this.dbcontext.Users.Update(currentUser);

                    Staff staff = new Staff()
                    {
                        UserID = currentUser.UserID,
                        StaffName = user.Name,
                        Position = "admin",
                    };
                    this.dbcontext.Staffs.Add(staff);
                }

                this.dbcontext.SaveChanges();

                UserInfo userInfo = new UserInfo()
                {
                    Email = currentUser.Email,
                    UserName = currentUser.Name,
                    UserType = currentUser.UserType
                };

                return this.Ok(userInfo);
            }
            else
            {
                throw new Exception("user not registered please try again!");
            }
        }

        [HttpPost("user/login")]
        public ActionResult<UserInfo> UserLogin([FromBody] Login login)
        {
            if (login == null)
            {
                throw new Exception("please fill details");
            }

            var user = this.dbcontext.Users.FirstOrDefault(u => u.Email == login.username && u.Password == login.password);

            if (user == null)
            {
                throw new Exception("Invalid Email of password");
            }

            UserInfo currentUser = new UserInfo()
            {
                UserName = user.Name,
                UserType = user.UserType,
                Email = user.Email,
            };

            return this.Ok(currentUser);
        }

        [HttpPost("event/request")]
        public ActionResult<List<VenueSuggestion>> SaveRequest([FromQuery] string email, [FromBody] RequestEvent request)
        {
            if (request == null)
            {
                throw new Exception("Request cannot be empty");
            }

            if (string.IsNullOrWhiteSpace(email))
            {
                throw new Exception("email cannot be empty");
            }

            var user = this.dbcontext.Users.FirstOrDefault(u => u.Email == email);

            if (user == null)
            {
                throw new Exception("Invalid credentials");
            }

            var availableVenues = dbcontext.venues
                                .Where(v => v.City == request.City &&
                                            v.Capacity >= request.NumberOfPeoples &&
                                            (v.costs >= request.Budget - 10000 || v.costs <= request.Budget + 10000))
                                .ToList();

            if (!availableVenues.Any())
            {
                throw new Exception("No venue found");
            }

            List<VenueSuggestion> suggestions = new List<VenueSuggestion>();

            foreach (var venue in availableVenues)
            {
                if (this.IsVenueAvailableOnDate(venue.VenueID, request.EventDate))
                {
                    suggestions.Add(new VenueSuggestion()
                    {
                        VenuID = venue.VenueID,
                        VenueAddress = venue.Address,
                        TotalCost = venue.costs,
                        TimeOfEvent = request.EventDate,
                        DateOfEvent = request.EventDate,
                    });
                }
                else
                {
                    continue;
                }
            }

            var max = this.dbcontext.EventRequests.Any() ? this.dbcontext.EventRequests.Max(e => (int?)e.RequestID) : null;
            if (max == null)
            {
                max = 1;
            }
            else
            {
                max = max + 1;
            }

            EventRequest eventRequest = new EventRequest()
            {
                EventDate = request.EventDate,
                EventName = request.EventName,
                EventType = request.EventType,
                UserID = user.UserID,
                NumberOfPeoples = request.NumberOfPeoples,
                City = request.City,
                Budget = 15000,
                Status = "Pending",
                RejectionReason = "",
                RevisionReason = "",
            };

            this.dbcontext.Add(eventRequest);
            this.dbcontext.SaveChanges();

            return this.Ok(suggestions);
        }

        [HttpPost("event/{eventId}/venue/{VenueId}")]
        public ActionResult<EventWithVenueResponse> SetVenue(int eventId, int VenueId)
        {
            if (eventId < 0)
            {
                throw new Exception("Event ID cannot be less than zero");
            }

            if (VenueId < 0)
            {
                throw new Exception("Venue ID Cannot be less than zero");
            }

            var Venue = this.dbcontext.venues.FirstOrDefault(v => v.VenueID == VenueId);
            var EventRequest = this.dbcontext.EventRequests.FirstOrDefault(e => e.RequestID == eventId);

            if (EventRequest == null)
            {
                throw new Exception("Cannot find event with eventID {eventId}");
            }

            if (Venue == null)
            {
                throw new Exception("Cannot find event with Venue {venueId}");
            }

            EventRequest.VenuePreference = Venue.VenueID;
            EventRequest.Status = "approved";
            EventRequest.RevisionReason = string.Empty;

            this.dbcontext.Update(EventRequest);

            ApprovedEvent approved = new ApprovedEvent()
            {
                RequestID = EventRequest.RequestID,
                ApprovalDate = DateTime.Today,
                TotalCostToCustomer = Venue.costs,
                ActualVenue = Venue.VenueID,
            };

            this.dbcontext.ApprovedEvents.Add(approved);
            this.dbcontext.SaveChanges();

            var approvedEvent = this.dbcontext.ApprovedEvents.FirstOrDefault(ae => ae.RequestID == EventRequest.RequestID);

            if (approvedEvent == null)
            {
                throw new Exception("Try again");
            }

            EventFinance eventFinance = new EventFinance()
            {
                ApprovedEventID = approvedEvent.ApprovedEventID,
                Paid = 0,
                YetToPay = Venue.costs
            };

            this.dbcontext.Add(eventFinance);
            this.dbcontext.SaveChanges();

            EventWithVenueResponse events = new EventWithVenueResponse()
            {
                EventName = EventRequest.EventName,
                Venue = Venue.VenueName,
                EventDate = EventRequest.EventDate,
                Cost = eventFinance.TotalCostToCustomer,
                NoOfPeoples = EventRequest.NumberOfPeoples,
                EventType = EventRequest.EventType,
                VenueType = Venue.VenueType,
                Address = Venue.Address,
                City = Venue.City,
            };

            return this.Ok(events);
        }

        [HttpPut("event/{eventId}/reject")]
        public ActionResult<string> RejectEvent(int eventId, string reason = "")
        {
            if (eventId < 1)
            {
                throw new Exception("eventID should not be less than 0");
            }

            var eventRequest = this.dbcontext.EventRequests.FirstOrDefault(er => er.RequestID == eventId);

            if (eventRequest == null)
            {
                throw new Exception("Event not found");
            }
            eventRequest.Status = "rejected";
            eventRequest.RejectionReason = reason;

            this.dbcontext.EventRequests.Update(eventRequest);
            this.dbcontext.SaveChanges();

            return this.Ok("rejected");
        }

        [HttpPost("event/{eventId}/payment/{amount}")]
        public ActionResult<EventFinance> AddPayment(int eventId, decimal amount)
        {
            if (eventId < 1)
            {
                throw new Exception("eventId cannot be zero or negative numbers");
            }

            var eventRequest = this.dbcontext.ApprovedEvents.FirstOrDefault(er => er.RequestID == eventId);

            if (eventRequest == null)
            {
                throw new Exception("Cannot find event");
            }

            var eventFin = this.dbcontext.EventFinances.FirstOrDefault(ef => ef.ApprovedEventID == eventRequest.ApprovedEventID);
            if (eventFin == null)
            {
                throw new Exception("Cannot find event");
            }

            if (amount < 1000 && eventFin.YetToPay > 1000)
            {
                throw new Exception("Amounts below 1000 are not accepted");
            }

            eventFin.Paid = eventFin.Paid + amount;
            eventFin.YetToPay = eventFin.Paid - amount;

            this.dbcontext.EventFinances.Update(eventFin);
            this.dbcontext.SaveChanges();

            return this.Ok(eventFin);
        }

        [HttpGet("event/user/{email}")]
        public ActionResult<EventRequest> GetEventRequestByUser(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new Exception("Email Cannot be empty");
            }

            var user = this.dbcontext.Users.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            var requestByUser = this.dbcontext.EventRequests.Where(er => er.UserID == user.UserID).ToList();

            return this.Ok(requestByUser);
        }

        [HttpGet("event/approved")]
        public ActionResult<List<EventWithVenueResponse>> GetAllApprovedEvents()
        {
            var approvedEvents = this.dbcontext.ApprovedEvents.ToList();

            List<EventWithVenueResponse> reponseList = new List<EventWithVenueResponse>();

            foreach (var eve in approvedEvents)
            {
                var venue = this.dbcontext.venues.FirstOrDefault(v => v.VenueID == eve.ActualVenue);
                var eventReq = this.dbcontext.EventRequests.FirstOrDefault(er => er.RequestID == eve.RequestID);

                reponseList.Add(new EventWithVenueResponse()
                {
                    EventName = eventReq!.EventName,
                    Venue = venue == null ? null : venue.VenueName,
                    EventDate = eventReq.EventDate,
                    Cost = eve.TotalCostToCustomer,
                    NoOfPeoples = eventReq.NumberOfPeoples,
                    EventType = eventReq.EventType,
                    VenueType = venue == null ? null : venue.VenueType,
                    Address = venue == null ? null : venue.Address,
                    City = venue == null ? null : venue.City,
                });
            }
            return this.Ok(reponseList);
        }

        [HttpGet("event/{approvedEvent}/finance")]
        public ActionResult<EventFinance> eventFinance(int approvedEvent)
        {
            if(approvedEvent < 1)
            {
                throw new Exception("Cannot find event");
            }

            var eventFinance = this.dbcontext.EventFinances.FirstOrDefault(ef =>ef.ApprovedEventID == approvedEvent);

            return this.Ok(eventFinance);
        }

        private bool IsVenueAvailableOnDate(int venueId, DateTime eventDate)
        {
            return !dbcontext.EventRequests.Any(e =>
                e.VenuePreference == venueId &&
                e.EventDate == eventDate &&
                e.Status == "Approved");
        }
    }
}
