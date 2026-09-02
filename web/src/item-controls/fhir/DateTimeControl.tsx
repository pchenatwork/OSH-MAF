import type { QuestionnaireItemProps } from "../contract";

/** Placeholder — not in the lab manual yet. To be implemented. */
export const DateTimeControl = ({ item }: QuestionnaireItemProps) => (
  <div className="unsupported" role="note">
    DateTimeControl type: <code>{item.type}</code> (linkId:{" "}
    <code>{item.linkId}</code>)
  </div>
);
