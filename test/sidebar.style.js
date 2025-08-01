import { Style , Flex , Div , hsl } from "../clanga.js"




// themes (optional but very useful)
const
    primary = hsl( 163, 54, 25 ),
    secondary = hsl( 216, 55, 68 ),
    accent = hsl( 239, 55, 41 ),
    background = hsl( 163, 54, 95 ),
    text = hsl( 160, 52, 9 )
;



Style( ".my-list-2" , {
    all : Flex().use({ gap:"20px" , mode:"row" , wrap:true })
        .color({ fg:text , bg:background })
        .shape({ h:"200px"})
        .substyle( "my-item" , Div().shape({ w:"100%" }) ),

    s :  Div().shape({ w:"70%" }).color({fg:accent}),
})




Style( ".my-list-class" , {
    all : Flex().use({ gap:"20px" , mode:"row" , wrap:true })
        .justify( { col: "space-evenly" ,  row:"center" } )
        .align({ wstretch:true , right:"20px" , left:"20px" })
        .color({ fg:text , bg:background })
        .shape({ h:"200px" })
        .itemClass( ".my-child-flex-class" , {grow:1 , shrink:1} ),

    s :  Div().shape({ w:"70%" }),

    l : Div().shape({ w:"768px" }),
})



Style( ".my-div" , {
    all : Div().align({ wstretch:true , right:"20px" , left:"20px" })
        .shape({h:"200px"}) .color({fg:text , bg:background}),

    xs :  Div().shape({ h:"70%" }),

    xl : Div().shape({ h:"768px" }),
})


