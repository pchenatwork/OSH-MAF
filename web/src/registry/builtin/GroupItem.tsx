import type { ItemProps } from "../types";
export const GroupItem = ({ item, children }: ItemProps) => (
  <fieldset className="group">
    {item.text && <legend>{item.text}</legend>}
    {children}
  </fieldset>
);
