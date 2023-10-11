'use client';

//* process Chakra Theme provider theme

import {
    ChakraProvider,
    extendTheme,
    StyleFunctionProps,
    defineStyleConfig
  } from "@chakra-ui/react";

import { textStyles } from "@/lib/defaultStyles";

import { ButtonStyles } from '@/lib/componentStyles/button';
import generateToneMap from '@/lib/generatePalette';

export default function ThemeProvider({themeData, children}: {themeData: any, children: React.ReactNode}) {

    const mappedColors = generateToneMap(themeData.theme_colors);

    const theme = extendTheme({
      components: {
        Button: ButtonStyles
      },
      textStyles,
      colors: {...mappedColors}
    });
    return (
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
    );
}