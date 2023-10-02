const Form = ({ newTaskObj, newTask, saveTask, emptyInputClass, taskToEdit, editTask, resetForm, getIndexElementArray }) => {
  //functions
  const handleCancel = (ev) => {
    ev.preventDefault();
    const indexTaskToEdit = getIndexElementArray(taskToEdit.idTask);;
    resetForm(indexTaskToEdit);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    saveTask();
  };

  const handleInput = (ev) => {
    if (taskToEdit.edit) {
      return editTask(ev.target.id, ev.target.value);
    } else {
      return newTaskObj(ev.target.id, ev.target.value);
    }
  };

  return (
    <>
      <section className='formSection'>
        <form className="form">
          <h2 className="form__title">Añadir tarea</h2>
          <input
            className={`form__input ${emptyInputClass}`}
            type="text"
            placeholder="Nombre de la tarea"
            name="taskName"
            id="taskName"
            value={newTask.taskName || taskToEdit.taskName || ''}
            onInput={handleInput}
          />
          <div className="form__btnContainer">
            <input type="submit" onClick={handleSubmit} value="Guardar" className="form__btnContainer__button" />
            <input type="submit" onClick={handleCancel} value="Cancelar" className="form__btnContainer__button form__btnContainer__button--cancel" />
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
