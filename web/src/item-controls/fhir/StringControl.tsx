import type { QuestionnaireItemProps } from "../contract";

export const StringControl = ({
  item,
  answers,
  setAnswers,
  errors,
  mode,
}: QuestionnaireItemProps) => {
  const value = answers[0]?.valueString ?? "";
  const id = `q-${item.linkId}`;

  if (mode !== "enter") {
    return (
      <div className="item">
        <span className="label">{item.text}</span>
        <span className="value">{value || "—"}</span>
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
        <div id={`${id}-err`} role="alert" className="error">
          {errors.join(" ")}
        </div>
      )}
    </div>
  );
};
