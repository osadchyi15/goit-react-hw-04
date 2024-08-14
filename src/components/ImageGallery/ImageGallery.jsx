import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, onClickImage }) => {
  return (
    <ul className={css.imageGalleryList}>
      {images.map((image) => {
        return (
          <li
            className={css.imageGalleryItem}
            key={image.id}
            onClick={onClickImage}
          >
            <ImageCard
              className={css.imageGalleryImage}
              smallUrl={image.urls.small}
              imageAlt={image.alt_description}
              dataUrl={image.urls.regular}
            />
          </li>
        );
      })}

      <li></li>
    </ul>
  );
};

export default ImageGallery;
