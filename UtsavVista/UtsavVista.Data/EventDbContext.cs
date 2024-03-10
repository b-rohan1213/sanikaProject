using Microsoft.EntityFrameworkCore;
using UtsavVista.Data.Configuration;
using UtsavVista.Data.Models;

namespace UtsavVista.Data
{
    public class EventDbContext : DbContext
    {
        public EventDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Staff> Staffs { get; set; }

        public DbSet<Venue> venues { get; set; }

        public DbSet<EventRequest> EventRequests { get; set; }

        public DbSet<ApprovedEvent> ApprovedEvents { get; set; }

        public DbSet<EventFinance> EventFinances { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration<User>(new UserConfiguration());
            modelBuilder.ApplyConfiguration<Staff>(new StaffConfiguration());
            modelBuilder.ApplyConfiguration<Venue>(new VenueConfiguration());
            modelBuilder.ApplyConfiguration<EventRequest>(new EventRequestConfiguration());
            modelBuilder.ApplyConfiguration<ApprovedEvent>(new ApprovedEventsConfiguration());
            modelBuilder.ApplyConfiguration<EventFinance>(new EventFinanceConfiguration());
        }
    }
}
