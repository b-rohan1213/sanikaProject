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
    public class VenueConfiguration : IEntityTypeConfiguration<Venue>
    {
        public void Configure(EntityTypeBuilder<Venue> builder)
        {
            builder.HasKey(p => p.VenueID);

            builder.Property(p => p.VenueName).IsRequired();

            builder.Property(p => p.City).IsRequired();

            builder.Property(p => p.Address).IsRequired();

            builder.Property(p => p.Capacity).IsRequired();

            builder.Property(p => p.VenueType).IsRequired();

            builder.Property(p=>p.costs).IsRequired();
        }
    }
}
