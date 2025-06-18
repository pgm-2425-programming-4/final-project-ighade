// PaginationBacklog.js
import React from "react";
import { Pagination } from "./Pagination";

function PaginationBacklog({ currentPage, pageCount, onPageChanged, pageSize, setPageSize }) {
  return (
    <div className="backlog__pagination-wrapper">
      <div className="backlog__page-size-select">
        <label htmlFor="pageSizeSelect">Toon per pagina: </label>
        <select
          id="pageSizeSelect"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            onPageChanged(1); // reset naar eerste pagina
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChanged={onPageChanged}
      />
    </div>
  );
}

export default PaginationBacklog;
