import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { RenderMode } from "../registry/types";

const Ctx = createContext<RenderMode>("enter");

export const useRenderMode = () => useContext(Ctx);

export const RenderModeProvider = ({
  mode,
  children,
}: {
  mode: RenderMode;
  children: ReactNode;
}) => <Ctx.Provider value={mode}>{children}</Ctx.Provider>;
