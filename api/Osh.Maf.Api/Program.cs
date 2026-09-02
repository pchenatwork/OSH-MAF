using Hl7.Fhir.Serialization;
using Osh.Maf.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.ForFhir());

builder.Services.AddOpenApi();
builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod()));

builder.Services.AddSingleton(new FormDefinitionRepository(
    builder.Configuration.GetConnectionString("Maf")!));

var app = builder.Build();

if (app.Environment.IsDevelopment()) app.MapOpenApi();
app.UseCors();
app.MapControllers();
app.Run();