const Form = ({ Link, newTaskObj, newTask, saveTask, emptyInputClass }) => {
  //functions
  const handleSubmit = (ev) => {
    ev.preventDefault();
    saveTask();
  };

  const handleInput = (ev) => {
    newTaskObj(ev.target.id, ev.target.value);
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
            value={newTask.taskName}
            onInput={handleInput}
          />
          <input type="submit" onClick={handleSubmit} value="Guardar" className="form__buttonSave" />
        </form>
        <Link to="/TasksList" className='form__link'>lista de tareas</Link>
        <Link to="/" className='form__link'>inicio</Link>
      </section>
    </>
  );
};
export default Form;
