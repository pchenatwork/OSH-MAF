using Hl7.Fhir.Model;
using Microsoft.AspNetCore.Mvc;
using Osh.Maf.Data;
using Osh.Maf.Api.Serialization;
using Task = System.Threading.Tasks.Task;   // FHIR has its own Task resource!

namespace Osh.Maf.Api.Controllers;

[ApiController]
[Route("fhir/Questionnaire")]
public sealed class QuestionnaireController(FormDefinitionRepository repo) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Search(
        [FromQuery] string url, [FromQuery] string? version)
    {
        var row = await repo.GetAsync(url, version);
        if (row is null)
            return NotFound(Outcomes.NotFound($"No Questionnaire for {url}"));

        // Return the STORED bytes, not a round-trip. See note below.
        return Content(row.DefinitionJson, "application/fhir+json");
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var row = await repo.GetByIdAsync(id);
        return row is null
            ? NotFound(Outcomes.NotFound($"No Questionnaire {id}"))
            : Content(row.DefinitionJson, "application/fhir+json");
    }

    [HttpPost]
    [Consumes("application/fhir+json")]
    [ProducesResponseType(typeof(Questionnaire), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(OperationOutcome), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(OperationOutcome), StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Publish([FromBody] Questionnaire q)
    {
        if (string.IsNullOrWhiteSpace(q.Url) || string.IsNullOrWhiteSpace(q.Version))
            return BadRequest(Outcomes.Invalid("url and version are required."));

        if (await repo.GetAsync(q.Url, q.Version) is not null)
            return Conflict(Outcomes.Conflict(
                $"{q.Url}|{q.Version} already exists. Definitions are immutable."));

        var id = await repo.InsertAsync(
            q.Url, q.Version,
            q.Title ?? q.Name ?? "Untitled",
            q.Status?.ToString().ToLowerInvariant() ?? "draft",
            FhirJson.Serialize(q));

        return Created($"/fhir/Questionnaire/{id}", q);
    }
}