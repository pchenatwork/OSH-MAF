import type { ItemProps } from "../types";
/**
 * ** DateItem Not in Lab manual. ** Component to be tested **
 * @param param0
 * @returns
 */

export const IntegerItem = ({
  item,
  answers,
  setAnswers,
  errors,
  mode,
}: ItemProps) => {
  const selected = answers[0]?.valueInteger ?? "";
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

export const DecimalItem = ({
  item,
  answers,
  setAnswers,
  errors,
  mode,
}: ItemProps) => {
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
export const DateItem = ({ item }: ItemProps) => (
  <div className="unsupported" role="note">
    DateItem type: <code>{item.type}</code> (linkId: <code>{item.linkId}</code>)
  </div>
);
export const DateTimeItem = ({ item }: ItemProps) => (
  <div className="unsupported" role="note">
    DateTimeItem type: <code>{item.type}</code> (linkId:{" "}
    <code>{item.linkId}</code>)
  </div>
);
export const TimeItem = ({ item }: ItemProps) => (
  <div className="unsupported" role="note">
    TimeItem type: <code>{item.type}</code> (linkId: <code>{item.linkId}</code>)
  </div>
);
export const OpenChoiceItem = ({ item }: ItemProps) => (
  <div className="unsupported" role="note">
    OpenChoiceItem type: <code>{item.type}</code> (linkId:{" "}
    <code>{item.linkId}</code>)
  </div>
);
export const DisplayItem = ({ item }: ItemProps) => (
  <div className="unsupported" role="note">
    DisplayItem type: <code>{item.type}</code> (linkId:{" "}
    <code>{item.linkId}</code>)
  </div>
);
export const TextItem = ({ item }: ItemProps) => (
  <div className="unsupported" role="note">
    TextItem type: <code>{item.type}</code> (linkId: <code>{item.linkId}</code>)
  </div>
);
