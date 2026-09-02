import type { QuestionnaireItem } from "fhir/r4";
import type { ItemComponent } from "./types";
import * as B from "./builtin";

export const OSH_ITEM_CONTROL =
  "http://schools.nyc.gov/osh/StructureDefinition/item-control";

const registry: Record<string, ItemComponent> = {
  string: B.StringItem,
  text: B.TextItem,
  integer: B.IntegerItem,
  decimal: B.DecimalItem,
  boolean: B.BooleanItem,
  date: B.DateItem,
  dateTime: B.DateTimeItem,
  choice: B.ChoiceItem,
  "open-choice": B.OpenChoiceItem,
  display: B.DisplayItem,
  group: B.GroupItem,
  // OSH custom components get registered here in Lab 6
};

export function resolveComponent(item: QuestionnaireItem): ItemComponent {
  const control = item.extension?.find(
    (e) => e.url === OSH_ITEM_CONTROL,
  )?.valueCode;
  return registry[control ?? item.type] ?? B.UnsupportedItem;
}
