using Hl7.Fhir.Serialization;
using Osh.Maf.Api.Validation;
using Osh.Maf.Data;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.ForFhir());

builder.Services.AddOpenApi(options =>
{
    // Keep FHIR POCOs out of the schema — see §0.5 for why this matters.
    options.AddSchemaTransformer((schema, context, _) =>
    {
        if (typeof(Hl7.Fhir.Model.Base).IsAssignableFrom(context.JsonTypeInfo.Type))
        {
            var t = context.JsonTypeInfo.Type;
            schema.Properties?.Clear();
            schema.Required?.Clear();
            schema.AdditionalPropertiesAllowed = true;
            schema.Description =
                $"FHIR R4 {t.Name}. Post raw application/fhir+json. " +
                $"Spec: http://hl7.org/fhir/R4/{t.Name.ToLowerInvariant()}.html";
        }
        return System.Threading.Tasks.Task.CompletedTask;
    });
});
builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod()));

builder.Services.AddSingleton(new FormDefinitionRepository(
    builder.Configuration.GetConnectionString("Maf")!));
builder.Services.AddSingleton(new FormResponseRepository(
    builder.Configuration.GetConnectionString("Maf")!));
builder.Services.AddSingleton<ResponseValidator>();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();               // /openapi/v1.json
    app.MapScalarApiReference();    // /scalar
}

app.UseCors();
app.MapControllers();
app.Run();