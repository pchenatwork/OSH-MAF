import { slot } from "./slot";
import type { QuestionnaireItemProps } from "../contract";

/**
 * Lays out one medication order as a row: drug, dose, route, frequency, PRN.
 *
 * Pure layout. It reads no answers and calls no setters — the children the
 * walker already rendered own all of that. Works for any order group whose
 * children end in .drug/.dose/.route/.freq/.prn, in any MAF.
 */
export const MedicationOrderControl = ({
  item,
  childSlots,
  errors,
}: QuestionnaireItemProps) => (
  <fieldset className="order">
    {item.text && <legend>{item.text}</legend>}

    <div className="order__grid">
      <div className="order__cell order__cell--drug">
        {slot(childSlots, "drug")}
      </div>
      <div className="order__cell">{slot(childSlots, "dose")}</div>
      <div className="order__cell">{slot(childSlots, "route")}</div>
      <div className="order__cell">{slot(childSlots, "freq")}</div>
      <div className="order__cell order__cell--prn">
        {slot(childSlots, "prn")}
      </div>
    </div>

    {errors.length > 0 && (
      <div role="alert" className="error">
        {errors.join(" ")}
      </div>
    )}
  </fieldset>
);
