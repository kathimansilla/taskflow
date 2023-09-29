import Modal from './Modal';
import { useState } from 'react';

const TaskList = ({ Link, tasksObj, deleteTask, toggleCompletedTask }) => {
  //state variables
  const [hiddenClass, setHiddenClass] = useState(true);
  const [idTaskToDelete, setIdTaskToDelete] = useState();
  const [taskNameToDelete, setTaskNameToDelete] = useState('');

  //variables
  let emptyMsgClass =
    tasksObj.length === 0
      ? 'taskListSection__emptyMsg'
      : 'taskListSection__emptyMsg--hidden';

  //functions
  const handleDeleteTask = (ev) => {
    //Busco la tarea a eliminar para pasar su nombre a Modal
    const clickedTask = tasksObj.find((task) => task.idTask === parseInt(ev.target.id));
    setTaskNameToDelete(clickedTask.taskName);
    switchHiddenClass();
    const idTaskParseInt = parseInt(ev.target.id);
    setIdTaskToDelete(idTaskParseInt);
  };

  const switchHiddenClass = () => {
    setHiddenClass(!hiddenClass);
  };

  const handleCompleteTask = (ev) => {
    const idCompletedTask = parseInt(ev.target.id);
    toggleCompletedTask(idCompletedTask);
  };

  const taskList = tasksObj.map((task) => (
    <li
      key={task.idTask}
      className={`item ${task.isCompleted ? 'completedTask' : ''}`}
    >
      <div className="item__nameTask">
        <form>
          <input
            type="checkbox"
            name="checkbox"
            id={task.idTask}
            defaultChecked={task.isCompleted}
            className="item__nameTask__check"
            onClick={handleCompleteTask}
          />
        </form>
        <p>{task.taskName}</p>
      </div>
      <button
        className="item__button"
        onClick={handleDeleteTask}
        id={task.idTask}
      >
        Elimnar
      </button>
      <Modal hiddenClass={hiddenClass} taskName={task.taskName} deleteTask={deleteTask} idTaskToDelete={idTaskToDelete} switchHiddenClass={switchHiddenClass} taskNameToDelete={taskNameToDelete} />
    </li>
  ));

  return (
    <section className="taskListSection">
      <p className={emptyMsgClass}>¡No tienes tareas pendientes!</p>
      <ul className="taskListSection__ul">{taskList}</ul>
      <Link to="/NewTask" className="taskListSection__link">
        añadir tarea
      </Link>
      <Link className="taskListSection__link" to="/">
        inicio
      </Link>
    </section>
  );
};

export default TaskList;
