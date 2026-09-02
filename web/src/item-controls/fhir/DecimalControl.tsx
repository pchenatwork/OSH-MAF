import type { QuestionnaireItemProps } from "../contract";

export const DecimalControl = ({
  item,
  answers,
  setAnswers,
  errors,
  mode,
}: QuestionnaireItemProps) => {
  const selected = answers[0]?.valueDecimal ?? "";
  const id = `q-${item.linkId}`;

  if (mode !== "enter") {
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
          const value = e.target.value ? parseFloat(e.target.value) : undefined;
          setAnswers(value !== undefined ? [{ valueDecimal: value }] : []);
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
