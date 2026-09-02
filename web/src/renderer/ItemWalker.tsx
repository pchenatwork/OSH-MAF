import type {
  QuestionnaireItem,
  QuestionnaireResponseItemAnswer,
} from "fhir/r4";
import { resolveComponent } from "../registry";
import { useRenderMode } from "./RenderMode";

/**
 * The walker is a recursive component that traverses the questionnaire item tree and
 * renders each item using the appropriate component from the registry. It also passes down
 * the necessary props for managing answers and errors, as well as the current render mode.
 */
export interface WalkerProps {
  items: QuestionnaireItem[];
  getAnswers: (linkId: string) => QuestionnaireResponseItemAnswer[];
  setAnswers: (linkId: string, a: QuestionnaireResponseItemAnswer[]) => void;
  errors: Record<string, string[]>;
  isEnabled: (item: QuestionnaireItem) => boolean;
}

export function ItemWalker({
  items,
  getAnswers,
  setAnswers,
  errors,
  isEnabled,
}: WalkerProps) {
  const mode = useRenderMode();

  return (
    <>
      {items.map((item) => {
        if (!isEnabled(item)) return null;

        const Component = resolveComponent(item);

        return (
          <Component
            key={item.linkId}
            item={item}
            answers={getAnswers(item.linkId)}
            setAnswers={(a) => setAnswers(item.linkId, a)}
            errors={errors[item.linkId] ?? []}
            mode={mode}
          >
            {item.item && (
              <ItemWalker
                items={item.item}
                getAnswers={getAnswers}
                setAnswers={setAnswers}
                errors={errors}
                isEnabled={isEnabled}
              />
            )}
          </Component>
        );
      })}
    </>
  );
}
