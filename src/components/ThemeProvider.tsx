"use client";
import {
  MantineProvider,
  createTheme,
  CSSVariablesResolver,
  ColorSchemeScript,
} from "@mantine/core";

import type { ThemeColor } from "@/types/payload-types";
import defaultTheme from "@/lib/defaultTheme";
import { generateColorMap } from "@/lib/generatePalette";

export default function ThemeProvider({
  theme_colors = [],
  children,
}: {
  children: React.ReactNode,
  theme_colors: ThemeColor[]
}) {
  //@ts-ignore
  const mappedColors = generateColorMap(theme_colors);

  const themeArgs = {
    others: defaultTheme,
    colors: mappedColors,
    primaryColor: 'primary'
  }

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
      >
        {children}
      </MantineProvider>
    </>
  );
}
