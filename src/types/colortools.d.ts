declare module "@nextcss/color-tools"{

   export interface Tone {
        main?: string;
        [key: string]: string;
    }[];

    declare function toneMap( color: string ): Tone;
}