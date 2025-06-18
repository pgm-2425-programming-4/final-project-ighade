function DialogTasks({
  dialogRef,
  selectedTask,
  statusList,
  refetchTasks,
  API_URL,
  API_TOKEN,
}) {
  if (!selectedTask) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStatusId = formData.get("status");

    try {
      await fetch(`${API_URL}tasks/${selectedTask.documentId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            statuses: newStatusId,
          },
        }),
      });

      refetchTasks(); // Refetch de taken
      dialogRef.current?.close();
    } catch (error) {
      alert("Fout bij updaten status: " + error.message);
    }
  };

  return (
    <dialog ref={dialogRef} className="dialog-status">
      <form onSubmit={handleSubmit}>
        <h3>Status wijzigen voor taak:</h3>
        <p>
          <strong>{selectedTask.description}</strong>
        </p>

        <label htmlFor="status-select">Status</label>
        <select
          id="status-select"
          name="status"
          defaultValue={selectedTask.statuses.id}
          required
        >
          {statusList.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>

        <div style={{ marginTop: "1rem" }}>
          <button type="submit">Opslaan</button>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            style={{ marginLeft: "1rem" }}
          >
            Annuleren
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default DialogTasks;
