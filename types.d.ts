import { componenet } from "./compiler.js";

export function Style( selector:string , responsive_styles:ReactiveStyle ): componenet;
export function Edit( style_component:componenet , responsive_styles:ReactiveStyle ) : componenet
export function Sheet( responsive_styles:ReactiveStyle ) : componenet

export type ReactiveStyle = Record<string, Record<string, Clanga> >
export type ClangaStyle = Record<string, Clanga>
export type CustomeStyle = Record<string, string>

export interface AlignOptions {
    top?: string;
    bottom?: string;
    right?: string;
    left?: string;
    z?: number;
    fixed?: boolean;
    sticky?: boolean;
    relative?: boolean;
    xcenter?: boolean;
    ycenter?: boolean;
    wstretch?: boolean;
    hstretch?: boolean;
}

export interface PadOptions {
    top?: string;
    bottom?: string;
    right?: string;
    left?: string;
    all?: string;
}

export interface ColorOptions {
    fg?: string;
    bg?: string;
}

export interface ShapeOptions {
    h?: string;
    w?: string;
    radius?: string;
}

export interface BorderSideOptions {
    color?: string;
    width?: string;
    style?: string;
}

export interface BorderOptions {
    all?: BorderSideOptions;
    top?: BorderSideOptions;
    bottom?: BorderSideOptions;
    right?: BorderSideOptions;
    left?: BorderSideOptions;
}

export interface FontOptions {
    family?:string;
    line_height?:string;
    weight?:string;
    size?:string;
    variant_caps?:string;
    stretch?:string;
    word_spacing?:string;
    letter_spacing?:string;
    variant?:string;
    indent?:string;
    word_break_mode?:string;
    hyphens?:string;
    overflow?:string;
    break_word?:boolean;
    align?:string;
    align_last?:string;
    transform?:string;
    decoration?:string;
    decoration_color?:string;
    decoration_style?:string;
    direction?:string;
    writing_mode?:string;
    white_space?:string;
}

export class Clanga {
    styles:CustomeStyle;
    children_styles:CustomeStyle | null;
    is_y_stretched:boolean;
    is_x_stretched:boolean;

    align( align_options:AlignOptions ) : this;
    pad( pad_options:PadOptions ) : this;
    color( color_options:ColorOptions ) : this;
    shape( shape_options:ShapeOptions ) :this;
    border( border_options:BorderOptions ) : this;
    font( font_options:FontOptions ) : this;
    extra( extra_styles:CustomeStyle ) : this;
    substyle( subclass:string , children_styles:ClangaStyle ): this;
    child( nth_child:number , children_styles:ClangaStyle ): this;
}

export interface FlexUseOptions {
    gap?: string;
    mode?: "row" | "col"; 
    wrap?: boolean;
    reverse?: boolean;
    reverse_wrap?:boolean;
}

export interface JustifyOptions {
    row?:string;
    col?:string;
}

export interface FlexSubstyleOptions {
    grow?:number;
    shrink?:number;
    order?:number;
    align?:string;
    basis?:string
}

export class FlexObj extends Clanga {
    mode:string
    is_wrap:boolean

    constructor();
    use ( options:FlexUseOptions ) : this;
    justify ( justify_options:JustifyOptions ) : this
    itemClass( subclass:string , flex_fixed_substyles:FlexSubstyleOptions ) : this;
    item( nth_child:number , flex_fixed_substyles:FlexSubstyleOptions ) : this;
}

export function Div(): Clanga;
export function Flex(): FlexObj;

