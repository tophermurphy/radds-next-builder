import chroma from "chroma-js";
import { ThemeColor } from "@/types/payload-types";
import { MantineThemeColorsOverride } from "@mantine/core";

// TODO Refactor and clean up Types

type colorMap = {
  white?: string;
  black?: string;
  colors: MantineThemeColorsOverride;
};

export const generateToneMap = (colors: ThemeColor[]) => {
  let toneMap: colorMap = colors.reduce(
    (obj, val) => {
      if(typeof val === "string" || !val.color) {
        return obj;
      }
      const { name, color } = val;
      if (name === "white" || name == "black") {
        return { ...obj, [name]: color };
      } else {
        return {
          ...obj,
          colors: { ...obj.colors, ...generateColorArray(name, color) },
        };
      }
    },
    { colors: {} }
  );
  toneMap.white = toneMap.white || "#fff";
  toneMap.black = toneMap.black || "#000";
  return toneMap;
};

export const generateColorArray = (name: string, color: string) => {
  let colors: string[] = [];

  const baseValues = [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05];
  const darkValues = [
    0.5395, 0.4832, 0.4269, 0.3706, 0.3143, 0.258, 0.2017, 0.1454, 0.0891,
    0.0056,
  ];
  const lightValues = [
    0.9461, 0.8481, 0.7501, 0.6521, 0.5541, 0.4561, 0.3581, 0.2601, 0.1621,
    0.0181,
  ];

  let colorName: string;
  let lumValues: number[];

  if (name === "white") {
    colorName = "gray";
    lumValues = lightValues;
  } else if (name === "black") {
    colorName = "dark";
    lumValues = darkValues;
  } else {
    colorName = name;
    lumValues = baseValues;
  }

  const mainIndex = Math.round(chroma(color).luminance() * 10);

  lumValues.forEach((val) => {
    colors.push(chroma(color).set("oklch.l", val).toString());
  });

  if (name !== "white" && name !== "black") {
    colors[mainIndex] = color;
  }

  return { [colorName]: colors };
};

export default generateToneMap;

/*///
// Saving for the backend
*///

// export interface generatePaletteProps {
//   color: string;
//   name: string;
//   shades?: {
//     white: string;
//     black: string;
//   };
// }

// export const generatePalette = ({
//   color,
//   name,
//   shades,
// }: generatePaletteProps) => {
//   const { white = "#fff", black = "#000" } = shades || {};

//   if (!chroma.valid(color)) throw new Error("Not a valid color");

//   const getWCAG21score = (ratio: number) => {
//     switch (true) {
//       case ratio >= 7:
//         return 3;
//       case ratio >= 4.5:
//         return 2;
//       case ratio >= 3.1:
//         return 1;
//       default:
//         return 0;
//     }
//   };

//   const whiteScore = getWCAG21score(chroma.contrast(color, white));
//   const blackScore = getWCAG21score(chroma.contrast(color, black));

//   const getContrastScores = (
//     tone: string
//   ): { white: number; black: number } => ({
//     white: getWCAG21score(chroma.contrast(tone, white)),
//     black: getWCAG21score(chroma.contrast(tone, black)),
//   });

//   const mainScores = getContrastScores(color);

//   type ToneMap = readonly [number, string | undefined];

//   const blankMap: ToneMap[] = [
//     [3, undefined],
//     [2, undefined],
//     [1, undefined],
//   ];

//   const contrastScore = {
//     on_white: mainScores.white,
//     on_black: mainScores.black,
//   };

//   const tone_on_white = new Map(blankMap);
//   const tone_on_black = new Map(blankMap);

//   type onColor = {
//     A: string;
//     AA: string;
//     AAA: string;
//   };

//   interface Tones {
//     [key: string | number]: string | onColor | typeof contrastScore;
//   }

//   const invert = chroma(color).luminance() > 0.5 ? black : white;

//   let tones: Tones = {
//     main: color,
//     invert,
//   };

//   // Check if main fullfills contrast
//   // score and if so fill
//   // in tone_on <color>
//   tone_on_white.forEach((val, key, map) => {
//     if (whiteScore >= key) {
//       map.set(key, color);
//     }
//   });

//   tone_on_black.forEach((val, key, map) => {
//     if (blackScore >= key) {
//       map.set(key, color);
//     }
//   });

//   // Generate Tones
//   let prevTone = {
//     color: "#fff",
//     white: 3,
//     black: 0,
//   };

//   for (let i = 0.05; i < 1; i += 0.05) {
//     const j = Math.round(i * 100) / 100;

//     const index = Math.round(1000 - i * 1000);

//     const newTone = chroma(color).set("oklch.l", i).toString();
//     const toneScores = getContrastScores(newTone);

//     if (prevTone.white > toneScores.white) {
//       if (!tone_on_white.get(prevTone.white) && prevTone.white) {
//         tone_on_white.set(prevTone.white, prevTone.color);
//       }
//     }

//     if (toneScores.black > prevTone.black) {
//       if (!tone_on_black.get(toneScores.black) && toneScores.black) {
//         tone_on_black.set(toneScores.black, newTone);
//       }
//     }

//     // Update Previous Tone
//     prevTone.color = newTone;
//     prevTone.white = toneScores.white;
//     prevTone.black = toneScores.black;

//     tones[index] = newTone;
//   }

//   tones.onWhite = {
//     A: tone_on_white.get(1) || "",
//     AA: tone_on_white.get(2) || "",
//     AAA: tone_on_white.get(3) || "",
//   };

//   tones.onBlack = {
//     A: tone_on_black.get(1) || "",
//     AA: tone_on_black.get(2) || "",
//     AAA: tone_on_black.get(3) || "",
//   };

//   tones.contrastScore = contrastScore;

//   return { [name]: tones };
// };