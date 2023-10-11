"use client";

import { createContext } from "react";

export interface GlobalProviderProps extends React.PropsWithChildren {
    value: Global.BrandData
}

interface GC {
    header: Global.Header
}

export const GlobalContext = createContext<Global.BrandData | null>(null);

export const GlobalProvider = ({value, children}: GlobalProviderProps) => {
    return (
        <GlobalContext.Provider value={value}>
            { children }
        </GlobalContext.Provider>
    )
}

export default GlobalProvider