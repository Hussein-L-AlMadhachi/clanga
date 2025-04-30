import { Style , Flex , This , hsl } from "../clanga.js"



// themes (optional but very useful)
const
    primary = hsl( 163, 54, 25 ),
    secondary = hsl( 216, 55, 68 ),
    accent = hsl( 239, 55, 41 ),
    background = hsl( 163, 54, 95 ),
    text = hsl( 160, 52, 9 )
;



Style( "my-list-class" , {
    all : Flex.use({ gap:"20px" , mode:"row" , wrap:true })
        .justify( { col: "space-evenly" ,  row:"center" } )
        .align({ wstretch:true , right:"20px" , left:"20px" })
        .visual({ h:"200px" , fg:text , bg:background }),

    s :  This.visual({ w:"70%" }),

    l : This.visual({ w:"768px" }),
})
