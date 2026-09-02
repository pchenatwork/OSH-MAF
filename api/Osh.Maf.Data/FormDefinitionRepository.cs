using Dapper;
using Microsoft.Data.SqlClient;

namespace Osh.Maf.Data;
public sealed record FormDefinitionRow(
    Guid FormDefinitionId, string CanonicalUrl, string Version,
    string Title, string Status, string DefinitionJson, DateTime PublishedUtc);

public sealed class FormDefinitionRepository(string connectionString)
{
    private SqlConnection Conn() => new(connectionString);

    public async Task<FormDefinitionRow?> GetAsync(string url, string? version)
    {
        await using var c = Conn();
        return version is null
            ? await c.QueryFirstOrDefaultAsync<FormDefinitionRow>(
                """
                SELECT TOP 1 * FROM dbo.FormDefinition
                WHERE CanonicalUrl = @url AND Status = 'active'
                ORDER BY PublishedUtc DESC

                """, new { url })
            : await c.QueryFirstOrDefaultAsync<FormDefinitionRow>(
                """
                SELECT * FROM dbo.FormDefinition
                WHERE CanonicalUrl = @url AND Version = @version
                """, new { url, version });
    }

    public async Task<FormDefinitionRow?> GetByIdAsync(Guid id)
    {
        await using var c = Conn();
        return await c.QueryFirstOrDefaultAsync<FormDefinitionRow>(
            "SELECT * FROM dbo.FormDefinition WHERE FormDefinitionId = @id", new { id });
    }

    public async Task<Guid> InsertAsync(
        string url, string version, string title, string status, string json)
    {
        await using var c = Conn();
        var id = Guid.NewGuid();
        await c.ExecuteAsync(
            """
            INSERT INTO dbo.FormDefinition
              (FormDefinitionId, CanonicalUrl, Version, Title, Status, DefinitionJson)
            VALUES (@id, @url, @version, @title, @status, @json)
            """,
            new { id, url, version, title, status, json });
        return id;
    }
}