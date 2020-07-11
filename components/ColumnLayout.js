import { Children } from 'react';
import {
  classNames,
  widthClass,
  horizontalPaddingClass,
  verticalPaddingClass,
  horizontalMarginClass,
  verticalMarginClass
} from '../utils/classNames';

const getLayoutClassName = (horizontalPadding, verticalPadding) => (
  classNames(
    'flex flex-row flex-wrap',
    horizontalMarginClass(horizontalPadding),
    verticalMarginClass(verticalPadding)
  )
);

const getColumnClassName = (horizontalPadding, verticalPadding, width) => (
  classNames(
    widthClass(width),
    horizontalPaddingClass(horizontalPadding),
    verticalPaddingClass(verticalPadding)
  )
);

const ColumnLayout = ({
  children,
  columns,
  horizontalPadding = 1,
  verticalPadding = 1
}) => {
  const columnWidth = Math.floor(100 / columns);
  const layoutClassName = getLayoutClassName(horizontalPadding, verticalPadding);

  return (
    <div className={layoutClassName}>
      {Children.toArray(children).map((el, i) => {
        // fix for thirds
        const width = (columns === 3) && (i % columns === 2) ? 34 : columnWidth;
        const className = getColumnClassName(horizontalPadding, verticalPadding, width);
        return <div key={i} className={className}>{el}</div>;
      })}
    </div>
  );
};

export default ColumnLayout;
