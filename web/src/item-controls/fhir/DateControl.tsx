import type { QuestionnaireItemProps } from "../contract";

/** Placeholder — not in the lab manual yet. To be implemented. */
export const DateControl = ({ item }: QuestionnaireItemProps) => (
  <div className="unsupported" role="note">
    DateControl type: <code>{item.type}</code> (linkId:{" "}
    <code>{item.linkId}</code>)
  </div>
);
