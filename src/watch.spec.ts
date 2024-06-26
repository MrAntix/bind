import { watch } from './watch';

describe('watch', () => {
  const prop = 'PROPERTY';
  const value = 'VALUE';
  let o: any;

  beforeEach(() => {
    o = {};
  });

  it('watches for change', () => {
    let counter = 0;
    watch(o, prop, () => {
      counter++;
    });

    for (let i = 0; i < 3; i++)
      o[prop] = value;

    expect(counter).toBe(3);
  });

  it('watches for change once', () => {
    let counter = 0;
    watch(
      o,
      prop,
      () => {
        counter++;
      },
      true
    );

    for (let i = 0; i < 3; i++)
      o[prop] = value;

    expect(counter).toBe(1);
  });

  it('unwatches and keeps set value', () => {
    const unwatch = watch(o, prop, () => { });

    o[prop] = value;
    unwatch();

    expect(o[prop]).toBe(value);
  });

  it('can nest watches', () => {
    let counter = 0;
    watch(o, prop, () => {
      counter++;
    });
    watch(o, prop, () => {
      counter++;
    });

    for (let i = 0; i < 3; i++)
      o[prop] = value;

    expect(counter).toBe(6);
  });
});
