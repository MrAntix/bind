import { getBindingMemberName } from './getBindingMemberName';

describe('getBindingMemberName', () => {
  [
    ['attribute', 'attribute'],
    ['an-attribute', 'anAttribute'],
    ['inner-html', 'innerHTML']
  ].forEach(([value, expected]) => {
    it(`${value}=>${expected}`, () => {
      expect(getBindingMemberName(value)).toEqual(expected);
    });
  });
});
