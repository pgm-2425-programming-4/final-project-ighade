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
            ...
            <NewTask 
            dialogRef={dialogRef}
            params={params} 
            status={status} 
            categories={categories} 
            refetchTasks={refetchTasks}
            />

            <section>
                <form action="/$id" method="POST">
                    <select name="" id="" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                        <option value="">--Selecteer een tag--</option>
                        {tasks.flatMap(task => task.categories || [])
                            .reduce((acc, cat) => {
                                if (!acc.some(c => c.id === cat.id)) acc.push(cat);
                                return acc;
                            }, [])
                            .map((categorie) => (
                            <option key={categorie.id} value={categorie.id}>
                                {categorie.title}
                            </option>
                        ))}
                    </select>
                    <input type="text" onChange={(e) => setFilteredTasks(e.target.value)} />
                    <button type='submit'>submit</button>
                </form>
                <button className='button-task' type='button' onClick={() => dialogRef && dialogRef.current.showModal()}>New Task</button>
                <Link to={`/projects/${params.id}/backlog`}><button>Backlog</button></Link>

            </section>
            <section>
                <h1>active projecten {params.id}</h1>
                <div>
                    {status.filter(status => status.title !== "Backlog").map((status) => (
                        <div key={status.id}>
                            <h2> {status.title}</h2>
                            {tasks
                                .filter(task => selectedCategory === "" || (task.categories || []).some(cat => cat.id === Number(selectedCategory)))
                                .filter(task => task.description.toLowerCase().includes(filteredTasks.toLowerCase()))
                                .filter(task => task.statuses.id === status.id).map((task) => (
                                <div key={task.id}>
                                    <p>{task.description}</p>
                                    {task.categories?.map((categorie) => (
                                        <span key={categorie.id} className="badge bg-secondary me-1">
                                            {categorie.title}
                                        </span>
                                    )) }
                                </div>
                            ))}
                        </div>
                    ))}
                    
                </div>
            </section>
  
        </>
    );
};


export default Projects;