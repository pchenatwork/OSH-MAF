import { slot } from "./slot";
import { isEditable } from "../contract";
import type { QuestionnaireItemProps } from "../contract";

/**
 * Signer identity plus attestation, rendered as one visual unit so that the
 * attestation cannot be read apart from who is making it.
 *
 * The signature TIMESTAMP is deliberately absent. See the note below.
 */
export const SignatureBlockControl = ({
  item,
  childSlots,
  mode,
}: QuestionnaireItemProps) => (
  <section className="signature" aria-labelledby={`sig-${item.linkId}`}>
    <h3 id={`sig-${item.linkId}`}>{item.text}</h3>

    <div className="signature__identity">
      {slot(childSlots, "name")}
      {slot(childSlots, "credential")}
      {slot(childSlots, "license")}
      {slot(childSlots, "npi")}
    </div>

    <div className="signature__attest">{slot(childSlots, "attest")}</div>

    {!isEditable(mode) && (
      <p className="signature__stamp">Signature recorded on submission.</p>
    )}
  </section>
);
