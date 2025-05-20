import "./Pagination.css";

export function Pagination({
  currentPage,
  pageCount,
  onPageChanged,
  pageSize,
  onPageSizeChange,
}) {
  let pageNumberArray;

  if (pageCount <= 6) {
    pageNumberArray = Array.from({ length: pageCount }, (_, i) => i + 1);
  } else if (currentPage > 3 && currentPage < pageCount - 2) {
    pageNumberArray = [
      1,
      null,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      null,
      pageCount,
    ];
  } else if (currentPage <= 3) {
    pageNumberArray = [1, 2, 3, 4, null, pageCount];
  } else {
    pageNumberArray = [
      1,
      null,
      pageCount - 3,
      pageCount - 2,
      pageCount - 1,
      pageCount,
    ];
  }

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChanged(currentPage - 1)}
      >
        Previous
      </button>

      <ul className="pagination-list">
        {pageNumberArray.map((pageNumber, index) =>
          pageNumber === null ? (
            <li key={index} className="pagination-ellipsis">
              …
            </li>
          ) : (
            <li key={index}>
              <button
                className={`pagination-btn ${
                  pageNumber === currentPage ? "active" : ""
                }`}
                onClick={() => onPageChanged(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        className="pagination-btn"
        disabled={currentPage === pageCount}
        onClick={() => onPageChanged(currentPage + 1)}
      >
        Next
      </button>

      <select
        className="pagination-select"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        <option value={3}>3 per page</option>
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
      </select>
    </div>
  );
}
