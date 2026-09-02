import type { QuestionnaireItemProps } from "../contract";
export const GroupControl = ({ item, children }: QuestionnaireItemProps) => (
  <fieldset className="group">
    {item.text && <legend>{item.text}</legend>}
    {children}
  </fieldset>
);
