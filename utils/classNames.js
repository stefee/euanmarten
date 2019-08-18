const classNames = (...names) => names.join(' ');

const widthClass = n => `w-${n}`;

const horizontalPaddingClass = n => `pl${n} pr${n}`;

const verticalPaddingClass = n => `pt${n} pb${n}`;

const horizontalMarginClass = n =>
  parseInt(n, 10) >= 0 ? `ml${n} mr${n}` : `nl${n*-1} nr${n*-1}`;

const verticalMarginClass = n =>
  parseInt(n, 10) >= 0 ? `mt${n} mb${n}` : `nt${n*-1} nb${n*-1}`;

module.exports = {
  classNames,
  widthClass,
  horizontalPaddingClass,
  verticalPaddingClass,
  horizontalMarginClass,
  verticalMarginClass
};
