
# reactive-select

  yields/select plugin for reactive/component

## Installation

  Install with [component(1)](http://component.io):

```bash
$ component install trevorgerhardt/reactive-select
```

## Usage

Two-way binding is by default. Change events on the model will update the select, and selected items will cause change events on the model.

```html
<div select="name" select-options="options" select-label="Label" select-multiple></div>
```

### `#select(name)`

A method that gets added to the view to allow for multiple select instances per view. Call it with the value name that corresponds to the select.

### `select="name"`

Watches the given `select` attribute value that is retrieved using `this.value` and is passed to `Select#select`.

### `select-options="options"`

The `options` array is retrieved with `this.value` and is passed to `Select#add`.

### `select-multiple`

If `select-multiple` is set, then it is assumed that the model value is an array. Calls `Select#multiple`.

### `select-label="Label"`

Calls `Select#label(label)`. Duh.

## License

  The MIT License (MIT)

  Copyright (c) 2014 <copyright holders>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.