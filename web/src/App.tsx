import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { QuestionnaireResponse } from "./item-controls/contract";
import { fetchQuestionnaire } from "./api/questionnaires";
import { QuestionnaireRenderer } from "./renderer/QuestionnaireRenderer";
import { ResponseInspector } from "./renderer/ResponseInspector";
import type { RenderMode } from "./item-controls/contract";
import styles from "./App.module.css";

const TOY_URL = "http://schools.nyc.gov/osh/Questionnaire/toy";
const VERSION = "1.2";
// 1.3 adds the label-orientation demo group. Definitions are immutable, so it
// is a new row rather than an edit — publish it before switching:
//   curl -X POST http://localhost:5080/fhir/Questionnaire //     -H "Content-Type: application/fhir+json" //     --data-binary @definitions/toy-form-1.3.json
//const VERSION = "1.3";
//const TOY_URL = "http://schools.nyc.gov/osh/Questionnaire/asthma-maf";
//const VERSION = "2026.02";

export default function App() {
  const [mode, setMode] = useState<RenderMode>("edit");
  const [live, setLive] = useState<QuestionnaireResponse | null>(null);

  const handleChange = useCallback(
    (r: QuestionnaireResponse) => setLive(r),
    [],
  );

  const {
    data: questionnaire,
    isPending,
    error,
  } = useQuery({
    queryKey: ["questionnaire", TOY_URL, VERSION],
    queryFn: () => fetchQuestionnaire(TOY_URL, VERSION),
  });

  if (isPending) return <p>Loading definition…</p>;
  if (error)
    return <p role="alert">Could not load: {(error as Error).message}</p>;

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <nav className={styles.modes}>
          {(["edit", "view", "print"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
            >
              {m}
            </button>
          ))}
        </nav>

        <QuestionnaireRenderer
          key={questionnaire.version}
          questionnaire={questionnaire}
          mode={mode}
          onChange={handleChange}
          onSubmit={(r) => console.log("SUBMIT", r)}
        />
      </main>

      {live && <ResponseInspector response={live} />}
    </div>
  );
}
