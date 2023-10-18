import chroma from "chroma-js";
import { ThemeColor } from "@/types/payload-types";
import { generateColors } from '@mantine/colors-generator';
import { MantineThemeColors } from "@mantine/core";


// TODO Refactor and clean up Types
// TODO Change incoming API color model from 
// { name, color_hex }
/// to { name, value, space }

export interface generatePaletteProps {
  color: string;
  name: string;
  shades?: {
    white: string;
    black: string;
  };
}

export const generatePalette = ({
  color,
  name,
  shades,
}: generatePaletteProps) => {
  const { white = "#fff", black = "#000" } = shades || {};

  if (!chroma.valid(color)) throw new Error("Not a valid color");

  const getWCAG21score = (ratio: number) => {
    // console.log('ratio', ratio)
    switch (true) {
      case ratio >= 7:
        return 3;
      case ratio >= 4.5:
        return 2;
      case ratio >= 3.1:
        return 1;
      default:
        return 0;
    }
  };

  const whiteScore = getWCAG21score(chroma.contrast(color, white));
  const blackScore = getWCAG21score(chroma.contrast(color, black));

  const getContrastScores = (
    tone: string
  ): { white: number; black: number } => ({
    white: getWCAG21score(chroma.contrast(tone, white)),
    black: getWCAG21score(chroma.contrast(tone, black)),
  });

  const mainScores = getContrastScores(color);

  type ToneMap = readonly [number, string | undefined];

  const blankMap: ToneMap[] = [
    [3, undefined],
    [2, undefined],
    [1, undefined],
  ];

  const contrastScore = {
    on_white: mainScores.white,
    on_black: mainScores.black
  }

  const tone_on_white = new Map(blankMap);
  const tone_on_black = new Map(blankMap);

  type onColor = {
    A: string,
    AA: string,
    AAA: string
  }

  interface Tones {
    [key: string | number]: string | onColor | typeof contrastScore;
  }

  const invert = chroma(color).luminance() > .5 ? black : white;

  console.log(`${name}: , lum: ${chroma(color).luminance()}, inv: ${invert}`)

  let tones: Tones = {
    main: color,
    invert
  };

  // Check if main fullfills contrast 
  // score and if so fill 
  // in tone_on <color> 
  tone_on_white.forEach((val, key, map) => {
    if (whiteScore >= key) {
      map.set(key, color);
    }
  });

  tone_on_black.forEach((val, key, map) => {
    if (blackScore >= key) {
      map.set(key, color);
    }
  });

  // Generate Tones
  let prevTone = {
    color: "#fff",
    white: 3,
    black: 0,
  };

  for (let i = 0.05; i < 1; i += 0.05) {
    const j = Math.round(i * 100) / 100;

    const index = Math.round(1000 - i * 1000);

    const newTone = chroma(color).set("oklch.l", i).toString();
    const toneScores = getContrastScores(newTone);

    if (prevTone.white > toneScores.white) {
      if (!tone_on_white.get(prevTone.white) && prevTone.white) {
        tone_on_white.set(prevTone.white, prevTone.color);
      }
    }

    if (toneScores.black > prevTone.black) {
      if (!tone_on_black.get(toneScores.black) && toneScores.black) {
        tone_on_black.set(toneScores.black, newTone);
      }
    }

    // Update Previous Tone
    prevTone.color = newTone;
    prevTone.white = toneScores.white;
    prevTone.black = toneScores.black;

    tones[index] = newTone;
  }

  tones.onWhite = {
    A: tone_on_white.get(1) || '',
    AA: tone_on_white.get(2) || '',
    AAA: tone_on_white.get(3) || ''
  }

  tones.onBlack = {
    A: tone_on_black.get(1) || '',
    AA: tone_on_black.get(2) || '',
    AAA: tone_on_black.get(3) || ''
  }

  tones.contrastScore = contrastScore;

  return { [name]: tones };
};

export const generateToneMap = (
  colors: { name: string; color: string }[]
) =>
  colors.reduce(
    (obj, { name, color }) => ({
      ...obj,
      ...generatePalette({ name, color: color }),
    }),
    {}
  );

  //! Need to make this an object
   export const generateColorMap = (colors: ThemeColor[]) => {
      return colors.reduce( (obj, col) => {
        if( col.name && col.color ){
          const array = generateColorArray(col.color);
          return {...obj, [col.name]: array}
        } else {
          return obj
        }
        // if( col.name && col.color ){
        //   const array = generateColorArray(col.color);
        //   return {
        //     [col.name]: array
        //   }
        // }
      }, {});
      
  }

export const generateManColors = (colors: ThemeColor[]) => {
  return colors.map(col => {
    if(col.name && col.color){
      const array = generateColors(col.color);
      return {
        [col.name]: array
      }
    }
  })
}

export const generateColorArray = (color: string) =>  {
  let colors : string [] = [];

  const lumValues = [ .9, .8, .7, .6, .5, .4, .3, .2, .1, .05 ];

  const mainIndex = Math.round(chroma(color).luminance() * 10);

  lumValues.forEach( val => {
    colors.push(
      chroma(color).set("oklch.l", val).toString()
    )
  })

  colors[mainIndex] = color;

  return colors;

}



export default generateToneMap;

