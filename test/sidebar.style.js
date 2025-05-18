import { Style , Flex , This , hsl } from "../clanga.js"




// themes (optional but very useful)
const
    primary = hsl( 163, 54, 25 ),
    secondary = hsl( 216, 55, 68 ),
    accent = hsl( 239, 55, 41 ),
    background = hsl( 163, 54, 95 ),
    text = hsl( 160, 52, 9 )
;




Style( "my-list-2" , {
    all : Flex().use({ gap:"20px" , mode:"row" , wrap:true })
        .visual({ h:"200px" , fg:text , bg:background })
        .substyle( "my-item" , This().visual({ w:"100%" }) ),

    s :  This().visual({ w:"70%" }),
})




Style( "my-list-class" , {
    all : Flex().use({ gap:"20px" , mode:"row" , wrap:true })
        .justify( { col: "space-evenly" ,  row:"center" } )
        .align({ wstretch:true , right:"20px" , left:"20px" })
        .visual({ h:"200px" , fg:text , bg:background })
        .itemClass( "my-1" , {grow:1 , shrink:1 } ),

    s :  This().visual({ w:"70%" }),

    l : This().visual({ w:"768px" }),
})




Style( "my-div" , {
    all : This().align({ wstretch:true , right:"20px" , left:"20px" })
        .visual({ h:"200px" , fg:text , bg:background }),

    xs :  This().visual({ h:"70%" }),

    xl : This().visual({ h:"768px" }),
})



