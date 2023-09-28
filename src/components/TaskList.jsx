import { useState } from 'react';

const TaskList = ({ Link, tasksObj, deleteTask }) => {
  //state variables
  const [isChecked, setIsChecked] = useState(false);
  const [completedTask, setCompletedTask] = useState('');

  //variables
  let emptyMsgClass = tasksObj.length === 0 ? 'taskListSection__emptyMsg' : 'taskListSection__emptyMsg--hidden';

  //functions
  const handleDeleteTask = (ev) => {
    deleteTask(ev.target.id);
  };

  const handleCompleteTask = (ev) => {
    console.log(ev);
    setIsChecked(!isChecked);
    setCompletedTask(isChecked ? '' : 'completedTask');
  };

  /*Falta generar un id porque el user puede poner dos tareas con el mismo nombre y daría error y para poder Eliminar tareas a través de su id. Además la consola se queja de que el key no es único*/
 
  const taskList = tasksObj.map((task) => (
    <li key={task.taskName} className={`item ${completedTask}`}>
      <div className='item__nameTask'>
        <form>
          <input type="checkbox" name="checkbox" id="checkbox" defaultChecked={isChecked} className="item__nameTask__check" onClick={handleCompleteTask} />
        </form>
        <p>{task.taskName}</p>
      </div>
      <button className='item__button' onClick={handleDeleteTask} id={task.taskName}>
        Elimnar
      </button>
    </li>
  ));

  return (
    <section className='taskListSection'>
      <p className={emptyMsgClass}>¡No tienes tareas pendientes!</p>
      <ul className="taskListSection__ul">{taskList}</ul>
      <Link to="/NewTask" className='taskListSection__link'>
        añadir tarea
      </Link>
      <Link className='taskListSection__link' to="/">inicio</Link>
    </section>
  );
};

export default TaskList;
