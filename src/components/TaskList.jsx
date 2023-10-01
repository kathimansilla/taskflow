import Modal from './Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskList = ({
  Link,
  tasksObj,
  deleteTask,
  toggleCompletedTask,
  getTaskToEdit,
  toggleCheckedTask,
}) => {
  //state variables
  const [hiddenClass, setHiddenClass] = useState(true);
  const [idTaskToDelete, setIdTaskToDelete] = useState();
  const [taskNameToDelete, setTaskNameToDelete] = useState('');
  const [idSelectedTask, setIdSelectedTask] = useState();
  const [disableEditBtn, setDisabledEditBtn] = useState(false);

  //variables
  const navigate = useNavigate();
  let emptyMsgClass =
    tasksObj.length === 0
      ? 'taskListSection__emptyMsg'
      : 'taskListSection__emptyMsg--hidden';

  //functions
  //sadado noche = handleSelectedTask --> checked
  const handleSelectedTask = (ev) => {
    const idClickedTask = parseInt(ev.target.id);
    toggleCheckedTask(idClickedTask);
    if (idSelectedTask === undefined) {
      setIdSelectedTask(idClickedTask);
    } else {
      setDisabledEditBtn(true);
      //setIdSelectedTask([...idSelectedTask, idClickedTask]);
    };
  };

  const handleEditTask = (ev) => {
    /*parseInt(ev.target.id);
    const indexTaskToEdit = tasksObj.findIndex(
      (task) => task.idTask === parseInt(ev.target.id)
    );
    getTaskToEdit(indexTaskToEdit);*/
    const indexTaskToEdit = tasksObj.findIndex(
      (task) => task.idTask === idSelectedTask
    );
    getTaskToEdit(indexTaskToEdit);
    navigate("/NewTask");
  };

  const handleDeleteTask = (ev) => {
    ev.preventDefault();
    //Busco la tarea a eliminar para pasar su nombre a <Modal />
    //esta funcion tiene que trabajar con el idSelectedTask
    /*const clickedTask = tasksObj.find(
      (task) => task.idTask === parseInt(ev.target.id)
    );
    setTaskNameToDelete(clickedTask.taskName);
    switchHiddenClass();
    const idTaskParseInt = parseInt(ev.target.id);
    setIdTaskToDelete(idTaskParseInt);*/
    const clickedTask = tasksObj.find((task) => task.idTask === idSelectedTask);
    setTaskNameToDelete(clickedTask.taskName);
    switchHiddenClass();
    //quizas no sea necesaria la state var idTaskToDelete
    setIdTaskToDelete(idSelectedTask);
  };

  const switchHiddenClass = () => {
    setHiddenClass(!hiddenClass);
  };

  const handleCompleteTask = (ev) => {
    ev.preventDefault();
    /*const idCompletedTask = parseInt(ev.target.id);
    setIdSelectedTask(idCompletedTask);*/
    toggleCompletedTask(idSelectedTask);
  };

  const taskList = tasksObj.map((task) => (
    <li
      key={task.idTask}
      className={`item ${task.isCompleted ? 'completedTask' : ''}`}
    >
      <div className="item__nameTask" onClick={handleSelectedTask}>
        <form>
          <input
            type="checkbox"
            name="checkbox"
            id={task.idTask}
            defaultChecked={task.isCompleted}
            className="item__nameTask__check"
            checked={task.checked}
          />
        </form>
        <p
          className={`item__nameTask__name ${
            task.isCompleted ? 'completedTask' : ''
          }`}
        >
          {task.taskName}
        </p>
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
      <div className="item__buttons">
      <form>
          <input
            type="checkbox"
            name="checkbox"
            /*id={task.idTask}
            defaultChecked={task.isCompleted}
            className="item__nameTask__check"
  onClick={handleCompleteTask}*/
          />
        </form>
        <button className="item__buttons__button" onClick={handleCompleteTask}>
          Finalizado
        </button>
        <button className="item__buttons__button" onClick={handleDeleteTask}>
          Elimnar
        </button>
        <button
          className="item__buttons__button--edit"
          onClick={handleEditTask} 
          disabled={disableEditBtn}
        >
          Editar
        </button>
      </div>
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
