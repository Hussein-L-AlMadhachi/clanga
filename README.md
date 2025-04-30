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
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [console.log("hassoni is the absolute best") , react()],
})


```


## Usage

write all your styles in files with file extension `.style.js` with the following content:

``` javascript
Style( "my_class" , {
    xs : Flex.use({ gap:"20px" , mode:"row" })
        .visual({ w:"100%" , h:"50px" })
        .self({ xcenter:true }),

    l : Flex.use({ gap:"20px" , mode:"row" })
        .visual({ w:"300px" , h:"50px" })
        .self({ xcenter:true }),
})

/*
Outputs:
.button {
    background-color: blue;
    color: white;
    padding: 10px;
    border-radius: 5px;
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