using ContaCorrente.Data;
using ContaCorrenteServices;
using ContaCorrenteServices.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddDbContext<ExtratoContext>(options => {
    options.UseSqlServer(configuration.GetConnectionString("ExtratoConnection"));
});

builder.Services.AddScoped<IExtratoService, ExtratoService>();
builder.Services.AddScoped<ISeedService, SeedService>();

builder.Services.AddCors(
    // o => o.AddPolicy(name: "Angular", policy => {
    // policy.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
    // })
);

var app = builder.Build();

if (app.Environment.IsDevelopment()) 
{
    var serviceProvider = builder.Services.BuildServiceProvider();
    var seedService = serviceProvider.GetService<ISeedService>();
    
    // descomente para popular o banco de dados
    // await seedService.Seed();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors(x => 
    x.AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
);

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
