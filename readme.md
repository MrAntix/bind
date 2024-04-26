# @ntix/bind

A small dom binder

[![Build](https://github.com/MrAntix/bind/actions/workflows/build.yml/badge.svg)](https://github.com/MrAntix/bind/actions/workflows/build.yml)
[![npm version](https://badge.fury.io/js/%40ntix%2Fbind.svg)](https://badge.fury.io/js/%40ntix%2Fbind)

[Documentation and working example](https://mrantix.github.io/bind/)

## example

```html
<button bind [inner-text]="text" {click}="onClick"></button>

<script type="module">
  import { bind } from './bind.js';

  const context = {
    text: 'click me',
    onClick: e => {

      context.text = 'thanks!';
      setTimeout(() => {
        context.text = 'click me again';
      }, 2000);
    }
  };

  bind(document, context);
</script>
```
