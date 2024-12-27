import { useEffect, useState } from "react";

import "./App.css";
import { fetchResponseData } from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import toast from "react-hot-toast";

function App() {
  const [responseData, setResponseData] = useState([]);
  const [clientQuery, setClientQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    if (searchValue.toLowerCase() === clientQuery.toLowerCase()) {
      toast.error("Please enter new search request!", {
        position: "bottom-right",
        reverseOrder: true,
      });
      e.target.reset();
      return;
    }
    setClientQuery(searchValue);
    setResponseData([]);
    setPage(1);
    e.target.reset();
  };

  const handleMoreBtn = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const getResponseData = async () => {
      if (!clientQuery) return;

      try {
        setIsLoading(true);
        setIsError(false);
        setIsLoadMoreVisible(false);
        const { results, total_pages } = await fetchResponseData(
          clientQuery,
          page
        );
        setResponseData((prev) => [...prev, ...results]);
        setTotalPages(total_pages);
        page === totalPages
          ? setIsLoadMoreVisible(false) &
            toast("You have reached the end of the collection!", {
              icon: "💫",
              position: "bottom-right",
              reverseOrder: true,
            })
          : setIsLoadMoreVisible(true);
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

  return (
    <>
      <SearchBar onSubmit={handleSubmit} clientQuery={clientQuery} />
      {isLoading && <Loader />}
      {isError && <h2>Something went wrong!</h2>}
      {responseData.length > 0 && <ImageGallery data={responseData} />}
      {isLoadMoreVisible && <LoadMoreBtn onClick={handleMoreBtn} />}
    </>
  );
}

export default App;
