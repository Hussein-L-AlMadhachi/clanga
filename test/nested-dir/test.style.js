import { style , Flex } from "../../clanga.js"


style( "flex-box" , {
    xs : Flex.use({ gap:"2px" , mode:"row" }).self({ xcenter:true ,  ycenter:true }).visual({ w:"100%" , h:"50px" }),
    xl : Flex.use({ gap:"2px" , mode:"row" }).self({ xcenter:true ,  ycenter:true }).visual({ w:"300px" , h:"50px" }),
})

