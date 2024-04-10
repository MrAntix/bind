import { splitPath } from './splitPath';

describe('splitPath', () => {

  it('simple path', () => {

    const path = 'a.b';
    const result = splitPath(path);
    expect(result).toEqual(['a', 'b']);
  });

  it('indexed path', () => {

    const path = 'a[0]';
    const result = splitPath(path);
    expect(result).toEqual(['a', 0]);
  });

  it('indexed path deeper', () => {

    const path = 'a[0].b';
    const result = splitPath(path);
    expect(result).toEqual(['a', 0, 'b']);
  });
});
