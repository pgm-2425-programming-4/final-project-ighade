import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api/data';



function Projects() {
    //haal data op van de API
    const params = useParams({ from: '/projects/$id' });
    const {
        data: statusData,
        isLoading: isLoadingStatus,
        error: errorStatus,
    } = useQuery({
        queryKey: ["status"],
        queryFn: () => fetchData("statuses",)
    });
    const {
        data: tasksData,
        isLoading: isLoadingTasks,
        error: errorTasks,
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: () => fetchData("tasks", "*", { project: { id: { $eq: params.id } } })
    });

    
    if (isLoadingStatus || isLoadingTasks) return <p>Loading...</p>;
    if (errorStatus || errorTasks) return <p>ErrorStatus: {errorStatus.message} <br />ErrorTasks: {errorTasks.message} </p>;
  
    //clean de data
    const status = statusData?.data?.filter(status => status.title !== "Backlog") || [];
    const tasks = tasksData?.data || [];
    console.log(tasks);

    //gebruik de data
    return (
        <>
            <h1>active projecten {params.id}</h1>
            <section>
                <div>
                    {status.map((status) => (
                        <div key={status.id}>
                            <h2> {status.title}</h2>
                            {tasks.filter(task => task.statuses.id === status.id).map((task) => (
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