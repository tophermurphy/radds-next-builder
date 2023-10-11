import { getGlobalData, getPagePaths } from "@/lib/globalData";
import ThemeProvider from "./ThemeProvider";
import GlobalProvider from "./GlobalProvider";

//* This collects all the global data and sends it to the appropriate components //


export default async function GlobalBase({ children }: {children: React.ReactNode}) {

  const {theme, theme_colors, brand, header, footer} = await getGlobalData();
  
  const themeData = {
    theme,
    theme_colors
  }

  const brandData = {
    brand,
    header,
    footer
  }

  return (
    <ThemeProvider themeData={themeData}>
      <GlobalProvider value={brandData}>
        {children}
      </GlobalProvider>
    </ThemeProvider>
  )
}

 