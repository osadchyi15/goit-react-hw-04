import { useEffect } from "react";
import css from "./ImageModal.module.css";

import Modal from "react-modal";

Modal.setAppElement("#root");

const ImageModal = ({ modalUrl, modalAlt, isModalOpen, onCloseModal }) => {
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
    <Modal
      onClick={handleBackDropClick}
      className={css.Modal}
      overlayClassName={css.Overlay}
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      preventScroll={true}
    >
      <img src={modalUrl} alt={modalAlt} className={css.imageModal} />
      <button
        type="button"
        className={css.closeModalBtn}
        onClick={onCloseModal}
      >
        &times;
      </button>
    </Modal>
  );
};

export default ImageModal;

// const ImageModal = ({ modalUrl, modalAlt, onCloseModal }) => {
//

//   return (
//     <div onClick={handleBackDropClick} className={css.backdrop}>
//       <div className={css.modal}>
//         <button
//           type="button"
//           className={css.closeModalBtn}
//           onClick={onCloseModal}
//         >
//           &times;
//         </button>
//         <img
//           src={modalUrl}
//           alt={modalAlt}
//           className={css.imageModal}
//           width="100%"
//           height="100%"
//         />
//       </div>
//     </div>
//   );
// };
//
// export default ImageModal;
