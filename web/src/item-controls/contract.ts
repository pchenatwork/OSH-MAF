import type {
  Questionnaire,
  QuestionnaireItem,
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
  QuestionnaireItemEnableWhen,
  QuestionnaireResponse,
  QuestionnaireResponseItem,
  QuestionnaireResponseItemAnswer,
};

export type RenderMode = "enter" | "view" | "print";

/** Props for a component that renders one Questionnaire.item. */
export interface QuestionnaireItemProps {
  item: QuestionnaireItem;
  answers: QuestionnaireResponseItemAnswer[];
  setAnswers: (answers: QuestionnaireResponseItemAnswer[]) => void;
  errors: string[];
  mode: RenderMode;
  children?: ReactNode; // populated only for group items
}

/** A component that renders one Questionnaire.item. */
export type QuestionnaireItemControl = FC<QuestionnaireItemProps>;
