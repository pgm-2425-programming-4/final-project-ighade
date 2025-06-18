export function Pagination({ currentPage, pageCount, onPageChanged }) {
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
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button
        className="pagination__button pagination__button--prev"
        disabled={currentPage === 1}
        onClick={() => onPageChanged(currentPage - 1)}
      >
        Previous
      </button>

      <ul className="pagination__list">
        {pageNumberArray.map((pageNumber, index) =>
          pageNumber === null ? (
            <li key={index} className="pagination__ellipsis">&hellip;</li>
          ) : (
            <li key={index}>
              <button
                className={`pagination__link${
                  pageNumber === currentPage ? " pagination__link--current" : ""
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
        className="pagination__button pagination__button--next"
        disabled={currentPage === pageCount}
        onClick={() => onPageChanged(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
}
