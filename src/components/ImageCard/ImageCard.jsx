import css from "../ImageGallery/ImageGallery.module.css";

const ImageCard = ({ smallUrl, imageAlt, dataUrl }) => {
  return (
    <img
      className={css.imageGalleryImage}
      src={smallUrl}
      alt={imageAlt}
      data-url={dataUrl}
    />
  );
};

export default ImageCard;
