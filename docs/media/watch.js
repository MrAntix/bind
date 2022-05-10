export function watch(o, property, handler, once = false) {
    const descriptor = Object.getOwnPropertyDescriptor(o, property) || {};
    let getValue = descriptor.get || (() => descriptor.value);
    let setValue = descriptor.set || (value => (descriptor.value = value));
    const unwatch = () => {
        delete o[property];
        o[property] = getValue();
    };
    Object.defineProperty(o, property, {
        get: getValue,
        set(value) {
            if (once && getValue() === undefined) {
                setValue(value);
                unwatch();
                handler(value);
                return;
            }
            setValue(value);
            handler(value);
        },
        configurable: true
    });
    return unwatch;
}
//# sourceMappingURL=watch.js.map