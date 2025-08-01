import fs from "node:fs";



export let global_styles = {
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

    for( const screen_size in global_styles ) {

        let media_queries = media_queries_lookup[ screen_size ];

        // don't generate media queries if there are no classes in there
        if ( Object.keys(global_styles[ screen_size ]).length === 0 ) {
            continue;
        }

        raw_style += `\n${ media_queries } {  /*${screen_size}*/  \n`;
        
        for( const css_selector in global_styles[screen_size] ) {

            raw_style += `\n    ${css_selector} {\n`;

            for( const property in global_styles[screen_size][css_selector] ) {
                
                let property_style = global_styles[screen_size][css_selector][property];
                
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




export let media_queries_lookup = {
    all : "@media screen and (min-width: 1px)", 
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




export default function style( name , responsive_styles ) {

    for( let screen_size in responsive_styles ) {
        
        if( ! global_styles.hasOwnProperty( screen_size ) ) {
            throw Error( `screen size "${global_styles}" is invalid.` )
        }

        global_styles[ screen_size ][ name ] = responsive_styles[ screen_size ].styles;


        // add subclasses (children classes)
        for ( const subclass_name in responsive_styles[ screen_size ].children_styles ) {
            
            global_styles[ screen_size ][ `${name} > ${subclass_name}` ] = 
                    responsive_styles[ screen_size ].children_styles[ subclass_name ];
        
        }
        
    }

}

