import style from "./compiler.js";



export const Style = style



export class Clanga {


    static align({ 
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
    
            this.apply_style( "position" , "fixed" ); 
            is_positioned = true
        }
        if ( relative ) {
            if( is_positioned ) {
                throw new Error( "you can either use \"fixed\" or \"relative\" or \"sticky\" but never together (if left blank it will default to absolute" )
            }
    
            this.apply_style( "position" , "relative" ); 
        }
        if ( sticky ) {
            if( is_positioned ) {
                throw new Error( "you can either use \"fixed\" or \"relative\" or \"sticky\" but never together (if left blank it will default to absolute" )
            }
    
            this.apply_style( "position" , "sticky" ); 
        } 
        if( ! is_positioned ) {
            this.apply_style( "position" , "absolute" ); 
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
            this.apply_style( "transform" , `translate( ${xcenter?"50%":"0"} , ${ycenter?"50%":"0"} )` );
        }

        this.apply_style( "z-index" , z );

        // add positioning styles
        if ( hstretch ) {
            this.is_y_stretched = true
            this.apply_style( "top" , top?top:"0px" );
            this.apply_style( "height" , `calc( 100% - ${top?top:"0px"} - ${bottom?bottom:"0px"} )` );
        } else {
            this.apply_style( "top" , top ); 
            this.apply_style( "bottom" , bottom ); 
        }

        if ( wstretch ) {
            this.is_x_stretched = true
            this.apply_style( "left" , left?left:"0px" );
            this.apply_style( "width" , `calc( 100% - ${left?left:"0px"} - ${right?right:"0px"} )` );
        } else {
            this.apply_style( "left" , left ); 
            this.apply_style( "right" , right ); 
        }

        return this;

    }


    static visual( { fg , bg , border , radius , w , h } ) {
        
        if ( ! this.styles ) {
            this.styles = {};
        }
        
        this.apply_style( "color" , fg );
        this.apply_style( "background-color" ,  bg );
        this.apply_style( "border" , border );
        this.apply_style( "border-radius" , radius );

        // because .align sets "width" and "height" you gotta prevent this from overwriting it 
        if ( w ) {
            if (this.is_x_stretched ) {
                throw new Error( "you cannot use \"wstretch\" and \"h\" together" )
            }

            this.apply_style( "width" , w );
        }

        if ( h ) {
            if (this.is_y_stretched ) {
                throw new Error( "you cannot use \"hstretch\" and \"h\" together" )
            }

            this.apply_style( "height" , h );
        }
        
        return this;
    }


    static apply_style( property , style , empty=undefined ) {

        if( !style ) {
            style = empty;
        }
/*
        if( this.children_styles ) {
            
            //let children_styles =  property: style;
            
            this.children_styles[ this.child_selected ]
        }
*/
        if ( ! this.styles ) {
            this.styles = {};
        }
        this.styles[ property ] = style;
    }


    static extra( extra_styles ) {
        for( let property in extra_styles ) {
            this.styles[ property ] = extra_styles[ property ];
        }
    }


    static get_styles () {

        if( !this.styles ){
            this.styles = {}
        }

        return this.styles
    }


    static child( child_selected ) {
        this.child_selected = (child_selected==="all") ? -1 : child_selected;

        if ( ! this.children_styles ) {
            this.children_styles = {};
        }

        return this;
    }


}




export class Flex extends Clanga {


    static use ( { gap, mode , wrap=false , reverse=false , reverse_wrap=false } ) {

        if ( ! this.styles ) {
            this.styles = {};
        }
        
        let justify_content , align_items;
        this.apply_style( "display" , "flex" );
        3
        if ( mode === "row" ) {
            this.apply_style( "flex-direction" , reverse?"row-reverse":"row" );
        } else if ( mode === "col" ) {
            this.apply_style( "flex-direction" , reverse?"column-reverse":"column" );
        } else {
            console.error( "mode in Flex:Box can only be \"row\" or \"column\" " );
        }

        this.mode = mode
        
        this.apply_style( "gap" , gap );
        this.apply_style( "align-items" , align_items );
        this.apply_style( "align-content" , wrap ? align_items : "" );
        this.apply_style( "justify-content" , justify_content );
        this.apply_style( "flex-wrap" ,  wrap?( reverse_wrap?"wrap-reverse":"wrap" ):"nowrap" );
    
        return this;
    }


    static justify ( { row , col } ) {

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
            console.error( "mode in Flex:Box can only be \"row\" or \"column\" " );
        }

        this.apply_style( "align-items" , this.wrap ? null : align_items );
        this.apply_style( "align-content" , this.wrap ? align_items : null );
        this.apply_style( "justify-content" , justify_content );
        
        return this;
    }


}




export const This = Clanga;




export function hsl(hue, saturation, lightness, alpha) {
    return `hsl(${hue.toString()},${saturation.toString()},${lightness.toString()},${ alpha?alpha:"1" })` ;
}




export function rgb(red, green, blue , alpha ) {
    return `rgba(${hue.toString()},${saturation.toString()},${lightness.toString()},${ alpha?alpha:"1" })`;
}


