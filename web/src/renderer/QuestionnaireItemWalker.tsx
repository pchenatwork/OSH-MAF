import type {
  QuestionnaireItem,
  QuestionnaireResponseItemAnswer,
} from "../item-controls/contract";
import { resolveItemControl } from "../item-controls";
import { useRenderMode } from "./renderModeContext";

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

export function QuestionnaireItemWalker({
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

        const Component = resolveItemControl(item);

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
              <QuestionnaireItemWalker
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
