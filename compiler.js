import fs from "node:fs";



export const global_styles = {
    all : {},
    xxxxs : {},
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





process.on('beforeExit', (code) => {

    let raw_style = "";
    let n_selectors = "";

    for( const screen_size in global_styles ) {

        let media_queries = media_queries_lookup[ screen_size ];

        // don't generate media queries if there are no classes in there
        if ( Object.keys(global_styles[ screen_size ]).length === 0 ) {
            continue;
        }

        if ( screen_size != "all" )
                raw_style += `\n${ media_queries } {  /*${screen_size}*/  \n`;

        for( const css_selector in global_styles[screen_size] ) {
            n_selectors ++;

            raw_style += "\n"
            if ( screen_size != "all" )     raw_style += `    `;

            raw_style += `${css_selector} {\n`;

            for( const property in global_styles[screen_size][css_selector] ) {
                
                let property_style = global_styles[screen_size][css_selector][property];

                if( property_style ) {
                    if ( screen_size != "all" )     raw_style += `    `;
                    raw_style += `    ${property}: ${property_style};\n`;
                }
            }

            if ( screen_size != "all" )     raw_style += `    `;
            raw_style += `}\n\n`;
        }

        if ( screen_size != "all" )     raw_style += `}\n\n\n`;

    }

    if (n_selectors == 0) return;
    fs.writeFileSync( process.argv[1].slice( 0, process.argv[1].length - 3)+".css" , raw_style, 'utf8' );
});





export let media_queries_lookup = {
    all : "", // do not remove. this is used for verification even though no media query is used
    xxxxs : "@media screen and (min-width: 90px)", // smart watches
    xxxs : "@media screen and (min-width: 156px)",
    xxs : "@media screen and (min-width: 270px)", // almost the smallest smartphone
    xs : "@media screen and (min-width: 319px)",
    s : "@media screen and (min-width: 568px)",
    m : "@media screen and (min-width: 768px)",
    l : "@media screen and (min-width: 1024px)",
    xl : "@media screen and (min-width: 1280px)",
    xxl : "@media screen and (min-width: 1920px)",
    xxxl : "@media screen and (min-width: 2560px)",
    xxxxl : "@media screen and (min-width: 3840px)",
    xxxxxl : "@media screen and (min-width: 6016px)",
}





export class componenet {


    selector = "";
    responsive_styles = {};


    apply( selector ) {
        this.selector = selector;
        style( selector , this.responsive_styles );
        return this;
    }


    extend( responsive_styles ) {
        
        for ( const screen_size in responsive_styles ) {
            
            if( ! global_styles.hasOwnProperty( screen_size ) ) {
                throw Error( `screen size "${screen_size}" is invalid.` );
            }

            if(! this.responsive_styles[ screen_size ] ) {
                this.responsive_styles[ screen_size ] = {};
            }

            for ( const style in responsive_styles[ screen_size ] ) {
                

                this.responsive_styles[ screen_size ][ style ] =
                        responsive_styles[ screen_size ][ style ];
            }

        }

        return this;
    }


    clone() {
        const newInstance = new this.constructor();
        newInstance.extend(structuredClone(this.responsive_styles));
        return newInstance;
    }


}





export function style( selector , responsive_styles , extending=false ) {

    for( const screen_size in responsive_styles ) {
        
        if( ! global_styles.hasOwnProperty( screen_size ) ) {
            throw Error( `screen size "${global_styles}" is invalid.` )
        }

        if ( global_styles[ screen_size ][ selector ] && !extending ) {
            throw Error( `you can't overwrite ${selector} but you can edit it with Edit(...)` )
        }

        global_styles[ screen_size ][ selector ] = responsive_styles[ screen_size ].styles;


        // add substyles (children styles)
        for ( const substyle_name in responsive_styles[ screen_size ].children_styles ) {
            
            global_styles[ screen_size ][ `${selector} > ${substyle_name}` ] = 
                    responsive_styles[ screen_size ].children_styles[ substyle_name ];
        
        }
        
    }

    let style_component = new componenet( responsive_styles );
    style_component.selector = selector;

    return style_component;

}





