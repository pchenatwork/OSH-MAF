/**
 * Defines the interfaces that every control in [fhir] and [osh] must implement.
 * Also defines the RenderMode type and related helpers.
 *
 * [fhir]: https://www.hl7.org/fhir/questionnaire.html
 * [osh]: Custom controls specific to the NYC DOE Office of School Health (OSH) implementation of FHIR.
 */
import type {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireItemAnswerOption,
  QuestionnaireItemEnableWhen,
  QuestionnaireResponse,
  QuestionnaireResponseItem,
  QuestionnaireResponseItemAnswer,
} from "fhir/r4";
import type { FC, ReactNode } from "react";

/**
 * Single import point for FHIR types. Every other file imports from here,
 * never from 'fhir/r4' directly (enforced by lint — see eslint.config.js).
 * An R4 -> R5 move changes this block and nothing else.
 */
export type {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireItemAnswerOption,
  QuestionnaireItemEnableWhen,
  QuestionnaireResponse,
  QuestionnaireResponseItem,
  QuestionnaireResponseItemAnswer,
};

/**
 * How a render is presented. Purely a UI concern — unrelated to
 * QuestionnaireResponse.status, which carries workflow state.
 *
 * Two underlying axes: is it editable, and what medium is it for.
 * The fourth combination (editable on paper) is nonsense, so this is
 * a flat three-value union rather than a pair of booleans.
 */
export type RenderMode = "edit" | "view" | "print";

/** True when the user can change answers. */
export const isEditable = (mode: RenderMode): boolean => mode === "edit";

/** True when rendering for paper rather than screen. */
export const isPrint = (mode: RenderMode): boolean => mode === "print";

/**
 * Address of one item occurrence within the response tree.
 *
 * A bare linkId is NOT enough: a repeating group has several occurrences of the
 * same linkId, and they must be addressable separately. Asthma has no repeating
 * groups so every path here is length-1 with index 0 — but General, Seizure and
 * Diabetes all have order tables, and retrofitting a path later means rewriting
 * every control.
 */
export type ItemPath = ReadonlyArray<{ linkId: string; index: number }>;

/** Props for a component that renders one Questionnaire.item. */
export interface QuestionnaireItemProps {
  item: QuestionnaireItem;
  path: ItemPath;
  answers: QuestionnaireResponseItemAnswer[];
  setAnswers: (answers: QuestionnaireResponseItemAnswer[]) => void;
  errors: string[];
  mode: RenderMode;

  /** Children in document order. Group items only. */
  children?: ReactNode;

  /**
   * The same children, already rendered, keyed by their linkId — so a custom
   * control can place them individually instead of accepting document order.
   * Group items only. See §6.4.
   */
  childSlots?: Record<string, ReactNode>;
}

/** A component that renders one Questionnaire.item. */
export type QuestionnaireItemControl = FC<QuestionnaireItemProps>;
