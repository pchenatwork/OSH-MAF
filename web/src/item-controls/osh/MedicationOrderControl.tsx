import { slot } from "./slot";
import type { QuestionnaireItemProps } from "../contract";
import styles from "./MedicationOrderControl.module.css";
import shared from "../item-controls.module.css";

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
  <fieldset className={styles.order}>
    {item.text && <legend>{item.text}</legend>}

    <div className={styles.grid}>
      <div className={`${styles.cell} ${styles.cellDrug}`}>
        {slot(childSlots, "drug")}
      </div>
      <div className={styles.cell}>{slot(childSlots, "dose")}</div>
      <div className={styles.cell}>{slot(childSlots, "route")}</div>
      <div className={styles.cell}>{slot(childSlots, "freq")}</div>
      <div className={`${styles.cell} ${styles.cellPrn}`}>
        {slot(childSlots, "prn")}
      </div>
    </div>

    {errors.length > 0 && (
      <div role="alert" className={shared.error}>
        {errors.join(" ")}
      </div>
    )}
  </fieldset>
);
