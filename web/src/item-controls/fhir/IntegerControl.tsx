import type { QuestionnaireItemProps } from "../contract";
import { isEditable } from "../contract";

export const IntegerControl = ({
  item,
  answers,
  setAnswers,
  errors,
  mode,
}: QuestionnaireItemProps) => {
  const selected = answers[0]?.valueInteger ?? "";
  const id = `q-${item.linkId}`;

  if (!isEditable(mode)) {
    return (
      <div className="item">
        <span className="label">{item.text}</span>
        <span className="value">{selected ?? "—"}</span>
      </div>
    );
  }

  return (
    <div className="item">
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
          const value = e.target.value
            ? parseInt(e.target.value, 10)
            : undefined;
          setAnswers(value !== undefined ? [{ valueInteger: value }] : []);
        }}
      />
      {errors.length > 0 && (
        <div role="alert" className="error">
          {errors.join(" ")}
        </div>
      )}
    </div>
  );
};
