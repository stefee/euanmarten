const {
  classNames,
  widthClass,
  horizontalPaddingClass,
  verticalPaddingClass,
  horizontalMarginClass,
  verticalMarginClass
} = require('./classNames');

describe('class names', () => {
  it('should concatenate class names', () => {
    const names = ['foo', 'bar'];
    expect(classNames(...names)).toEqual('foo bar');
  });
});

describe('width class', () => {
  it('should return a class for the given width', () => {
    const width = 69;
    expect(widthClass(width)).toEqual('w-69');
  });
});

describe('horizontal padding class', () => {
  it('should return classes for the given horizontal padding value', () => {
    const value = 2;
    expect(horizontalPaddingClass(value)).toEqual('pl2 pr2');
  });
});

describe('vertical padding class', () => {
  it('should return classes for the given vertical padding value', () => {
    const value = 2;
    expect(verticalPaddingClass(value)).toEqual('pt2 pb2');
  });
});

describe('horizontal margin class', () => {
  it('should return classes for the given horizontal margin value', () => {
    const value = 2;
    expect(horizontalMarginClass(value)).toEqual('ml2 mr2');
  });

  it('should return classes for the given negative horizontal margin value', () => {
    const value = -2;
    expect(horizontalMarginClass(value)).toEqual('nl2 nr2');
  });
});

describe('vertical margin class', () => {
  it('should return classes for the given vertical margin value', () => {
    const value = 2;
    expect(verticalMarginClass(value)).toEqual('mt2 mb2');
  });

  it('should return classes for the given negative vertical margin value', () => {
    const value = -2;
    expect(verticalMarginClass(value)).toEqual('nt2 nb2');
  });
});
