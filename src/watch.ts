import { IWatchHandler } from './IWatchHandler';

export function watch(
  o: any,
  property: string,
  handler: IWatchHandler,
  once = false
): () => void {

  const descriptor = Object.getOwnPropertyDescriptor(o, property) || {};

  const getValue = descriptor.get || (() => descriptor.value);
  const setValue = descriptor.set || (value => (descriptor.value = value));

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
