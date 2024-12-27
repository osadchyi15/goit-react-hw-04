import s from "./ImageGallery.module.css";

const ImageGallery = ({ data }) => {
  return (
    <ul className={s.itemsList}>
      {data.map((item, index) => (
        <li key={item.id + index}>
          <img
            className={s.image}
            src={item.urls.small}
            width="320px"
            height="240px"
            alt={item.alt_description}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
