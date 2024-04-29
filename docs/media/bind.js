import { getBindings } from './getBindings.js';
/** @ignore  */
const propsExp = /^\[\{?(.*)\}?\]$/;
/** @ignore  */
const eventsExp = /^\[?\{(.*)\}\]?$/;
/**
 * Bind elements marked with the [bind] attribute to the context provided
 *
 * @param rootElement Root Element to query for bindable elements
 * @param rootContext Context for data and handlers
 */
export function bind(rootElement, rootContext) {
    rootElement.querySelectorAll('[bind]').forEach(element => {
        const component = element;
        const attributeNames = element.getAttributeNames();
        // bind properties
        getBindings(propsExp, element, attributeNames).forEach(binding => {
            var _a, _b, _c, _d;
            const path = binding.contextMemberName.split('.');
            let context = rootContext;
            let memberName = '';
            path.forEach((p, i) => {
                memberName = p;
                const value = context[memberName];
                if (i < path.length - 1)
                    context = value;
            });
            const descriptor = (_a = Object.getOwnPropertyDescriptor(context, memberName)) !== null && _a !== void 0 ? _a : {};
            if (typeof descriptor.value === 'function') {
                const fn = (_b = descriptor.value['fn']) !== null && _b !== void 0 ? _b : descriptor.value;
                const boundFunction = function () {
                    const value = fn.bind(element)();
                    if (component[binding.componentMemberName] !== value) {
                        component[binding.componentMemberName] = value;
                    }
                    if (descriptor.value['fn'])
                        descriptor.value();
                };
                boundFunction['fn'] = fn;
                Object.defineProperty(context, memberName, {
                    value: boundFunction
                });
                boundFunction();
            }
            else {
                const getValue = (_c = descriptor.get) !== null && _c !== void 0 ? _c : (() => descriptor.value);
                const setValue = (_d = descriptor.set) !== null && _d !== void 0 ? _d : (value => (descriptor.value = value));
                Object.defineProperty(context, memberName, {
                    set: function (value) {
                        if (component[binding.componentMemberName] !== value) {
                            component[binding.componentMemberName] = value;
                        }
                        if (getValue() !== value)
                            setValue(value);
                    },
                    get: getValue,
                    configurable: true
                });
                component[binding.componentMemberName] = getValue.bind(element)();
            }
        });
        //bind Events
        getBindings(eventsExp, element, attributeNames).forEach(binding => {
            element.addEventListener(binding.componentMemberName, rootContext[binding.contextMemberName].bind(element));
        });
    });
}
//# sourceMappingURL=bind.js.map