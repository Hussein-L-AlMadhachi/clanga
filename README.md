# Clang-Compose

Clang-Compose is a JavaScript-to-CSS generator designed to simplify the process of creating dynamic and reusable CSS styles directly from your JavaScript code.

you no longer need to write CSS

Clanga also comes with its own styling rules (JS functions you call to generate your optimised CSS) that provides a less painful experience compared to CSS or any technologies directly rely on it (e.g. Bootstrap and Tailwind)


## Features
* No more raw CSS
* Prevents you from writing styles that contradicts each other as much possible
* Generate resposnive styles programmatically using JavaScript.
* Improve reusability and maintainability of your styles.
* Simplify the management of dynamic styles.
* Effortlessly customizable and extendable

``` bash
npm install clanga-compose
```

## TODO

* ~~vite plugin~~ (already available)
* webpack plugin/loader

## Setup on Vite.js
in `vite.config.js` call `clang()` from `clanga-compose/`

```javascript

import { defineConfig } from 'vite'
import clanga from 'clanga-compose/plugins/clanga-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ ... , clanga() ],
})


```


## Usage

write all your styles in files with file extension `.style.js` with the following content:

``` javascript
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


/*
 Outputs:

@media screen and (min-width: 1px) {  
    .my-list-class {
        display: flex;
        flex-direction: row;
        gap: 20px;
        align-items: space-evenly;
        justify-content: center;
        flex-wrap: wrap;
        position: absolute;
        left: 20px;
        width: calc( 100% - 20px - 20px );
        color: hsl(160,52,9,1);
        background-color: hsl(163,54,95,1);
        height: 200px;
    }
}

@media screen and (min-width: 568px) {  
    .my-list-class {
        width: 768px;
    }
}

@media screen and (min-width: 1024px) {  
    .my-list-class {
        width: 768px;
    }
}
*/
```

Run the example with:

``` bash
node /test/example.js
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) for details.