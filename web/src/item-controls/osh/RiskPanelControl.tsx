import type { QuestionnaireItemProps } from "../contract";
import { slot } from "./slot";
import styles from "./RiskPanelControl.module.css";

export const RiskPanelControl = ({ childSlots }: QuestionnaireItemProps) => (
  <section className={styles.panel}>
    ..... Risk panel content ............
    {slot(childSlots, "name")}
    ..... Risk panel content ............
  </section>
);
