using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UtsavVista.Data.Models;

namespace UtsavVista.Data.Configuration
{
    public class EventFinanceConfiguration : IEntityTypeConfiguration<EventFinance>
    {
        public void Configure(EntityTypeBuilder<EventFinance> builder)
        {
            builder.HasKey(ef => ef.FinanceID);

            builder.Property(ef => ef.FinanceID).IsRequired();

            builder.Property(ef => ef.ApprovedEventID).IsRequired();

            builder.Property(ef => ef.TotalCostToCustomer).IsRequired();

            //builder.Property(ef => ef.Profit).IsRequired();

            //builder.Property(ef => ef.Profit).HasPrecision(18, 4);

            builder.Property(ef => ef.TotalCostToCustomer).HasPrecision(18, 4);
        }
    }
}
