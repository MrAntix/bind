import { getValue } from './getValue';

describe('getValue', () => {

  it('path', () => {

    const expected = 'v';
    const data = { p: expected };
    const result = getValue(data, 'p');
    expect(result).toBe(expected);
  });

  it('indexer', () => {

    const expected = 'v';
    const data = { p: [expected] };
    const result = getValue(data, 'p[0]');
    expect(result).toBe(expected);
  });

  it('indexer deeper', () => {

    const expected = 'v';
    const data = { p: [{ p: expected }] };
    const result = getValue(data, 'p[0].p');
    expect(result).toBe(expected);
  });

  it('indexer deeper empty context', () => {

    const data = { };
    const result = getValue(data, 'p[0].p');
    expect(result).toBe(undefined);
  });

  it('indexer deeper null context', () => {

    const data = null;
    const result = getValue(data, 'p[0].p');
    expect(result).toBe(undefined);
  });
});
