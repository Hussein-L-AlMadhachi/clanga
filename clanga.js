import {style, componenet } from "./compiler.js";



export function Style( selector , responsive_styles ) {
    return style( selector , responsive_styles , false );
}



// simple yet very very useful to extend styles (this is designed to overwrite exiting styles)
export function Edit( style_component , responsive_styles ) {
    return style( style_component.selector , responsive_styles , true );
}



export function Sheet( responsive_styles ) {
    const style_componenet = new componenet();
    style_componenet.extend( responsive_styles );

    return style_componenet;
}




export class Clanga {


    constructor() {
        this.styles = {};
        this.children_styles = null;
        this.is_y_stretched = false;
        this.is_x_stretched = false;
    }


    align({ 
        top , bottom , right , left , z , fixed=false , sticky=false,
        relative=false, xcenter=false , ycenter=false , wstretch=false , hstretch=false 
    }) {
        
        if ( ! this.styles ) {
            this.styles = {};
        }
        
        // set position
        let is_positioned = false;
        if( is_positioned ) {
            throw new Error( "you can either use \"fixed\" or \"relative\" or \"sticky\" but never together (if none specified it will default to absolute)" )
        }
        if ( fixed ) {
            if( is_positioned ) {
                throw new Error( "you can either use \"fixed\" or \"relative\" or \"sticky\" but never together (if none specified it will default to absolute)" )
            }
            
            this.__apply_style( "position" , "fixed" ); 
            is_positioned = true
        }
        if ( relative ) {
            if( is_positioned ) {
                throw new Error( "you can either use \"fixed\" or \"relative\" or \"sticky\" but never together (if left blank it will default to absolute" )
            }
    
            this.__apply_style( "position" , "relative" ); 
        }
        if ( sticky ) {
            if( is_positioned ) {
                throw new Error( "you can either use \"fixed\" or \"relative\" or \"sticky\" but never together (if left blank it will default to absolute" )
            }
            
            this.__apply_style( "position" , "sticky" ); 
        } 
        if( ! is_positioned ) {
            this.__apply_style( "position" , "absolute" ); 
        }

        // preventing conflicts between center properties and absolute positioning options
        if( (ycenter && (top || bottom)) || (ycenter && hstretch) ) {
            new Error( "you cannot use \"ycenter\" and properties like \"bottom\", \"top\" or \"hstretch\"." );
        }
        if( xcenter && (right || left) || (ycenter && wstretch) ) {
            new Error( "you cannot use \"xcenter\" and properties like \"right\", \"left\" or \"wstretch\"." );
        }


        // center element
        let is_center_used = false;
        if( ycenter ) {
            is_center_used = true;
            bottom = "50%"
        }
        if( xcenter ) {
            is_center_used = true;
            right = "50%"
        }
        if ( is_center_used ) {
            this.__apply_style( "transform" , `translate( ${xcenter?"50%":"0"} , ${ycenter?"50%":"0"} )` );
        }

        this.__apply_style( "z-index" , z );

        // add positioning styles
        if ( hstretch ) {
            this.is_y_stretched = true
            this.__apply_style( "top" , top?top:"0px" );
            this.__apply_style( "height" , `calc( 100% - ${top?top:"0px"} - ${bottom?bottom:"0px"} )` );
        } else {
            this.__apply_style( "top" , top ); 
            this.__apply_style( "bottom" , bottom ); 
        }

        if ( wstretch ) {
            this.is_x_stretched = true
            this.__apply_style( "left" , left?left:"0px" );
            this.__apply_style( "width" , `calc( 100% - ${left?left:"0px"} - ${right?right:"0px"} )` );
        } else {
            this.__apply_style( "left" , left ); 
            this.__apply_style( "right" , right ); 
        }

        return this;

    }


    pad({left , top , right , bottom , all}) {

        this.__apply_style( "padding" , all );
        this.__apply_style( "padding-top" , top );
        this.__apply_style( "padding-bottom" , bottom );
        this.__apply_style( "padding-right" , right );
        this.__apply_style( "padding-left" , left );
        return this;
    }


    color( {fg , bg} ) {
        this.__apply_style( "color" , fg );
        this.__apply_style( "background-color" ,  bg );

        return this;
    }


    shape( { radius , w , h } ) {
        
        if ( ! this.styles ) {
            this.styles = {};
        }
        
        this.__apply_style( "border-radius" , radius );
        
        // because .align sets "width" and "height" you gotta prevent this from overwriting it 
        if ( w ) {
            if (this.is_x_stretched ) {
                throw new Error( "you cannot use \"wstretch\" and \"w\" together" )
            }
            
            this.__apply_style( "width" , w );
        }    
        
        if ( h ) {
            if (this.is_y_stretched ) {
                throw new Error( "you cannot use \"hstretch\" and \"h\" together" )
            }    
            
            this.__apply_style( "height" , h );
        }    
        
        return this;
    }


    /**
     *  all parameters are {color,style,width}
     * 
     *  "all" sets all "top","bottom","right" and "left"
     *    then each of these a can be used to overwrite the styles 
     *    set by "all"
     */
    border( { top , bottom , right , left , all } ){

        this.__apply_border_style( "" , all );
        this.__apply_border_style( "top" , top );
        this.__apply_border_style( "bottom" , bottom );
        this.__apply_border_style( "right" , right );
        this.__apply_border_style( "left" , left );

        return this;
    }


