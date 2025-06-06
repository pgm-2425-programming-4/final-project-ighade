// Backlog.jsx
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../api/data";
import { Pagination } from "./Pagination";

function Backlog() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: projectsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchData("projects", "tasks"),
  });
  
  const projects = projectsData?.data || [];

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
      setCurrentPage(1);
    }
  }, [projects, selectedProject]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

const pageCount = selectedProject ? Math.ceil(selectedProject.tasks.length / 5) : 0;
const visibleTasks = selectedProject ? selectedProject.tasks.slice((currentPage - 1) * 5, currentPage * 5) : [];

if (!selectedProject) return null;
  return (
    <>
    <div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <button
              onClick={() => {setSelectedProject(project); setCurrentPage(1);}}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {project.title}
            </button>
          </li>
        ))}
      </ul>
  </div>
    <div style={{ padding: "2rem" }}>
      <h2>Project Backlog</h2>
      <div>
        <h3>Tasks for: {selectedProject.title}</h3>
        <ul>
          {visibleTasks.map((task) => (
            <li key={task.id}>{task.description}</li>
          ))}
        </ul>
        {/* <button onClick={() => setSelectedProject(null)}>Back to projects</button> */}
      </div>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChanged={(page) => setCurrentPage(page)}
          />
    </div>
  </>
  );
}

export default Backlog;
