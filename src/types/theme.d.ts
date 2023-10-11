namespace Theme {
    export interface Theme {
        font_family_heading?: string;
        font_family_body: string;
    }

    export interface Color {
        name: string;
        color_hex: string;
    }

    export interface Colors {
        theme_colors: Color[];
    }
}