    font({
        family , line_height , weight , size , variant_caps , stretch , word_spacing ,
        letter_spacing , variant , indent , word_break_mode , hyphens , overflow , break_word ,
        align , align_last , transform , decoration , decoration_color , decoration_style ,
        direction , writing_mode , white_space , 
    }) {

        this.__apply_style( "font-family" , family );
        this.__apply_style( "font-size" , size );
        this.__apply_style( "font-weight" , weight );
        this.__apply_style( "line-height" , line_height );
        this.__apply_style( "font-stretch" , stretch );
        this.__apply_style( "font-variant-caps" , variant_caps );
        this.__apply_style( "font-variant" , variant );

        this.__apply_style( "word-spacing" , word_spacing );
        this.__apply_style( "letter-spacing" , letter_spacing );
        this.__apply_style( "text-indent" , indent );

        this.__apply_style( "text-align" , align );
        this.__apply_style( "text-align-last" , align_last );
        this.__apply_style( "text-transform" , transform );

        this.__apply_style( "text-decoration" , decoration );
        this.__apply_style( "text-decoration-color" , decoration_color );
        this.__apply_style( "text-decoration-style" , decoration_style );

        this.__apply_style( "direction" , direction );
        this.__apply_style( "writing-mode" , writing_mode );

        this.__apply_style( "word-break" , word_break_mode );
        this.__apply_style( "white-space" , white_space );
        this.__apply_style("hyphens" , hyphens );

        this.__apply_style( "overflow-wrap" , break_word?"":"break-word" );
        this.__apply_style( "text-overflow" , overflow );

        return this;
    }


    extra( extra_styles ) {
        if ( ! this.styles ) {
            this.styles = {};
        }    
        
        for( let property in extra_styles ) {
            this.styles[ property ] = extra_styles[ property ];
        }    
        return this;
    }    
    
    
    substyle( subclass , children_styles ) {
        if ( ! this.children_styles ) {
            this.children_styles = {}
        }    
        
        
        this.children_styles[ subclass ] = {}
        this.children_styles[ subclass ] = children_styles.styles;
        return this;
    }    

    
    child( nth_child , children_styles ) {
        this.substyle( `:nth-child(${nth_child})` , children_styles );
        return this;
    }        


    /**
     *   "css_side_selector" is "" for selecting all border sides
     *     "right" for right border side, "left" for left border 
     *     side "top" for upper border side and finally "bottom" for
     *     the lower border side
     */
    __apply_border_style( css_side_selector , {color,style,width} ){
        const side_selector = "border"+css_side_selector?`-{css_side_selector}`:"";
    
        this.__apply_style( `${side_selector}-color` , color );
        this.__apply_style( `${side_selector}-style` , style );
        this.__apply_style( `${side_selector}-width` , width );
    }


    __apply_style( property , style , empty=undefined ) {
    
        if( !style ) {
            style = empty;
        }    
    
        if ( ! this.styles ) {
            this.styles = {};
        }    
        this.styles[ property ] = style;
    }    


}





export class FlexObj extends Clanga {


    constructor() {
        super();
        this.mode = "";
        this.is_wrap = true;
    }


    use ( { gap, mode , wrap=true , reverse=false , reverse_wrap=false } ) {

        if ( ! this.styles ) {
            this.styles = {};
        }

        this.__apply_style( "display" , "flex" );

        if ( mode === "row" ) {
            this.__apply_style( "flex-direction" , reverse?"row-reverse":"row" );
        } else if ( mode === "col" ) {
            this.__apply_style( "flex-direction" , reverse?"column-reverse":"column" );
        } else {
            console.error( "mode in Flex can only be \"row\" or \"column\" " );
        }

        this.mode = mode;
        this.is_wrap = wrap;

        this.__apply_style( "gap" , gap );
        this.__apply_style( "flex-wrap" ,  wrap?( reverse_wrap?"wrap-reverse":"wrap" ):"nowrap" );

        return this;
    }


    justify ( { row , col } ) {

        if ( ! this.styles ) {
            this.styles = {};
        }

        if ( ! this.mode ) {
            this.mode = "row";
        }
        
        let justify_content , align_items;
        
        if ( this.mode === "row" ) {
            justify_content = row;
            align_items = col;
        } else if ( this.mode === "col" ) {
            justify_content = col;
            align_items = row;
        } else {
            console.error( "mode in Flex can only be \"row\" or \"column\" " );
        }

        this.__apply_style( "align-items" , this.is_wrap ? null : align_items );
        this.__apply_style( "align-content" , this.is_wrap ? align_items : null );
        this.__apply_style( "justify-content" , justify_content );
        
        return this;
    }


    itemClass( subclass , { grow , shrink , basis , align , order } ) {

        this.substyle( subclass , (new Clanga).extra( {
            "flex-grow" : grow?grow:"0",
            "flex-shrink" : shrink?shrink:"0",
            "flex-basis" : basis?basis:"auto",
            "order" : order?order:"0",
            "align-self" : align?align:"auto",
        } ) );

        return this;
    }

    item( nth_child , { grow , shrink , basis , align , order } ) {

        this.child( nth_child , Clanga.extra( {
            "flex-grow" : grow?grow:"0",
            "flex-shrink" : shrink?shrink:"0",
            "flex-basis" : basis?basis:"auto",
            "order" : order?order:"0",
            "align-self" : align?align:"auto",
        } ) );

        return this;
    }
}




export function Div() {
    return new Clanga;
}




export function Flex() {
    return new FlexObj;
}




export function hsl(hue, saturation, lightness, alpha) {
    return `hsl(${hue.toString()},${saturation.toString()},${lightness.toString()},${ alpha?alpha:"1" })` ;
}




export function rgb(red, green, blue , alpha ) {
    return `rgba(${red.toString()},${green.toString()},${blue.toString()},${ alpha?alpha:"1" })`;
}


