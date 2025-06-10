import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api/data';



function Projects() {
    const params = useParams({ from: '/projects/$id' });
    const {
        data: tasksData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: () => fetchData("tasks", "*", { project: { id: { $eq: params.id } } })
    });
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const tasks = tasksData?.data || [];
    console.log(tasks);
    return (
        <>
            <h1>Welcome projects {params.id}</h1>
        </>
    );
};


export default Projects;