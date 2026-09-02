import type { ItemProps } from "../types";

export const ChoiceItem = ({
  item,
  answers,
  setAnswers,
  errors,
  mode,
}: ItemProps) => {
  const selected = answers[0]?.valueCoding?.code ?? "";
  const id = `q-${item.linkId}`;
  const options = item.answerOption ?? [];

  if (mode !== "enter") {
    const display = options.find((o) => o.valueCoding?.code === selected)
      ?.valueCoding?.display;
    return (
      <div className="item">
        <span className="label">{item.text}</span>
        <span className="value">{display ?? "—"}</span>
      </div>
    );
  }

  return (
    <div className="item">
      <label htmlFor={id}>
        {item.text}
        {item.required && <span aria-hidden="true"> *</span>}
      </label>
      <select
        id={id}
        value={selected}
        aria-invalid={errors.length > 0 || undefined}
        onChange={(e) => {
          const opt = options.find(
            (o) => o.valueCoding?.code === e.target.value,
          );
          setAnswers(
            opt?.valueCoding ? [{ valueCoding: opt.valueCoding }] : [],
          );
        }}
      >
        <option value="">— select —</option>
        {options.map((o) => (
          <option key={o.valueCoding?.code} value={o.valueCoding?.code}>
            {o.valueCoding?.display ?? o.valueCoding?.code}
          </option>
        ))}
      </select>
      {errors.length > 0 && (
        <div role="alert" className="error">
          {errors.join(" ")}
        </div>
      )}
    </div>
  );
};
