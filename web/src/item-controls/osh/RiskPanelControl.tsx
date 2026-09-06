import type { QuestionnaireItemProps } from "../contract";
import shared from "../item-controls.module.css";
import styles from "./RiskPanelControl.module.css";

/**
 * The Y/N/U risk panel: a column of answers, then the question it answers.
 *
 * Pure layout, like MedicationOrderControl. It reads no answers and calls no
 * setters — every row is still a ChoiceControl that the walker already
 * rendered. This control only decides where those rows sit and which way
 * round each one reads.
 *
 * That last part is the interesting bit, because a control cannot reach
 * inside a child it did not render. It does not have to: ChoiceControl
 * publishes a handful of CSS custom properties as a style API, and this panel
 * sets them on the container. Class names are scoped and cannot cross a
 * module boundary — that is what CSS Modules is for. Custom properties are
 * inherited *values*, not names, so they cross freely and by design. The
 * child declares which knobs exist; the container turns them; neither learns
 * the other's internals.
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
