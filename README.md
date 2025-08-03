# Clanga

Clanga is a JavaScript-to-CSS generator — not a CSS-in-JS library.. it is designed to simplify the process of creating dynamic and reusable CSS styles directly from your JavaScript code.

you no longer need to write CSS

Clanga also comes with its own styling rules (JS functions you call to generate your optimised raw CSS) that provides a less painful experience compared to CSS or any technologies directly rely on it (e.g. Bootstrap and Tailwind)

## Features

* No more raw CSS
* reusable and extensible styling with Sheets — no more copy and paste
* Prevents you from writing styles that contradict each other as much as possible
* Generate responsive styles programmatically using JavaScript.
* Improve reusability and maintainability of your styles.
* Simplify the management of dynamic styles.
* Effortlessly customizable and extendable.

``` bash
npm install clanga
```

## TODO

* ~~vite plugin~~ (already available)
* webpack plugin/loader

## Setup on Vite.js

in `vite.config.js` write this:

```javascript

import { defineConfig } from 'vite'
import clanga from 'clanga/plugins/clanga-vite.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ ... , clanga() ],
})


```

## 🧭 Quickstart

```js
import { Style, Flex, This, hsl } from "clanga";

// Define theme colors
const primary = hsl(163, 54, 25);
const background = hsl(163, 54, 95);
const text = hsl(160, 52, 9);

// Apply styles
Style(".my-div", {
  all: Div()
    .align({ wstretch: true, left: "20px", right: "20px" })
    .visual({ h: "200px", fg: text, bg: background }),

  xs: Div().visual({ h: "70%" }),
  xl: Div().visual({ h: "768px" }),
});
```

then run (if not using vite plugin)

```bash
npx clanga
```

---

## Sheets (extensible styling components)

```js
import { Sheet, Flex, Div } from "clanga";

// will not be included in the CSS unless you call .apply on this
const listStyle = Sheet({
  xs: Flex()
    .use({ gap: "2px", mode: "row" })
    .align({ xcenter: true, ycenter: true })
    .shape({ w: "100%", h: "50px" }),

  xl: Flex()
    .use({ gap: "2px", mode: "row" })
    .align({ xcenter: true, ycenter: true })
    .shape({ w: "300px", h: "50px" }),
});

// Clone and extend the base style
const improved_list = listStyle.clone();

// extend styles to add more of them
improved_list.extend({
  all: Div().color({ fg: "#1e1e1e" }).pad({ left: "20px", right: "20px" }),
});

// Apply styles to an actual selector 
// in this case it creates a class in the compiled css file for this
improved_list.apply(".MyButton");
```

---

## Screen Sizes Selectors

* `all` : all screens,
* `xxxxs` : 90px and wider screens
* `xxxs` : 156px and wider screens
* `xxs` : 270px and wider screens
* `xs` : 319px and wider screens
* `s` : 568px and wider screens
* `m` : 768px and wider screens
* `l` : 1024px and wider screens
* `xl` : 1280px and wider screens
* `xxl` : 1920px and wider screens
* `xxxl` : 2560px and wider screens
* `xxxxl` : 3840px and wider screens
* `xxxxxl` : 6016px and wider screens

---

## ✨ API Overview

### 🧱 `Div()`

```js
Div().align({ ... }).shape({ ... }).color({ ... }).font({ ... }).pad({ ... }).extra({ ... });
```

### `.font({ ... })`

* `family`: same as `font-family` in CSS
* `line_height`: same as `line-height` in CSS
* `weight`: same as `font-weight` in CSS
* `size`: same as `font-size` in CSS
* `variant_caps`: same as `font-variant-caps` in CSS
* `stretch`: same as `font-stretch` in CSS
* `word_spacing`: same as `word-spacing` in CSS
* `letter_spacing`: same as `letter-spacing` in CSS
* `variant`: same as `font-variant` in CSS
* `indent`: same as `text-indent` in CSS
* `word_break`: same as `line-height` in CSS
* `hyphens`: same as `line-height` in CSS
* `overflow`: same as `line-height` in CSS
* `break_word`: if `true` will set `overflow-wrap` to `break`
* `align`: same as `text-align` in CSS
* `align_last`: same as `text-align-last` in CSS
* `transform`: same as `text-transform` in CSS
* `decoration`: same as `text-decoration` in CSS
* `decoration_color`: same as `text-decoration-color` in CSS
* `decoration_style`: same as `text-decoration-style` in CSS
* `direction`: same as `direction` in CSS
* `writing_mode`: same as `writing-mode` in CSS
* `white_space`: same as `white-space` in CSS

