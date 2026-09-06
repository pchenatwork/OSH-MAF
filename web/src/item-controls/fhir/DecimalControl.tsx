import type { QuestionnaireItemProps } from "../contract";
import { isEditable } from "../contract";
import shared from "../item-controls.module.css";

export const DecimalControl = ({
  item,
  answers,
  setAnswers,
  errors,
  mode,
}: QuestionnaireItemProps) => {
  const selected = answers[0]?.valueDecimal ?? "";
  const id = `q-${item.linkId}`;

  if (!isEditable(mode)) {
    return (
      <div className={shared.item}>
        <span className={shared.label}>{item.text}</span>
        <span className={shared.value}>{selected ?? "—"}</span>
      </div>
    );
  }

  return (
    <div className={shared.item}>
      <label htmlFor={id}>
        {item.text}
        {item.required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        type="number"
        id={id}
        value={selected}
        aria-invalid={errors.length > 0 || undefined}
        onChange={(e) => {
          const value = e.target.value ? parseFloat(e.target.value) : undefined;
          setAnswers(value !== undefined ? [{ valueDecimal: value }] : []);
        }}
      />
      {errors.length > 0 && (
        <div role="alert" className={shared.error}>
          {errors.join(" ")}
        </div>
      )}
    </div>
  );
};
