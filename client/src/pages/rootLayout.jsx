import React, { useEffect, useState } from 'react';
import { Outlet } from '@tanstack/react-router';
import { API_URL } from '../../constants';
import { fetchData } from '../api/data';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'


function RouteLayout() {
    // const [projects, setProjects] = useState([]);

    const { isPending, error, data: projectsData, } = useQuery({
        queryKey: ['projects'],
        queryFn: () =>
        fetchData('projects'),
    })
    const projects = projectsData?.data || [];
    // console.log(projects);

    // if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message
    
    return (
        <>
            <aside>
                <nav>
                    <div>Projects</div>
                    <ul>
                    {projects.map(project => (
                        <li>
                            <a
                                key={project.id}
                                href={`/projects/${project.id}`}
                            >
                                {project.title}
                            </a>
                        </li>
                    ))}

                    </ul>
                        {/* <div style={{ width: "2rem", height: "2rem", backgroundColor: "blue" }}></div> */}
                </nav>
            </aside>
            <Outlet />
        </>
    );
}

export default RouteLayout;