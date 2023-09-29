const TaskList = ({ Link, tasksObj, deleteTask, toggleCompletedTask }) => {
  //variables
  let emptyMsgClass = tasksObj.length === 0 ? 'taskListSection__emptyMsg' : 'taskListSection__emptyMsg--hidden';

  //functions
  const handleDeleteTask = (ev) => {
    showModal();
    const idTaskParseInt = parseInt(ev.target.id);
    deleteTask(idTaskParseInt);
  };

  const handleCompleteTask = (ev) => {
    const idCompletedTask = parseInt(ev.target.id);
    toggleCompletedTask(idCompletedTask);
  };
 
  const taskList = tasksObj.map((task) => (
    <li key={task.idTask} className={`item ${task.isCompleted ? 'completedTask' : ''}`}>
      <div className='item__nameTask'>
        <form>
          <input type="checkbox" name="checkbox" id={task.idTask} defaultChecked={task.isCompleted} className="item__nameTask__check" onClick={handleCompleteTask} />
        </form>
        <p>{task.taskName}</p>
      </div>
      <button className='item__button' onClick={handleDeleteTask} id={task.idTask}>
        Elimnar
      </button>
    </li>
  ));

  return (
    <section className='taskListSection'>
      <p className={emptyMsgClass}>¡No tienes tareas pendientes!</p>
      <ul className="taskListSection__ul">{taskList}</ul>
      <dialog><p>Hola</p></dialog>
      <Link to="/NewTask" className='taskListSection__link'>
        añadir tarea
      </Link>
      <Link className='taskListSection__link' to="/">inicio</Link>
    </section>
  );
};

export default TaskList;
