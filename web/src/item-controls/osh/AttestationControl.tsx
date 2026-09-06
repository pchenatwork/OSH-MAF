import type { QuestionnaireItemProps } from "../contract";
import { slot } from "./slot";
import styles from "./AttestationControl.module.css";

export const AttestationControl = ({ childSlots }: QuestionnaireItemProps) => (
  <section className={styles.attestation}>
    <div className={styles.statement}>
      {slot(childSlots, "statement")}
    </div>
    <div className={styles.parties}>
      {slot(childSlots, "student")}
      {slot(childSlots, "parent")}
      {slot(childSlots, "practitioner")}
    </div>
  </section>
);
