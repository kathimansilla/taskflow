import Modal from './Modal';
import { useState } from 'react';

const TaskList = ({ Link, tasksObj, deleteTask, toggleCompletedTask, getTaskToEdit }) => {
  //state variables
  const [hiddenClass, setHiddenClass] = useState(true);
  const [idTaskToDelete, setIdTaskToDelete] = useState();
  //const [taskToEdit, setTaskToEdit] = useState();
  const [taskNameToDelete, setTaskNameToDelete] = useState('');

  //variables
  let emptyMsgClass =
    tasksObj.length === 0
      ? 'taskListSection__emptyMsg'
      : 'taskListSection__emptyMsg--hidden';

  //functions
  /*const handleSaveEdit = (ev) => {
    ev.preventDefault();
    //Editar tarea dentro de taskObj
    /*tasksObj[indexTaskToEdit].taskName 
  };*/

  /*const handleEditTask = (ev) => {
    ev.preventDefault();
    parseInt(ev.target.id);
    const taskToEdit = tasksObj.findIndex(
      (task) => task.idTask === parseInt(ev.target.id)
    );
    setIndexTaskToEdit(taskToEdit);
  };*/

  const handleEditTask = (ev) => {
    parseInt(ev.target.id);
    const indexTaskToEdit = tasksObj.findIndex(
      (task) => task.idTask === parseInt(ev.target.id)
    );
    console.log(indexTaskToEdit);
    getTaskToEdit(indexTaskToEdit);
    //llamar a la función getTaskToEdit que está en App y le pasa el resultado a Form
    //setTaskToEdit(taskToEdit);
  };

  const handleDeleteTask = (ev) => {
    ev.preventDefault();
    //Busco la tarea a eliminar para pasar su nombre a <Modal />
    const clickedTask = tasksObj.find(
      (task) => task.idTask === parseInt(ev.target.id)
    );
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
          {/*<input className='editInputName editInputName--hidden' type="text" placeholder='Nuevo nombre' />
          <input type="submit" className="item__nameTask__buttonSave" onClick={handleSaveEdit} value="Guardar" />*/}
        </form>
        <p className="item__nameTask__nameHidden">{task.taskName}</p>
      </div>
      <div className="item__buttons">
        <button
          className="item__buttons__button"
          onClick={handleDeleteTask}
          id={task.idTask}
        >
          Elimnar
        </button>
        <Link
          to="/NewTask"
          className="item__buttons__button item__buttons__button--edit"
          onClick={handleEditTask}
          id={task.idTask}
        >
          Editar
        </Link>
      </div>
      <Modal
        hiddenClass={hiddenClass}
        taskName={task.taskName}
        deleteTask={deleteTask}
        idTaskToDelete={idTaskToDelete}
        switchHiddenClass={switchHiddenClass}
        taskNameToDelete={taskNameToDelete}
      />
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
