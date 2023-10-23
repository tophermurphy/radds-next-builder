"use client";
import {
  MantineProvider,
  createTheme,
  CSSVariablesResolver,
  ColorSchemeScript,
  VariantColorsResolver,
  defaultVariantColorsResolver,
} from "@mantine/core";

import type { ThemeColor } from "@/types/payload-types";
import defaultTheme from "@/lib/defaultTheme";
import { generateToneMap } from "@/lib/generatePalette";

export default function ThemeProvider({
  theme_colors = [],
  children,
}: {
  children: React.ReactNode;
  theme_colors: ThemeColor[];
}) {
  
  const mappedColors = generateToneMap(theme_colors);

  const variantColorResolver: VariantColorsResolver = (input) => {
    const defaultResolvedColors = defaultVariantColorsResolver(input);

    if (input.variant === "outline") {
      return {
        ...defaultResolvedColors,
        background: input.theme.white || "#fff",
      };
    }
    return defaultResolvedColors;
  };

  const themeArgs = {
    other: defaultTheme,
    primaryColor: "primary",
    variantColorResolver: variantColorResolver,
    ...mappedColors,
  };

  const theme = createTheme(themeArgs);

  const variables: CSSVariablesResolver = (theme) => ({
    variables: {
      "--mantine-gutter": theme.other.gutter,
      "--mantine-gutter-x": theme.other.gutterX,
      "--mantine-gutter-y": theme.other.gutterY,
    },
    light: {},
    dark: {},
  });

  return (
    <>
      <ColorSchemeScript forceColorScheme="light" />
      <MantineProvider
        theme={theme}
        defaultColorScheme="light"
        forceColorScheme="light"
        withCssVariables={true}
        cssVariablesResolver={variables}
      >
        {children}
      </MantineProvider>
    </>
  );
}
