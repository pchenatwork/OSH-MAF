import type { QuestionnaireItemProps } from "../contract";
import { isEditable } from "../contract";
import shared from "../item-controls.module.css";

export const StringControl = ({
  item,
  answers,
  setAnswers,
  errors,
  mode,
}: QuestionnaireItemProps) => {
  const value = answers[0]?.valueString ?? "";
  const id = `q-${item.linkId}`;

  if (!isEditable(mode)) {
    return (
      <div className={shared.item}>
        <span className={shared.label}>{item.text}</span>
        <span className={shared.value}>{value || "—"}</span>
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
        id={id}
        type="text"
        value={value}
        aria-required={item.required || undefined}
        aria-invalid={errors.length > 0 || undefined}
        aria-describedby={errors.length ? `${id}-err` : undefined}
        onChange={(e) =>
          setAnswers(e.target.value ? [{ valueString: e.target.value }] : [])
        }
      />
      {errors.length > 0 && (
        <div id={`${id}-err`} role="alert" className={shared.error}>
          {errors.join(" ")}
        </div>
      )}
    </div>
  );
};
