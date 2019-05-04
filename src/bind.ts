import { getBindings } from './getBindings.js';
import { IBindingComponent } from './IBindingComponent';

/** @ignore  */
const propsExp = /^\[\{?(.*)\}?\]$/;
/** @ignore  */
const eventsExp = /^\[?\{(.*)\}\]?$/;

/**
 * Bind elements marked with the [bind] attribute to the context provided
 *
 * @param rootElement Root Element to query for bindable elements
 * @param context Context for data and handlers
 */
export function bind(rootElement: Document | Element, context: any): void {
  rootElement.querySelectorAll('[bind]').forEach(element => {
    const component = element as IBindingComponent;
    const attributeNames = element.getAttributeNames();

    // bind properties
    getBindings(propsExp, element, attributeNames).forEach(binding => {
      const descriptor =
        Object.getOwnPropertyDescriptor(context, binding.contextMemberName) ||
        {};

      if (typeof descriptor.value === 'function') {
        const fn = descriptor.value['fn'] || descriptor.value;

        const boundFunction = function() {
          const value = fn.bind(element)();
          if (component[binding.componentMemberName] !== value) {
            component[binding.componentMemberName] = value;
          }
          if (descriptor.value['fn']) descriptor.value();
        };
        boundFunction['fn'] = fn;

        Object.defineProperty(context, binding.contextMemberName, {
          value: boundFunction
        });

        boundFunction();
      } else {

        let getValue = descriptor.get || (() => descriptor.value);
        let setValue = descriptor.set || (value => (descriptor.value = value));

        Object.defineProperty(context, binding.contextMemberName, {
          set: function(value) {
            if (component[binding.componentMemberName] !== value) {
              component[binding.componentMemberName] = value;
            }
            if (getValue() !== value) setValue(value);
          },
          get: getValue,
          configurable: true
        });

        component[binding.componentMemberName] = getValue.bind(element)();
      }
    });

    //bind Events
    getBindings(eventsExp, element, attributeNames).forEach(binding => {
      element.addEventListener(
        binding.componentMemberName,
        context[binding.contextMemberName].bind(element)
      );
    });
  });
}
