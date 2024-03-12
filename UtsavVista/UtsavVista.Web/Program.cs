using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using UtsavVista.Data;

var builder = WebApplication.CreateBuilder(args);
var cors = "corspolicy";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(cors,builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddDbContext<EventDbContext>(options =>
        options.UseSqlServer(connectionString: builder.Configuration.GetConnectionString("EventDb")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(cors);
app.UseAuthorization();

app.MapControllers();

app.Run();
