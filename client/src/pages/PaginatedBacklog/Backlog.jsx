import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../api/data";
import { Pagination } from "./Pagination";
import { useParams, Link } from "@tanstack/react-router";

function Backlog() {
  // fetching
  const params = useParams({ from: "/projects/$id/backlog" });
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: backlogData,
    isLoading: isLoadingBacklog,
    error: errorBacklog,
  } = useQuery({
    queryKey: ["backlog", params.id],
    queryFn: () =>
      fetchData("tasks", "*", {
        project: { id: { $eq: params.id } },
        statuses: { title: { $eq: "Backlog" } },
      }),
  });
  const {
    data: projectTitleData,
    isLoading : isLoadingTitle,
    error: errorTitle,
  } = useQuery({
    queryKey: ["projectTitle", params.id],
    queryFn: () =>
      fetchData("projects", null, {
        id: { $eq: params.id }
      }),
        
      
  });

  // data bewerken/init
  const projectTitle = projectTitleData?.data?.[0]?.title || "Project";
  const backlog = backlogData?.data || [];
  const pageSize = 5;
  const pageCount = Math.ceil(backlog.length / pageSize);
  const visibleTasks = backlog.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (isLoadingBacklog || isLoadingTitle) return <p>Loading...</p>;
  if (errorBacklog || errorTitle) return <p>ErrorBacklog: {errorBacklog.message} <br /> ErrorTitle: {errorTitle.message} </p>;

  // Pak de projecttitel uit de eerste taak (als er taken zijn)
  return (
    <>
      <div style={{ padding: "2rem" }}>
        <h2>Backlog for {projectTitle}</h2>
        <Link to={`/projects/${params.id}`}><button>Go Back</button></Link>
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