import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={s.loadMoreBtn}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
