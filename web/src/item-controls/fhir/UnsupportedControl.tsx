import type { QuestionnaireItemProps } from "../contract";
export const UnsupportedControl = ({ item }: QuestionnaireItemProps) => (
  <div className="unsupported" role="note">
    Unsupported item type: <code>{item.type}</code> (linkId:{" "}
    <code>{item.linkId}</code>)
  </div>
);
