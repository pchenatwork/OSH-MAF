import type { QuestionnaireItemProps } from "../contract";
import shared from "../item-controls.module.css";
import styles from "./RiskPanelControl.module.css";

/**
 * The Y/N/U risk panel: a column of answers, then the question it answers.
 *
 * Pure layout, like MedicationOrderControl. It reads no answers and calls no
 * setters — the walker has already rendered every row. This control only
 * decides where those rows sit and which way round each one reads.
 *
 * That last part is the interesting bit, because a control cannot reach
 * inside a child it did not render. It does not have to. Two channels cross
 * the module boundary that scoped class names deliberately cannot:
 *
 *   - the `--item-*` custom properties the shared item vocabulary publishes
 *     as its style API (see item-controls.module.css). Properties are
 *     inherited *values*, not names, so setting them on .rows reaches every
 *     row underneath at any depth.
 *   - `data-item-type`, stamped by Field.tsx, which lets this panel flip only
 *     its choice rows and leave the follow-ups label-first.
 *
 * The child declares which knobs exist; the container turns them; neither
 * learns the other's internals.
 *
 * Both definition shapes render through this one control: asthma-maf wraps
 * each line in its own group so the answer and its qualifiers extract as one
 * Observation.component, while toy-form keeps them flat. The stylesheet
 * strips the wrapper's chrome where there is one and matches nothing where
 * there is not — see the notes there.
 *
 * Nothing here is asthma-specific. Any form with a column of same-shaped
 * choice rows — a seizure trigger checklist, an allergy panel — gets this
 * layout by putting the osh-risk-panel extension on the group.
 */
export const RiskPanelControl = ({
  item,
  children,
  errors,
}: QuestionnaireItemProps) => (
  <fieldset className={styles.panel}>
    {item.text && <legend className={styles.legend}>{item.text}</legend>}

    <div className={styles.rows}>{children}</div>

    {errors.length > 0 && (
      <div role="alert" className={shared.error}>
        {errors.join(" ")}
      </div>
    )}
  </fieldset>
);
