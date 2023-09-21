/* eslint-disable react/prop-types */

const TaskList = ({ Link, tasksObj, deleteTask }) => {
  //functions
  const handleDeleteTask = (ev) => {
    deleteTask(ev.target.id);
    console.log(ev.target.id);
    console.log('delete');
  };

  const handleCompleteTask = (ev) => {
    /*Cambiar de color para diferenciarla de las tareas que no han sido completadas, deshabilitar botón de editar con una variable de estado booleana*/
  };

  /*Falta generar un id porque el user puede poner dos tareas con el mismo nombre y daría error y para poder Eliminar tareas a través de su id. Además la consola se queja de que el key no es único*/
 
  const taskList = tasksObj.map((task) => (
    <li key={task.taskName} className="item">
      <div className='item__nameTask'>
        <button className='item__nameTask__check' onClick={handleCompleteTask} id={task.taskName}>
          ✅
        </button>
        <p>{task.taskName}</p>
      </div>
      <button className='item__button' onClick={handleDeleteTask} id={task.id}>
        Elimnar
      </button>
      <button className='item__button'>Editar</button>
    </li>
  ));

  /* Message: No tienes tareas pendientes. Yay! Para cuando no hay ninguna tarea  */
  return (
    <section className='taskListSection'>
      <ul className="taskListSection__ul">{taskList}</ul>
      <Link className='taskListSection__link' to="/">Ir al inicio</Link>
    </section>
  );
};

export default TaskList;
