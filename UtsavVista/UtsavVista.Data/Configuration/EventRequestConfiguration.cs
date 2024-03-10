using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtsavVista.Data.Models;

namespace UtsavVista.Data.Configuration
{
    public class EventRequestConfiguration : IEntityTypeConfiguration<EventRequest>
    {
        public void Configure(EntityTypeBuilder<EventRequest> builder)
        {
            builder.HasKey(p => p.RequestID);

            builder.Property(p => p.EventName).IsRequired();

            builder.Property(p => p.EventType).IsRequired();

            builder.Property(p => p.UserID).IsRequired();

            builder.Property(p => p.EventDate).IsRequired();

            builder.Property(p => p.Budget).HasPrecision(18, 4);

            builder.Property(p => p.City).IsRequired();
        }
    }
}
