import fs from "node:fs";



let global_styles = {
    all : {},
    xxxs : {},
    xxs : {},
    xs : {} ,
    s : {} ,
    m : {} ,
    l : {} ,
    xl : {} ,
    xxl : {},
    xxxl : {},
    xxxxxl : {}
}



export let media_queries_lookup = {
    all : "@media screen and (min-width: 1px)", 
    xxxs : "@media screen and (min-width: 156px)",
    xxs : "@media screen and (min-width: 270px)",
    xs : "@media screen and (min-width: 319px)", // almost the smallest smartphones
    s : "@media screen and (min-width: 568px)",
    m : "@media screen and (min-width: 768px)",
    l : "@media screen and (min-width: 1024px)",
    xl : "@media screen and (min-width: 1280px)",
    xxl : "@media screen and (min-width: 1920px)",
    xxxl : "@media screen and (min-width: 2560px)",
    xxxxl : "@media screen and (min-width: 3840px)",
    xxxxxl : "@media screen and (min-width: 6016px)",
}


export function style( name , responsive_styles ) {
    
    for( const screen_size in responsive_styles ) {
        if( ! global_styles.hasOwnProperty( screen_size ) ) {
            throw Error( `screen size "${global_styles}" is invalid.` )
        }

        let class_style = {}
        class_style[ name ] = responsive_styles[ screen_size ].styles


        global_styles[ screen_size ] = class_style;
    }

}





process.on('beforeExit', (code) => {

    let raw_style = "";

    for( const screen_size in global_styles ) {

        let media_queries = media_queries_lookup[ screen_size ];
        raw_style += `\n${ media_queries } {  /*${screen_size}*/  \n`;

        for( const class_name in global_styles[screen_size] ) {

            raw_style += `\n    .${class_name} {\n`;

            for( const property in global_styles[screen_size][class_name] ) {
                
                let property_style = global_styles[screen_size][class_name][property];
                
                if( property_style ) {
                    raw_style += `        ${property}: ${property_style};\n`;
                }
            }

            raw_style += `    }\n\n`;
        }

        raw_style += `}\n\n\n`;
    }
    fs.writeFileSync( process.argv[1].slice( 0, process.argv[1].length - 3)+".css" , raw_style, 'utf8' );
});






export class Clanga {


    static self(  { top , bottom , right , left , z , fixed=false , xcenter=false , ycenter=false }  ) {
            
        if ( ! this.styles ) {
            this.styles = {};
        }

        // set position
        if ( fixed ) {
            this.apply_style( "position" , "fixed" ); 
        } else {
            this.apply_style( "position" , "absolute" ); 
        }
        
        // preventing conflicts between center properties and absolute positioning options
        if( ycenter && (top || bottom) ) {
            new Error( "you cannot use \"ycenter\" and properties like \"bottom\" or \"top\"" );
        }
        if( xcenter && (right || left) ) {
            new Error( "you cannot use \"xcenter\" and properties like \"right\" or \"left\"" );
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

        // add positioning styles
        this.apply_style( "top" , top ); 
        this.apply_style( "bottom" , bottom ); 
        this.apply_style( "right" , right ); 
        this.apply_style( "left" , left );
        this.apply_style( "z-index" , z );

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
        this.apply_style( "width" , w );
        this.apply_style( "height" , h );
        
        return this;
    }
    

    static apply_style( property , style , empty=undefined ) {
        if( !style ) {
            style = empty;
        }
        
        this.styles[ property ] = style;
    }


    static extra( extra_styles ) {
        for( let property in extra_styles ) {
            this.styles[ property ] = extra_styles[ property ];
        }
    }


}




export class Flex extends Clanga {


    static use ( { gap, mode , wrap=false , row , col , reverse_wrap } ) {

        if ( ! this.styles ) {
            this.styles = {};
        }
        
        let justify_content , align_items
        
        if ( mode === "row" ) {
            justify_content = row;
            align_items = col;
        } else if ( mode === "col" ) {
            justify_content = col;
            align_items = row;
        } else {
            console.error( "mode in Flex:Box can only be \"row\" or \"column\" " );
        }
        
        this.apply_style( "display" , "flex" );
        this.apply_style( "gap" , gap );
        this.apply_style( "align-items" , align_items );
        this.apply_style( "align-content" , wrap ? align_items : "" );
        this.apply_style( "justify-content" , justify_content );
        if ( wrap ) {
            this.apply_style( "flex-wrap" , "wrap" );
        } else if ( reverse_wrap ) {
            this.apply_style( "flex-wrap" , "wrap-reverse" );
        }

        return this;
    }


}


