"use client";
import {
  MantineProvider,
  createTheme,
  CSSVariablesResolver,
  ColorSchemeScript,
} from "@mantine/core";

import defaultTheme from "@/lib/defaultTheme";

import { textStyles } from "@/lib/defaultStyles";

import { ButtonStyles } from "@/lib/componentStyles/button";
import generateToneMap from "@/lib/generatePalette";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const mappedColors = generateToneMap(themeData.theme_colors);

  // const theme = extendTheme({
  //   components: {
  //     Button: ButtonStyles
  //   },
  //   textStyles,
  //   colors: {...mappedColors}
  // });

  const theme = createTheme(defaultTheme);
  const variables: CSSVariablesResolver = (theme) => ({
    variables: {
      //@ts-ignore
      "--mantine-gutter": theme.gutter,
      //@ts-ignore
      "--mantine-gutter-x": theme.gutterX,
      //@ts-ignore
      "--mantine-gutter-y": theme.gutterY,
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
      >
        {children}
      </MantineProvider>
    </>
  );
}
