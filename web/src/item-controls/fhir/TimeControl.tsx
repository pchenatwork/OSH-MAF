import type { QuestionnaireItemProps } from "../contract";

/** Placeholder — not in the lab manual yet. To be implemented. */
export const TimeControl = ({ item }: QuestionnaireItemProps) => (
  <div className="unsupported" role="note">
    TimeControl type: <code>{item.type}</code> (linkId:{" "}
    <code>{item.linkId}</code>)
  </div>
);
