const { splitArrayAlternating } = require('./arrays');

describe('split arrays alternating', () => {
  it('should return the same items if second argument is 1', () => {
    const items = [1, 2, 3, 4, 5];
    const expected = [items];
    expect(splitArrayAlternating(items, 1)).toEqual(expected);
  });

  it('should return arrays with items alternating', () => {
    const items = [1, 2, 3, 4, 5];
    const expected = [[1, 3, 5], [2, 4]];
    expect(splitArrayAlternating(items, 2)).toEqual(expected);
  });

  it('should return empty arrays if items is empty', () => {
    const items = [];
    const expected = [[], [], []];
    expect(splitArrayAlternating(items, 3)).toEqual(expected);
  });
});
