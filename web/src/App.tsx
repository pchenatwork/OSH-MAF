import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { QuestionnaireResponse } from "./item-controls/contract";
import { fetchQuestionnaire } from "./api/questionnaires";
import { QuestionnaireRenderer } from "./renderer/QuestionnaireRenderer";
import { ResponseInspector } from "./renderer/ResponseInspector";
import type { RenderMode } from "./item-controls/contract";
import "./App.css";

const TOY_URL = "http://schools.nyc.gov/osh/Questionnaire/toy";

export default function App() {
  const [mode, setMode] = useState<RenderMode>("enter");
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
    queryKey: ["questionnaire", TOY_URL, "1.1"],
    queryFn: () => fetchQuestionnaire(TOY_URL, "1.1"),
  });

  if (isPending) return <p>Loading definition…</p>;
  if (error)
    return <p role="alert">Could not load: {(error as Error).message}</p>;

  return (
    <div className="layout">
      <main>
        <nav className="modes">
          {(["enter", "view", "print"] as const).map((m) => (
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
