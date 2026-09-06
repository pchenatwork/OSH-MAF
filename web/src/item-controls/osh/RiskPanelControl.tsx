import type { QuestionnaireItemProps } from "../contract";
import { slot } from "./slot";

export const RiskPanelControl = ({
  item,
  childSlots,
}: QuestionnaireItemProps) => (
  <section className="attestation">
    ..... Risk panel content ............
    {slot(childSlots, "name")}
    ..... Risk panel content ............
  </section>
);