#### Returns

* `this` — The instance itself, enabling method chaining.

---

#### Example

```js
Div().font({
  family: "Arial, sans-serif",
  size: "16px",
  weight: "bold",
  line_height: 1.5,
  align: "center",
  decoration: "underline",
  break_word: true
});

```
#### `.align({ ... })` options:
* `top`, `bottom`, `left`, `right`: string (px, %, etc.)
* `z`: z-index
* `fixed`, `relative`, `sticky`: booleans for position
* `xcenter`, `ycenter`: booleans for centering
* `wstretch`, `hstretch`: booleans for stretching

#### `.shape({ ... })` options:
* `border`: border styles
*  `radius`: border radius styles
* `w`, `h`: width and height (not allowed if `wstretch`/`hstretch` is used)

#### `.pad({ ... })` options:
* `all` : padding for all sides
* `right`: right padding
* `left`: left padding
* `top`: top padding
* `bottom`: bottom padding


#### `.color({ ... })` options:
* `fg`: color
* `bg`: background color

#### `.extra({ styles })`
Set arbitrary CSS styles using a dictionary.

---

### `Sheet( initialStyles )` returns an object containing:
* `.apply(selector)`: apply sheet to an actual CSS selector
* `.modify(styles)`: modify styles in the sheet
* `.clone()`: returns a clone of the original sheet with same styles to be extended further


### 🤸 `Flex()`

```js
Flex().use({ mode: "row", gap: "10px", wrap: true })
  .justify({ row: "center", col: "space-evenly" });
```

#### `.use({ ... })`

main flex box options

* `mode`: `"row"` or `"col"`
* `gap`: CSS gap
* `wrap`: boolean
* `reverse`: reverse direction (boolean)
* `reverse_wrap`: reverse wrapping direction (boolean)

#### `.justify({ row, col })`

Aligns content depending on mode

* `row`: `"start"` or `"center"` or `"end"` or `"space-between"` or `"space-around"` or `"space-evenly"`
* `col`: `"start"` or `"center"` or `"end"` or `"space-between"` or `"space-around"` or `"space-evenly"`

#### `.itemClass(selector, { grow, shrink, basis })`

Defines flex item styles for children with a class.

#### `.item(nthChild, { grow, shrink, basis })`

Same as above but for a specific `:nth-child(...)`

---

## 🎨 Colors

Helper functions:

```js
hsl(h, s, l, a?)   // returns `hsl(...)`
rgb(r, g, b, a?)   // returns `rgba(...)`

// a is optional for opacity
```

---

## 🧩 Style()

```js
Style(".my-class_name", {
  all: ...Clanga/Flex instance...,
  xs: ...,
  s: ...,
  m: ...,
  l: ...,
  xl: ...
});
```

* Define base and responsive styles.
* Internally handled by your `compiler.js` (not shown here).

---

## 🧠 Tips

* **Avoid conflicts**: `wstretch` can’t be used with `w`, also `hstretch` can’t be used with `h`
* Use `Div()` and `Flex()` to construct components.
* You can call `.child(n, style)` or `.substyle(name, style)` for nested elements.
* Responsive breakpoints are manual keys: `xs`, `s`, `m`, `l`, `xl`

---

## 🧪 Example

```js

import { hsl , Style , Flex , Div } from "clanga";

// themes (optional but very useful)
const
    primary = hsl( 163, 54, 25 ),
    secondary = hsl( 216, 55, 68 ),
    accent = hsl( 239, 55, 41 ),
    background = hsl( 163, 54, 95 ),
    text = hsl( 160, 52, 9 )
;


Style(".my-list", {
  all: Flex().use({ mode: "row", wrap: true, gap: "20px" })
    .visual({ h: "200px", fg: text, bg: background })
    .itemClass("my-child", { grow: 1 }),

  s: Div().visual({ w: "70%" }),
});
```

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) for details.
