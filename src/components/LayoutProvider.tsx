"use client";

import { createContext } from "react";
import type { SiteOption } from "@/types/payload-types";

export interface LayoutProvider extends React.PropsWithChildren {
  value: SiteOption;
}

export const LayoutContext = createContext<SiteOption | null>(null);

export const LayoutProvider = ({ value, children }: LayoutProvider) => {
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;