import css from "./LoadMoreBtn.module.css";

export const LoadMoreBtn = ({ onClick, isLoading }) => {
  return (
    <div>
      <button type="button" onClick={onClick} disabled={isLoading}>
        {isLoading ? "Wait for it. Loading!" : "Load more"}
      </button>
    </div>
  );
};
