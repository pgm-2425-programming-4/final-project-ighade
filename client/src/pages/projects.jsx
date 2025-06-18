import { useParams, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api/data';
import { useState, useRef } from 'react';
import NewTask from './newTask';
// import { useFormik } from 'formik';
// import { API_URL, API_TOKEN } from '../../constants';

function Projects() {
    //nodige hooks
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredTasks, setFilteredTasks] = useState("");
    const dialogRef = useRef(null);


    


    //haal data op van de API
    const params = useParams({ from: '/projects/$id' });
    const {
        data: statusData,
        isLoading: isLoadingStatus,
        error: errorStatus,
    } = useQuery({
        queryKey: ["status"],
        queryFn: () => fetchData("statuses")
    });
    const {
        data: tasksData,
        isLoading: isLoadingTasks,
        error: errorTasks,
        refetch: refetchTasks,
    } = useQuery({
        queryKey: ["tasks",params.id],
        queryFn: () => fetchData("tasks", "*", { project: { id: { $eq: params.id } } })
    });
    const { 
        data: projectsData,
        isLoading: isLoadingProjects,
        error: errorProjects,
    } = useQuery({
        queryKey: ['projects'],
        queryFn: () =>
        fetchData('projects'),
    })
    const {
        data: categorieData,
        isLoading: isLoadingCategories,
        error: errorCategories,
    } = useQuery({
        queryKey: ["categories", params.id],
        queryFn: () => fetchData("categories")
    })
    
    
    if (isLoadingStatus || isLoadingTasks) return <p>Loading...</p>;
    if (errorStatus || errorTasks) return <p>ErrorStatus: {errorStatus.message} <br />ErrorTasks: {errorTasks.message} </p>;
    
    //clean de data
    const status = statusData?.data || [];
    const tasks = tasksData?.data || [];
    const projects = projectsData?.data || [];
    const categories = categorieData?.data || [];
    console.log(tasks);
    //gebruik de data
    return (
        <>
            <NewTask 
            dialogRef={dialogRef}
            params={params} 
            status={status} 
            categories={categories} 
            refetchTasks={refetchTasks}
            />

            <section className="task-controls">
                <form className="task-controls__form" onSubmit={(e) => e.preventDefault()}>
                    <select
                    className="task-controls__select"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                    >
                    <option value="">--Selecteer een tag--</option>
                    {tasks
                        .flatMap((task) => task.categories || [])
                        .reduce((acc, cat) => {
                        if (!acc.some((c) => c.id === cat.id)) acc.push(cat);
                        return acc;
                        }, [])
                        .map((categorie) => (
                        <option key={categorie.id} value={categorie.id}>
                            {categorie.title}
                        </option>
                        ))}
                    </select>
                    <input
                    type="text"
                    className="task-controls__input"
                    placeholder="Filter op beschrijving"
                    onChange={(e) => setFilteredTasks(e.target.value)}
                    />
                    <button type="submit" className="task-controls__button">
                    Filter
                    </button>
                </form>

                <div className="task-controls__actions">
                    <button
                    className="task-controls__button task-controls__button--new"
                    type="button"
                    onClick={() => dialogRef?.current?.showModal()}
                    >
                    New Task
                    </button>
                    <Link to={`/projects/${params.id}/backlog`}>
                    <button className="task-controls__button">Backlog</button>
                    </Link>
                </div>
                </section>


            <section className="task-grid">
                {status
                    .filter((status) => status.title !== "Backlog")
                    .map((status) => (
                        <div key={status.id} className="task-grid__column">
                            <h2 className="task-grid__title">{status.title}</h2>
                            {tasks
                                .filter(
                                    (task) =>
                                        selectedCategory === "" ||
                                        (task.categories || []).some((cat) => cat.id === Number(selectedCategory))
                                )
                                .filter((task) =>
                                    task.description.toLowerCase().includes(filteredTasks.toLowerCase())
                                )
                                .filter((task) => task.statuses.id === status.id)
                                .map((task) => (
                                    <div key={task.id} className="task-card">
                                        <p className="task-card__description">{task.description}</p>
                                        <div className="task-card__badges">
                                            {task.categories?.map((categorie) => (
                                                <span key={categorie.id} className="task-card__badge">
                                                    {categorie.title}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ))}
            </section>

  
        </>
    );
};


export default Projects;