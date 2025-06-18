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
            <div className="layout">
            <aside className="layout__sidebar">
                <nav className="sidebar">
                    <ul className="sidebar__section">
                        <li className="sidebar__item"><Link className="sidebar__link" to="/">Home</Link></li>
                    </ul>

                    <div className="sidebar__title">Projects</div>
                    <ul className="sidebar__section">
                        {projects.map(project => (
                            <li key={project.id} className="sidebar__item">
                                <Link className="sidebar__link" to={`/projects/${project.id}`}>
                                    {project.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="sidebar__title">Info</div>
                    <ul className="sidebar__section">
                        <li className="sidebar__item"><Link className="sidebar__link" to="/about">About</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="layout__content">
                <Outlet />
            </main>
        </div>
        </>
    );
}

export default RouteLayout;