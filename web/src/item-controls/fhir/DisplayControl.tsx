import type { QuestionnaireItemProps } from "../contract";

/** Placeholder — not in the lab manual yet. To be implemented. */
export const DisplayControl = ({ item }: QuestionnaireItemProps) => (
  <div className="unsupported" role="note">
    DisplayControl type: <code>{item.type}</code> (linkId:{" "}
    <code>{item.linkId}</code>)
  </div>
);
