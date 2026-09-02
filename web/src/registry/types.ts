import type {
  QuestionnaireItem,
  QuestionnaireResponseItemAnswer,
} from "fhir/r4";
import type { FC, ReactNode } from "react";

export type RenderMode = "enter" | "view" | "print";

/**
 * ??ItemProps seems to be QuestionnaireItem specific. Needs to find out how other FHIR resources are rendered.
 * If they are not rendered, then this is fine. If they are rendered, then we need to make a more generic type
 * for all FHIR resources.??
 */
export interface ItemProps {
  item: QuestionnaireItem;
  answers: QuestionnaireResponseItemAnswer[];
  setAnswers: (answers: QuestionnaireResponseItemAnswer[]) => void;
  errors: string[];
  mode: RenderMode;
  children?: ReactNode; // populated only for group items
}

export type ItemComponent = FC<ItemProps>;
