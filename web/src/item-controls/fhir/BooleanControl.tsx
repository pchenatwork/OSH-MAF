import type { QuestionnaireItemProps } from "../contract";
import { isEditable } from "../contract";

export const BooleanControl = ({
  item,
  answers,
  setAnswers,
  errors,
  mode,
}: QuestionnaireItemProps) => {
  const value = answers[0]?.valueBoolean;
  const id = `q-${item.linkId}`;

  if (!isEditable(mode)) {
    return (
      <div className="item">
        <span className="label">{item.text}</span>
        <span className="value">
          {value === undefined ? "—" : value ? "Yes" : "No"}
        </span>
      </div>
    );
  }

  return (
    <fieldset className="item">
      <legend>
        {item.text}
        {item.required && <span aria-hidden="true"> *</span>}
      </legend>
      {[true, false].map((v) => (
        <label key={String(v)} htmlFor={`${id}-${v}`}>
          <input
            id={`${id}-${v}`}
            type="radio"
            name={id}
            checked={value === v}
            onChange={() => setAnswers([{ valueBoolean: v }])}
          />
          {v ? "Yes" : "No"}
        </label>
      ))}
      {errors.length > 0 && (
        <div role="alert" className="error">
          {errors.join(" ")}
        </div>
      )}
    </fieldset>
  );
};
