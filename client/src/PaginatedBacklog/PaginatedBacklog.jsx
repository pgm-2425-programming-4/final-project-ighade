import React, { useState, UseEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function PaginatedBacklog() {

    const [currentPage, setCurrentPage] = useState(1);
    const pageCount = 10;

    function handlePageChanged(pageNumber) {
    setCurrentPage(pageNumber);
    }
    return (
        <div style={{ margin: "2rem" }}>
            <div style={{ marginBottom: "2rem" }}>You are on page {currentPage}</div>
            <Pagination
                currentPage={currentPage}
                pageCount={pageCount}
                onPageChanged={handlePageChanged}
            />
        </div>
    )
}