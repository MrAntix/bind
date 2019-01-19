# @ntix/bind

A small dom binder

[![Build Status](https://travis-ci.org/MrAntix/bind.svg?branch=master)](https://travis-ci.org/MrAntix/bind)

[Documentation and working example](https://mrantix.github.io/bind/)

## example

```html
<button bind [inner-text]="text" {click}="onClick"></button>

<script type="module">
  import { bind } from './bind.js';

  const context = {
    text: 'click me',
    onClick: e => {
      e.stopPropagation();

      context.text = 'thanks!';
      setTimeout(() => {
        context.text = 'click me again';
      }, 2000);
    }
  };

  bind(document, context);
</script>
```
