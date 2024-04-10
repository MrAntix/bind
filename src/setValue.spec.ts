import { setValue } from './setValue';

describe('setValue', () => {

  it('path', () => {

    const data = { p: 'x' };
    setValue(data, 'p', 'v');
    expect(data).toEqual({ p: 'v' });
  });

  it('path when no property', () => {

    const data = {};
    setValue(data, 'p', 'v');
    expect(data).toEqual({ p: 'v' });
  });

  it('path deeper', () => {

    const data = { p: { p: 'x' } };
    setValue(data, 'p.p', 'v');
    expect(data).toEqual({ p: { p: 'v' } });
  });

  it('indexer', () => {

    const data = { p: ['x'] };
    setValue(data, 'p[0]', 'v');
    expect(data).toEqual({ p: ['v'] });
  });

  it('indexer deeper', () => {

    const data = { p: [{ p: 'x' }] };
    setValue(data, 'p[0].p', 'v');
    expect(data).toEqual({ p: [{ p: 'v' }] });
  });

  it('indexer deeper when no property', () => {

    const data = {};
    setValue(data, 'p[0].p', 'v');
    expect(data).toEqual({ p: [{ p: 'v' }] });
  });
});
