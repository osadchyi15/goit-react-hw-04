import css from "./ImageModal.module.css";
import { useEffect, useState } from "react";

const ImageModal = ({ modalUrl, modalAlt, onCloseModal }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseModal]);

  const handleBackDropClick = (event) => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div onClick={handleBackDropClick} className={css.backdrop}>
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeModalBtn}
          onClick={onCloseModal}
        >
          &times;
        </button>
        <img
          src={modalUrl}
          alt={modalAlt}
          className={css.imageModal}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default ImageModal;
