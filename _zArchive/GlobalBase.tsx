// import { getGlobalData, getPagePaths } from "@/lib/globalData";
import ThemeProvider from "../src/components/ThemeProvider";
import GlobalProvider from "./GlobalProvider";
import '@mantine/core/styles.css';

import { getAPIColors } from "@/lib/payloadAPI";

//* This collects all the global data and sends it to the appropriate components //


export default async function GlobalBase({ children }: {children: React.ReactNode}) {

  const { docs: colors } = await getAPIColors();

  // const {theme, theme_colors, brand, header, footer} = await getGlobalData();
  
  // const themeData = {
  //   theme,
  //   theme_colors
  // }

  // const brandData = {
  //   brand,
  //   header,
  //   footer
  // }

  return (
    <ThemeProvider theme_colors={colors} >
      {/* <GlobalProvider value={brandData}> */}
        {children}
      {/* </GlobalProvider> */}
    </ThemeProvider>
  )
}

 