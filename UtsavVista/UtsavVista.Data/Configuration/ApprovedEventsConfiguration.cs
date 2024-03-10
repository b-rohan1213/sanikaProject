using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UtsavVista.Data.Models;

namespace UtsavVista.Data.Configuration
{
    public class ApprovedEventsConfiguration : IEntityTypeConfiguration<ApprovedEvent>
    {
        public void Configure(EntityTypeBuilder<ApprovedEvent> builder)
        {
            builder.HasKey(ae => ae.ApprovedEventID);

            builder.Property(ae => ae.ApprovedEventID).IsRequired();

            //builder.Property(ae => ae.StaffID).IsRequired();

            builder.Property(ae => ae.ApprovalDate).IsRequired();

            builder.Property(ae => ae.TotalCostToCustomer).IsRequired();

            builder.Property(ae => ae.TotalCostToCustomer).HasPrecision(18, 4);
        }
    }
}
