"use client";
import {
  MantineProvider,
  createTheme,
  CSSVariablesResolver,
  ColorSchemeScript,
} from "@mantine/core";

import type { ThemeColor } from "@/types/payload-types";
import type { MantineThemeColors } from "@mantine/core";


import defaultTheme from "@/lib/defaultTheme";

import { textStyles } from "@/lib/defaultStyles";

import { ButtonStyles } from "@/lib/componentStyles/button";
import generateToneMap, {generateColorMap, generateManColors} from "@/lib/generatePalette";

export default function ThemeProvider({
  theme_colors = [],
  children,
}: {
  children: React.ReactNode,
  theme_colors: ThemeColor[]
}) {
  //@ts-ignore
  const mappedColors = generateColorMap(theme_colors);

  console.log('mapped cols', mappedColors);

  const manColors = generateManColors(theme_colors);

  console.log('man colors', manColors);
  

  // const theme = extendTheme({
  //   components: {
  //     Button: ButtonStyles
  //   },
  //   textStyles,
  //   colors: {...mappedColors}
  // });


  const themeArgs = {
    others: defaultTheme,

    colors: mappedColors,
    primaryColor: 'primary'
  }
  //@ts-ignore
  const theme = createTheme(themeArgs);
  const variables: CSSVariablesResolver = (theme) => ({
    variables: {
      //@ts-ignore
      "--mantine-gutter": theme.others.gutter,
      //@ts-ignore
      "--mantine-gutter-x": theme.others.gutterX,
      //@ts-ignore
      "--mantine-gutter-y": theme.others.gutterY,
    },
    light: {},
    dark: {},
  });
  return (
    <>
      <ColorSchemeScript forceColorScheme="light" />
      <MantineProvider
        theme={theme}
        cssVariablesResolver={variables}
        defaultColorScheme="light"
        forceColorScheme="light"
        //@ts-ignore
      >
        {children}
      </MantineProvider>
    </>
  );
}
