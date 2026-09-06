import type { ReactNode } from "react";

/**
 * Find a pre-rendered child by the last segment of its linkId.
 *
 * slot(childSlots, 'dose') matches 'order.rescue.dose', 'order.routine.dose',
 * 'order.emergency.dose' — so one control serves every order block in every
 * MAF. Returns null when absent, so a definition may legitimately omit a field.
 */
export function slot(
  childSlots: Record<string, ReactNode> | undefined,
  suffix: string,
): ReactNode {
  if (!childSlots) return null;
  const key = Object.keys(childSlots).find(
    (k) => k === suffix || k.endsWith(`.${suffix}`),
  );
  return key ? childSlots[key] : null;
}
