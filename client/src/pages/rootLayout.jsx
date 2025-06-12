import React, { useEffect, useState } from 'react';
import { Outlet, Link } from '@tanstack/react-router';
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
                    <ul>
                        <li><Link to="/">Home</Link></li>
                    </ul>
                    <div>Projects</div>
                    <ul>
                    {projects.map(project => (
                        <li key={project.id}>
                            <Link to={`/projects/${project.id}`}>
                                {project.title}
                            </Link>
                        </li>
                    ))}

                    </ul>
                    <div>Info</div>
                    <ul>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                        {/* <div style={{ width: "2rem", height: "2rem", backgroundColor: "blue" }}></div> */}
                </nav>
            </aside>
            <Outlet />
        </>
    );
}

export default RouteLayout;