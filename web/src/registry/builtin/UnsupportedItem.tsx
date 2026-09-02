import type { ItemProps } from "../types";
export const UnsupportedItem = ({ item }: ItemProps) => (
  <div className="unsupported" role="note">
    Unsupported item type: <code>{item.type}</code> (linkId:{" "}
    <code>{item.linkId}</code>)
  </div>
);
