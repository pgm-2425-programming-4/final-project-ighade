import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../api/data";
import { Pagination } from "./Pagination";
import { useParams } from "@tanstack/react-router";

function Backlog() {
  const params = useParams({ from: "/projects/$id/backlog" });
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: backlogData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["backlog", params.id],
    queryFn: () =>
      fetchData("tasks", "*", {
        project: { id: { $eq: params.id } },
        statuses: { title: { $eq: "Backlog" } },
      }),
  });

  const backlog = backlogData?.data || [];
  const pageSize = 5;
  const pageCount = Math.ceil(backlog.length / pageSize);
  const visibleTasks = backlog.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Pak de projecttitel uit de eerste taak (als er taken zijn)
  const projectTitle = backlog[0]?.project?.title || "Project";

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <h2>Project Backlog</h2>
        <h3>Tasks for: {projectTitle}</h3>
        <ul>
          {visibleTasks.map((task) => (
            <li key={task.id}>{task.description}</li>
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChanged={setCurrentPage}
        />
      </div>
    </>
  );
}

export default Backlog;