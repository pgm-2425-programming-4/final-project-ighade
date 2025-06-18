import { useParams, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api/data';
import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { API_URL, API_TOKEN } from '../../constants';

function Projects() {
    //nodige hooks
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredTasks, setFilteredTasks] = useState("");
    const dialogRef = useRef(null);

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
            let newCategories = values.categories || [];
            if (checked) {
                newCategories = [...newCategories, value];
            } else {
                newCategories = newCategories.filter((v) => v !== value);
            }
            // Update Formik
            setFieldValue("categories", newCategories);
    };


    const { handleSubmit, values, setFieldValue, handleChange } = useFormik({        initialValues: {
          description: "",
          statuses: "",
          categories: [],
        },
        onSubmit: async (values) => {
          const dataToSend = {
            data: 
              {
                project: params.id ,
                description: values.description,
                statuses: values.statuses,
                categories: values.categories.filter(cat => cat !== "new"), // exclude "new" if present
              }
            
            };
    
          // Example POST request
          await fetch(`${API_URL}tasks`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          });
            
            await refetchTasks();
            dialogRef.current?.close();
        }
      });


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
            <dialog ref={dialogRef}>
                <form onSubmit={handleSubmit}>
                    <h2>New Task</h2>
                    <label>Description</label>
                    <input type="text" name="description" placeholder='Description' value={values.description} onChange={handleChange} />
                    <input type="hidden" name="project" value={params.id} />
                    <label>Status</label>
                    <select
                        name="statuses"
                        id="status"
                        value={values.statuses}
                        onChange={handleChange}
                        >
                        <option value="">-- Kies status --</option>
                        {status.map((status) => (
                            <option key={status.id} value={status.id}>
                            {status.title}
                            </option>
                        ))}
                        </select>

                  <label>categories</label>
                    <div>
                    {categories.map(categorie => (
                        <label key={categorie.id} style={{ display: "block" }}>
                        <input
                            type="checkbox"
                            name="categories"
                            value={categorie.id}
                            checked={values.categories?.includes(String(categorie.id))}
                            onChange={handleCategoryChange}
                        />
                        {categorie.title}
                        </label>
                    ))}
                    <label style={{ display: "block" }}>
                        <input
                        type="checkbox"
                        name="categories"
                        value="new"
                        checked={values.categories?.includes("new")}
                        onChange={handleCategoryChange}
                        />
                        --New Tag--
                    </label>
                    {values.categories?.includes("new") && (
                        <input
                        type="text"
                        name="newTag"
                        placeholder="Nieuwe tag"
                        value={values.newTag || ""}
                        onChange={handleChange}
                        />
                    )}
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <button className='button-task' type='button' onClick={() => dialogRef && dialogRef.current.close()}>Close</button>
            </dialog>
            

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