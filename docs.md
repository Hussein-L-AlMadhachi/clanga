# Clanga Compose Documentation

This documentation provides an overview of Clanga Compose the JS-to-CSS
generator, as well as the `Style` function. These utilities are designed to
simplify the creation of responsive and dynamic styles in JavaScript.

---

## **Why Clanga Compose**

* Because of CSS!!!!
* 


## **Example Usage**

The following example demonstrates how to use Clanga to create a responsive
layout for a class named `my-list`:

```javascript
import { Style, Flex, This, hsl } from "../This.js";

// Define colors (optional but very useful)
const primary = hsl(163, 54, 25);
const background = hsl(163, 54, 95);
const text = hsl(160, 52, 9);

// Create a responsive style
Style("my-list", {
    all: Flex.use({ gap: "20px", mode: "row", wrap: true })
        .justify({ col: "space-evenly", row: "center" })
        .align({ wstretch: true, right: "20px", left: "20px" })
        .visual({ h: "200px", fg: text, bg: background }),

    s: This.visual({ w: "70%" }),

    l: This.visual({ w: "768px" }),
});
```

## **Class: This**

The `This` class provides methods to define and apply styles dynamically.
It focuses on alignment, positioning, and visual properties. it is the class
that you will use to add styles to your CSS class.

### **Methods**

#### **`This.align(options)`**
Aligns and positions an element based on the provided options.

**Parameters:**
- `top` *(string)*: Distance from the top.
- `bottom` *(string)*: Distance from the bottom.
- `right` *(string)*: Distance from the right.
- `left` *(string)*: Distance from the left.
- `z` *(number)*: Z-index value.
- `fixed` *(boolean)*: Sets the position to `fixed`.
- `sticky` *(boolean)*: Sets the position to `sticky`.
- `relative` *(boolean)*: Sets the position to `relative`.
- `xcenter` *(boolean)*: Centers the element horizontally.
- `ycenter` *(boolean)*: Centers the element vertically.
- `wstretch` *(boolean)*: Stretches the element horizontally.
- `hstretch` *(boolean)*: Stretches the element vertically.

**Returns:**  
The `This` instance for chaining.

---

#### **`This.visual(options)`**
Applies visual styles such as colors, borders, and dimensions.

**Parameters:**
- `fg` *(string)*: Foreground color.
- `bg` *(string)*: Background color.
- `border` *(string)*: Border style.
- `radius` *(string)*: Border radius.
- `w` *(string)*: Width of the element.
- `h` *(string)*: Height of the element.

**Returns:**  
The `This` instance for chaining.

---

#### **`This.apply_style(property, style, empty)`**
Applies a single style property to the element.

**Parameters:**
- `property` *(string)*: The CSS property name.
- `style` *(string)*: The value of the CSS property.
- `empty` *(string, optional)*: Default value if `style` is not provided.

---

#### **`This.extra(extra_styles)`**
Adds additional styles to the element.

**Parameters:**
- `extra_styles` *(object)*: An object containing CSS properties and their values.

---

#### **`This.get_styles()`**
Retrieves all the styles applied to the element.

**Returns:**  
An object containing all the styles.

---

#### **`This.child(child_selected)`**
Selects a child element for styling.

**Parameters:**
- `child_selected` *(string)*: The child element to select. Use `"all"` to select all children.

**Returns:**  
The `This` instance for chaining.

---

## **Class: Flex**

The `Flex` class extends `This` and provides methods for creating flexible layouts using CSS Flexbox.

### **Methods**

#### **`Flex.use(options)`**
Configures the flex container.

**Parameters:**
- `gap` *(string)*: Space between flex items.
- `mode` *(string)*: Flex direction. Can be `"row"` or `"col"`.
- `wrap` *(boolean)*: Enables wrapping of flex items.
- `reverse` *(boolean)*: Reverses the flex direction.
- `reverse_wrap` *(boolean)*: Reverses the wrapping direction.

**Returns:**  
The `Flex` instance for chaining.

---

#### **`Flex.justify(options)`**
Aligns items within the flex container.

**Parameters:**
- `row` *(string)*: Justification along the row axis.
- `col` *(string)*: Justification along the column axis.

**Returns:**  
The `Flex` instance for chaining.

---

## **Function: Style**

The `Style` function is used to define responsive styles for a class name.

### **Usage**

```javascript
Style(className, responsiveStyles);
```

**Parameters:**
- `className` *(string)*: The name of the CSS class.
- `responsiveStyles` *(object)*: An object defining styles for different screen sizes.

---

### **Explanation**
1. **Flex.use**: Configures the flex container with a gap of `20px`, row mode, and wrapping enabled.
2. **Flex.justify**: Aligns items evenly in the column and centers them in the row.
3. **This.align**: Stretches the element horizontally and sets margins.
4. **This.visual**: Sets the height, foreground color, and background color.
5. **Responsive Styles**: Different styles are applied for small (`s`) and large (`l`) screen sizes.

This approach allows you to create reusable, responsive, and dynamic styles programmatically.