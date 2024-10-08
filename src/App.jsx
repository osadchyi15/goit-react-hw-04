import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { requestImages } from "./services/api";
import { LoadMoreBtn } from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import ToTopButton from "./components/ToTopButton/ToTopButton";

function App() {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const [modalRegularUrl, setModalRegularUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowScroll, setWindowScroll] = useState(false);

  useEffect(() => {
    const fethcImages = async () => {
      if (!query) return;

      try {
        setIsLoading(true);
        setIsBtnVisible(false);
        const { results, total_pages } = await requestImages(query, page);
        if (results.length === 0) {
          setIsBtnVisible(false);
          return toast.error("Sorry. No images found for your request!");
        } else {
          setIsBtnVisible(true);
        }

        if (page === 1) {
          setImages(results);
        } else {
          setImages((prevImages) => [...prevImages, ...results]);
        }

        setIsBtnVisible(page < total_pages);

        if (page === total_pages) {
          return toast.error("You are reached to the end of collection!");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fethcImages();
  }, [query, page]);

  const onSearch = (query) => {
    setImages([]);
    setQuery(query);
    setPage(1);
    if (!query.trim()) {
      setIsBtnVisible(false);
      return toast.error("Fill some request!");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 100 ? setWindowScroll(true) : setWindowScroll(false);
    };
    window.addEventListener("scroll", handleScroll);
  }, [window.scrollY]);

  const onClickTopButton = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setWindowScroll(false);
  };

  const onClick = () => {
    setPage((actPage) => actPage + 1);
  };

  const onClickImage = (evt) => {
    const imageTarget = evt.target;
    setModalRegularUrl(imageTarget.dataset.url);
    setModalAlt(imageTarget.alt);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSearch={onSearch} />
      {isLoading && <Loader />}
      {error !== null && <ErrorMessage />}
      {Array.isArray(images) && (
        <ImageGallery images={images} onClickImage={onClickImage} />
      )}
      {images && isBtnVisible && (
        <LoadMoreBtn onClick={onClick} isLoading={isLoading} />
      )}
      {isModalOpen && (
        <ImageModal
          modalUrl={modalRegularUrl}
          modalAlt={modalAlt}
          isModalOpen={isModalOpen}
          onCloseModal={onCloseModal}
        />
      )}
      {windowScroll && <ToTopButton onClickTopButton={onClickTopButton} />}
    </>
  );
}

export default App;
