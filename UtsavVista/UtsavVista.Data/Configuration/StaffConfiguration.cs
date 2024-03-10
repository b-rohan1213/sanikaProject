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
    public class StaffConfiguration : IEntityTypeConfiguration<Staff>
    {
        public void Configure(EntityTypeBuilder<Staff> builder)
        {
            builder.HasKey(p => p.StaffID);

            builder.Property(p => p.StaffID).IsRequired();

            builder.Property(p => p.StaffName).IsRequired();

            builder.Property(p => p.Position).IsRequired();
        }
    }
}
