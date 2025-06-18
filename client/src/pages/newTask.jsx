import { useFormik } from 'formik';
import { API_URL, API_TOKEN } from '../../constants';
import { useRef } from 'react';

function NewTask({dialogRef, params, status, categories, refetchTasks }) {


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
          
    return (
        <>
       <dialog ref={dialogRef} className="task-dialog">
    <form onSubmit={handleSubmit} className="task-dialog__form">
        <h2 className="task-dialog__title">New Task</h2>
        <label className="task-dialog__label">Description</label>
        <input type="text" name="description" className="task-dialog__input" placeholder="Description" value={values.description} onChange={handleChange} />
        <input type="hidden" name="project" value={params.id} />
        <label className="task-dialog__label">Status</label>
        <select name="statuses" id="status" className="task-dialog__select" value={values.statuses} onChange={handleChange}
>
            <option value="">-- Kies status --</option>
            {status.map((status) => (
                <option key={status.id} value={status.id}>
                {status.title}
                </option>
            ))}
        </select>
        <label className="task-dialog__label">Categories</label>
        <div className="task-dialog__checkbox-group">
        {categories.map((categorie) => (
            <label key={categorie.id} className="task-dialog__checkbox-label">
            <input type="checkbox" name="categories" value={categorie.id} checked={values.categories?.includes(String(categorie.id))} onChange={handleCategoryChange}     />
            {categorie.title}
            </label>
        ))}

        <label className="task-dialog__checkbox-label">
            <input type="checkbox" name="categories" value="new" checked={values.categories?.includes("new")} onChange={handleCategoryChange} />
            --New Tag--
        </label>

        {values.categories?.includes("new") && (
            <input type="text" name="newTag" placeholder="Nieuwe tag" className="task-dialog__input" value={values.newTag || ""} onChange={handleChange} />
        )}
        </div>

        <button type="submit" className="task-dialog__button">Submit</button>
    </form>

    <button type="button" className="task-dialog__button task-dialog__button--close" onClick={() => dialogRef?.current?.close()}
    >
        Close
    </button>
</dialog>

    </>
    );
}

export default NewTask;
