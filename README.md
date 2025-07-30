> Documentation are in Beta

# Clang-Compose

Clang-Compose is a JavaScript-to-CSS generator — not a CSS-in-JS library.. it is designed to simplify the process of creating dynamic and reusable CSS styles directly from your JavaScript code.

you no longer need to write CSS

Clanga also comes with its own styling rules (JS functions you call to generate your optimised raw CSS) that provides a less painful experience compared to CSS or any technologies directly rely on it (e.g. Bootstrap and Tailwind)


## Features
* No more raw CSS
* Prevents you from writing styles that contradict each other as much as possible
* Generate responsive styles programmatically using JavaScript.
* Improve reusability and maintainability of your styles.
* Simplify the management of dynamic styles.
* Effortlessly customizable and extendable.

``` bash
npm install clanga-compose
```

## TODO

* ~~vite plugin~~ (already available)
* webpack plugin/loader

## Setup on Vite.js
in `vite.config.js` write this:

```javascript

import { defineConfig } from 'vite'
import clanga from 'clanga-compose/plugins/clanga-vite.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ ... , clanga() ],
})


```

## 🧭 Quickstart

```js
import { Style, Flex, This, hsl } from "clanga-compose";

// Define theme colors
const primary = hsl(163, 54, 25);
const background = hsl(163, 54, 95);
const text = hsl(160, 52, 9);

// Apply styles
Style("my-div", {
  all: Div()
    .align({ wstretch: true, left: "20px", right: "20px" })
    .visual({ h: "200px", fg: text, bg: background }),

  xs: Div().visual({ h: "70%" }),
  xl: Div().visual({ h: "768px" }),
});
```

then run
```bash
npx clanga-compose
```

---

## ✨ API Overview

### 🧱 `Div()`
```js
Div().align({ ... }).visual({ ... }).extra({ ... });
```

#### `.align({ ... })` options:
- `top`, `bottom`, `left`, `right`: string (px, %, etc.)
- `z`: z-index
- `fixed`, `relative`, `sticky`: booleans for position
- `xcenter`, `ycenter`: booleans for centering
- `wstretch`, `hstretch`: booleans for stretching

#### `.visual({ ... })` options:
- `fg`: color
- `bg`: background color
- `border`, `radius`: border styles
- `w`, `h`: width and height (not allowed if `wstretch`/`hstretch` is used)
- `pad` : padding
- `pad_right`: right padding
- `pad_left`: left padding
- `pad_top`: top padding
- `pad_bottom`: bottom padding

#### `.extra({ styles })`
Set arbitrary CSS styles using a dictionary.

---

### 🤸 `Flex()`

```js
Flex().use({ mode: "row", gap: "10px", wrap: true })
  .justify({ row: "center", col: "space-evenly" });
```

#### `.use({ ... })`
main flex box options
- `mode`: `"row"` or `"col"`
- `gap`: CSS gap
- `wrap`: boolean
- `reverse`: reverse direction (boolean)
- `reverse_wrap`: reverse wrapping direction (boolean)

#### `.justify({ row, col })`
Aligns content depending on mode
- `row`: `"start"` or `"center"` or `"end"` or `"space-between"` or `"space-around"` or `"space-evenly"`
- `col`: `"start"` or `"center"` or `"end"` or `"space-between"` or `"space-around"` or `"space-evenly"`

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
Style("my-style-name", {
  all: ...Clanga/Flex instance...,
  xs: ...,
  s: ...,
  m: ...,
  l: ...,
  xl: ...
});
```

- Define base and responsive styles.
- Internally handled by your `compiler.js` (not shown here).

---

## 🧠 Tips

- **Avoid conflicts**: `wstretch` can’t be used with `w`, etc.
- Use `Div()` and `Flex()` to construct components.
- You can call `.child(n, style)` or `.substyle(name, style)` for nested elements.
- Responsive breakpoints are manual keys: `xs`, `s`, `m`, `l`, `xl`

---

## 🧪 Example

```js

import { hsl , Style , Flex , Div } from "clanga-compose";

// themes (optional but very useful)
const
    primary = hsl( 163, 54, 25 ),
    secondary = hsl( 216, 55, 68 ),
    accent = hsl( 239, 55, 41 ),
    background = hsl( 163, 54, 95 ),
    text = hsl( 160, 52, 9 )
;


Style("my-list", {
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