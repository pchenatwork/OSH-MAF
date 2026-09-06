import type { QuestionnaireItemProps } from "../contract";
import { slot } from "./slot";

export const AttestationControl = ({
  item,
  childSlots,
}: QuestionnaireItemProps) => (
  <section className="attestation">
    <div className="attestation__statement">
      {slot(childSlots, "statement")}
    </div>
    <div className="attestation__parties">
      {slot(childSlots, "student")}
      {slot(childSlots, "parent")}
      {slot(childSlots, "practitioner")}
    </div>
  </section>
);
