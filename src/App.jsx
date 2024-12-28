import { useEffect, useState } from "react";
import "./App.css";
import { fetchResponseData } from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import toast from "react-hot-toast";
import ImageModal from "./components/ImageModal/ImageModal";
import ToTopButton from "./components/ToTopButton/ToTopButton";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [responseData, setResponseData] = useState([]);
  const [clientQuery, setClientQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullImage, setFullImage] = useState({});
  const [windowScroll, setWindowScroll] = useState(false);

  const handleMoreBtn = () => {
    setPage((prev) => prev + 1);
  };

  const toastPosition = {
    position: "bottom-right",

    reverseOrder: true,
  };

  useEffect(() => {
    const getResponseData = async () => {
      if (!clientQuery) {
        setIsLoadMoreVisible(false);
        return;
      }

      try {
        setIsLoading(true);
        setIsError(false);
        setIsLoadMoreVisible(false);
        const { results, total_pages } = await fetchResponseData({
          query: clientQuery,
          page,
          per_page: 15,
        });
        setResponseData((prev) => [...prev, ...results]);
        setTotalPages(total_pages);
        page === totalPages
          ? setIsLoadMoreVisible(false) &
            toast("You have reached the end of the collection!", {
              icon: "💫",
              ...toastPosition,
            })
          : setIsLoadMoreVisible(true);
        results.length === 0 && setIsLoadMoreVisible(false);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getResponseData();
  }, [clientQuery, page]);

  const handleChangeQuery = (newQuery) => {
    if (newQuery.trim().length === 0) {
      toast.error(
        `You are sending an empty request. \n Please, modify the request!`,

        {
          ...toastPosition,
        }
      );
      setResponseData([]);
      setIsLoadMoreVisible(false);
      return;
    } else if (newQuery.toLowerCase() === clientQuery.toLowerCase()) {
      toast.error("Please, change your search request!", {
        ...toastPosition,
      });
      setIsLoadMoreVisible(false);
      setResponseData([]);
      return;
    }
    setClientQuery(newQuery);
    setResponseData([]);
    setPage(1);
  };

  const imageHandler = (e) => {
    setFullImage({});
    const fullInfo = {
      fullUrl: e.target.dataset.url,
      alt: e.target.alt,
    };
    setFullImage(fullInfo);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
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

  return (
    <>
      <SearchBar
        onSearchChanged={handleChangeQuery}
        clientQuery={clientQuery}
      />
      <div className="gallery">
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {responseData.length > 0 && (
          <ImageGallery data={responseData} imageHandler={imageHandler} />
        )}
        {isLoadMoreVisible && <LoadMoreBtn onClick={handleMoreBtn} />}
        {isModalOpen && (
          <ImageModal
            imageInfo={fullImage}
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
          />
        )}
        {windowScroll && <ToTopButton onClickTopButton={onClickTopButton} />}
      </div>
    </>
  );
}

export default App;
