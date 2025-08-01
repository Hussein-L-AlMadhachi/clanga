import { Sheet , Flex, Div } from "../clanga.js";

const listStyle = Sheet({
    xs : Flex().use({ gap:"2px" , mode:"row" })
        .align({ xcenter:true ,  ycenter:true })
        .shape({ w:"100%" , h:"50px" }),
    xl : Flex().use({ gap:"2px" , mode:"row" })
        .align({ xcenter:true ,  ycenter:true })
        .shape({ w:"300px" , h:"50px" }),
})



const improved_list = listStyle.clone()
improved_list.extend({
    all: Div().color({fg:"#1e1e1e"}).pad({ left:"20px" , right:"20px" })
})

improved_list.apply( ".MyButton" )

