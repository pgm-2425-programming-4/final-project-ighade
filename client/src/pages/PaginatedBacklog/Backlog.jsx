import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../api/data";
import { useParams, Link } from "@tanstack/react-router";
import DialogTasks from "../dialogTasks";
import { API_URL, API_TOKEN } from "../../../constants"; // import constants
import PaginationBacklog from "./PaginatedBacklog";


function Backlog() {
  const params = useParams({ from: "/projects/$id/backlog" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const dialogRef = useRef(null);
    const [pageSize, setPageSize] = useState(5); // standaard 5 per pagina


  const {
    data: backlogData,
    isLoading: isLoadingBacklog,
    error: errorBacklog,
    refetch: refetchTasks,
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
    isLoading: isLoadingTitle,
    error: errorTitle,
  } = useQuery({
    queryKey: ["projectTitle", params.id],
    queryFn: () => fetchData("projects", null, { id: { $eq: params.id } }),
  });

  const {
    data: statusData,
    isLoading: isLoadingStatus,
    error: errorStatus,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => fetchData("statuses"),
  });

  const projectTitle = projectTitleData?.data?.[0]?.title || "Project";
  const backlog = backlogData?.data || [];
  const statusList = statusData?.data || [];

  const pageCount = Math.ceil(backlog.length / pageSize);
  const visibleTasks = backlog.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (isLoadingBacklog || isLoadingTitle || isLoadingStatus)
    return <p>Loading...</p>;

  if (errorBacklog || errorTitle || errorStatus)
    return (
      <p>
        ErrorBacklog: {errorBacklog?.message}
        <br />
        ErrorTitle: {errorTitle?.message}
        <br />
        ErrorStatus: {errorStatus?.message}
      </p>
    );

  return (
    <>
      <div className="backlog">
        <div className="backlog__header">
          <h2 className="backlog__title">Backlog for {projectTitle}</h2>
          <Link to={`/projects/${params.id}`}>
            <button className="backlog__button">Go Back</button>
          </Link>
        </div>


        <ul className="backlog__list">
          {visibleTasks.map((task) => (
            <li
              key={task.id}
              className="backlog__item"
              onClick={() => {
                setSelectedTask(task);
                dialogRef.current?.showModal();
              }}
            >
              <p className="backlog__description">{task.description}</p>
            </li>
          ))}
        </ul>


        <PaginationBacklog
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChanged={(page) => setCurrentPage(page)}
        pageSize={pageSize}
        setPageSize={setPageSize}
        />
      </div>

      <DialogTasks
        dialogRef={dialogRef}
        selectedTask={selectedTask}
        statusList={statusList}
        refetchTasks={refetchTasks}
        API_URL={API_URL}
        API_TOKEN={API_TOKEN}
      />
    </>
  );
}

export default Backlog;
