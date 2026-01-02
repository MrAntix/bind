## A small dom binder

[github.com/MrAntix/bind](https://github.com/MrAntix/bind/)

## example

<style>
  #markup {
    display: flex;
    flex-direction: column;
  }
  #markup button {
    font-size: 2rem;
    padding: 1em 2em;
    color: #fff;
    background-color: #369;
    border: none;
    border-radius: .2em;
  }
  #markup input {
    margin-left: auto;
    font-size: 1.2rem;
    padding: .5em;
    color: #000;
    background-color: #fff;
    border: solid 2px;
    border-radius: .2em;
  }
</style>

<div id="markup">
  <button bind [inner-text]="data.text" {click}="onClick">[A Button]</button>
  <hr />
  <label>
    <span>Button Text:</span>  
    <input bind [value]="data.text" {input}="oninput" />
  </label>
</div>

The button **innerText** property and **click** event are bound to a context as shown below, click the button to see it in action

<script type="module">
  import { bind } from './media/bind.js'

  const context = {
    data: { text: 'click me' },
    onClick: e => {
      e.stopPropagation();

      context.data.text = 'thanks!';
      setTimeout(() => {
        context.data.text = 'click me again';
      }, 2000);
    },
    oninput: e => {
      context.data.text = e.currentTarget.value;
    }
  }

  bind(document, context);
</script>

```html
  <button bind [inner-text]="data.text" {click}="onClick">[A Button]</button>
  <hr />
  <label>
    <span>Button Text:</span>  
    <input bind [value]="data.text" {input}="oninput" />
  </label>

<script type="module">
  import { bind } from './bind.js';

  const context = {
    text: 'click me',
    onClick: e => {
      e.stopPropagation();

      context.data.text = 'thanks!';
      setTimeout(() => {
        context.data.text = 'click me again';
      }, 2000);
    },
    oninput: e => {
      context.data.text = e.currentTarget.value;
    }
  };

  bind(document, context);
</script>
```
