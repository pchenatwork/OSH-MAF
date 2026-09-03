import type { Questionnaire, QuestionnaireResponse } from "../item-controls/contract";

const FHIR_JSON = "application/fhir+json";

export async function fetchQuestionnaire(
  url: string,
  version?: string,
): Promise<Questionnaire> {
  const qs = new URLSearchParams({ url });
  if (version) qs.set("version", version);

  const res = await fetch(`/fhir/Questionnaire?${qs}`, {
    headers: { Accept: FHIR_JSON },
  });

  if (!res.ok) {
    // The API returns an OperationOutcome on error.
    const outcome = await res.json().catch(() => null);
    throw new Error(
      outcome?.issue?.[0]?.diagnostics ?? `Fetch failed: ${res.status}`,
    );
  }
  return res.json();
}

/** Used from Lab 5 onward. Returns [ok, body]. */
export async function submitResponse(
  response: QuestionnaireResponse,
): Promise<[boolean, unknown]> {
  const res = await fetch("/fhir/QuestionnaireResponse", {
    method: "POST",
    headers: { "Content-Type": FHIR_JSON, Accept: FHIR_JSON },
    body: JSON.stringify(response),
  });
  return [res.ok, await res.json()];
}
