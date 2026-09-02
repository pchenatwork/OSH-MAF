import type { QuestionnaireResponse } from "fhir/r4";

export function ResponseInspector({
  response,
}: {
  response: QuestionnaireResponse;
}) {
  const answered =
    JSON.stringify(response).match(/"answer":\[\{/g)?.length ?? 0;

  return (
    <aside className="inspector">
      <h2>
        QuestionnaireResponse <small>({answered} answered)</small>
      </h2>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </aside>
  );
}
