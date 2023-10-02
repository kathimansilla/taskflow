import Modal from './Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskList = ({
  tasksObj,
  deleteTask,
  toggleCompletedTask,
  getTaskToEdit,
  toggleCheckedTask,
  getIndexElementArray,
  getElementArray,
  checkIcon,
  trashIcon,
  editIcon,
  noTask,
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

  const handleSelectedTask = (ev) => {
    console.log('estoy en handleSelectedTask');
    const idClickedTask = parseInt(ev.currentTarget.id);
    console.log(idClickedTask);
    toggleCheckedTask(idClickedTask);
    setIdSelectedTask(idClickedTask);
  };

  const handleCheckedTask = (ev) => {
    const idClickedTask = parseInt(ev.target.id);
    if (idSelectedTask === undefined) {
      setIdSelectedTask(idClickedTask);
    } else {
      //setDisabledEditBtn(true);
      //setIdSelectedTask([...idSelectedTask, idClickedTask]);
    };
  };

  const handleEditTask = (ev) => {
    const indexTaskToEdit = getIndexElementArray(idSelectedTask);
    console.log(indexTaskToEdit);
    getTaskToEdit(indexTaskToEdit);
    navigate("/NewTask");
  };

  const handleDeleteTask = (ev) => {
    ev.preventDefault();
    //Busco la tarea a eliminar para pasar su nombre a <Modal />
    const clickedTask = getElementArray(idSelectedTask);
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
    toggleCompletedTask(idSelectedTask);
  };

  const taskList = tasksObj.map((task) => (
    <li
      key={task.idTask}
      className={`item ${task.isCompleted ? 'completedTask' : ''}`}
    >
      <div className="item__nameTask" onClick={handleSelectedTask} id={task.idTask}>
        <form>
          <input
            type="checkbox"
            name="checkbox"
            id={task.idTask}
            className="item__nameTask__check"
            checked={task.isChecked}
            onChange={handleCheckedTask}
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
      <ul className={`taskListSection__ul ${noTask ? 'hidden' : ''}`}>{taskList}
      <li className='item'>
        <div>
          <input
                type="checkbox"
                name="checkbox"
              />
        </div>
        </li>
        </ul>
      <div className={`taskListSection__buttons ${noTask ? 'hidden' : ''}`}>
        <button className="taskListSection__buttons__button" onClick={handleCompleteTask}>
          <img src={checkIcon} alt="Check icon" className="taskListSection__buttons__button__icon" />
        </button>
        <button className="taskListSection__buttons__button" onClick={handleDeleteTask}>
        <img src={trashIcon} alt="Trash icon" className="taskListSection__buttons__button__icon" />
        </button>
        <button
          className="taskListSection__buttons__button"
          onClick={handleEditTask} 
          disabled={disableEditBtn}
        >
          <img src={editIcon} alt="Edit icon" className="taskListSection__buttons__button__icon" />
        </button>
      </div>
    </section>
  );
};

export default TaskList;
