import Img from '@renditions/react-img';
import { getImageSrc } from '../utils/images';

const Image = ({ image, renditions, size = '100vw', ...rest }) => (
  <Img
    alt={image.altText}
    width={image.width}
    height={image.height}
    getSrc={getImageSrc.bind(null, image)}
    renditions={renditions}
    size={size}
    autoSortRenditions
    {...rest}
  />
);

export default Image;
