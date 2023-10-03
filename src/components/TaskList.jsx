import Modal from './Modal';
import { useState, useEffect } from 'react';
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
  allChecked,
  allCheckedFunction,
  resetForm,
  resetChecked,
}) => {
  //state variables
  const [hiddenClass, setHiddenClass] = useState(true);
  const [idTaskToDelete, setIdTaskToDelete] = useState([]);
  const [taskNameToDelete, setTaskNameToDelete] = useState('');
  const [idSelectedTask, setIdSelectedTask] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [disabledEditBtn, setDisabledEditBtn] = useState(true);

console.log(idSelectedTask.length);
console.log(idSelectedTask);

  //variables
  const navigate = useNavigate();
  let emptyMsgClass =
    tasksObj.length === 0
      ? 'taskListSection__emptyMsg'
      : 'taskListSection__emptyMsg--hidden';

  //useEffect
  useEffect(() => {
    setDisabledBtn(idSelectedTask.length === 0 ? true : false);
    setDisabledEditBtn(idSelectedTask.length === 1 ? true : false);
  }, [idSelectedTask]);

  //functions
  const handleAllChecked = () => {
    const arrayIdTask = tasksObj.map((task) => task.idTask);
    setIdSelectedTask(arrayIdTask);
    allCheckedFunction(arrayIdTask);
  };

  const handleSelectedTask = (ev) => {
    const idClickedTaskNoArray = parseInt(ev.currentTarget.id);
    const idClickedTask = [];
    idClickedTask[0] = parseInt(ev.currentTarget.id);
    const elementClicked = getElementArray(idClickedTask[0]);
    const indexElementClicked = getIndexElementArray(idClickedTask[0])
    toggleCheckedTask(idClickedTask);
    const tasksObjClone = [...tasksObj];
    const idCheckedTasks = tasksObjClone.filter((task) => task.isChecked === true).map((task) => task.idTask);
    setIdSelectedTask(idCheckedTasks);
  };

  /*para que la propiedad checked sea controlable, el input necesita escuchar un evento*/
  const handleCheckedTask = (ev) => {
    const idClickedTask = parseInt(ev.target.id);
    if (idSelectedTask.length === 0) {
      setIdSelectedTask([idClickedTask]);
    } else {
      //setDisabledEditBtn(true);
      //setIdSelectedTask([...idSelectedTask, idClickedTask]);
    }
  };

  const handleEditTask = () => {
    if (idSelectedTask.length === 1) {
      getTaskToEdit(idSelectedTask[0]);
      navigate('/NewTask');
      setIdSelectedTask([]);
      resetChecked();
    }
  };

  const handleDeleteTask = (ev) => {
    ev.preventDefault();
    //Busco la tarea a eliminar para pasar su nombre a <Modal />
    if (idSelectedTask.length === 1) {
      const clickedTask = getElementArray(idSelectedTask[0]);
      setTaskNameToDelete(clickedTask.taskName);
      switchHiddenClass();
      setIdSelectedTask([]);
      resetChecked();
    } else {
      setTaskNameToDelete('las tareas seleccionadas');
      switchHiddenClass();
      setIdSelectedTask([]);
      resetChecked();
    }
    //quizas no sea necesaria la state var idTaskToDelete
    setIdTaskToDelete(idSelectedTask);
    setIdSelectedTask([]);
    resetChecked();
  };

  const switchHiddenClass = () => {
    setHiddenClass(!hiddenClass);
  };

  const handleCompleteTask = (ev) => {
    ev.preventDefault();
    toggleCompletedTask(idSelectedTask);
    setIdSelectedTask([]);
    resetChecked();
  };

  const taskList = tasksObj.map((task) => (
    <li
      key={task.idTask}
      className={`item ${task.isCompleted ? 'completedTask' : ''}`}
    >
      <div
        className="item__nameTask"
        onClick={handleSelectedTask}
        id={task.idTask}
      >
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
        idSelectedTask={idSelectedTask}
        switchHiddenClass={switchHiddenClass}
        taskNameToDelete={taskNameToDelete}
        toggleCheckedTask={toggleCheckedTask}
        resetForm={resetForm}
      />
    </li>
  ));

  return (
    <section className="taskListSection">
      <p className={emptyMsgClass}>¡No tienes tareas pendientes!</p>
      <ul className={`taskListSection__ul ${noTask ? 'hidden' : ''}`}>
        {taskList}
        <li className="item">
          <div>
            <input
              type="checkbox"
              name="checkbox"
              checked={allChecked}
              onChange={handleAllChecked}
            />
          </div>
        </li>
      </ul>
      <div className={`taskListSection__buttons ${noTask ? 'hidden' : ''}`}>
        <button
          className="taskListSection__buttons__button"
          onClick={handleCompleteTask}
          disabled={disabledBtn}
        >
          <img
            src={checkIcon}
            alt="Check icon"
            className="taskListSection__buttons__button__icon"
          />
        </button>
        <button
          className="taskListSection__buttons__button"
          onClick={handleDeleteTask}
          disabled={disabledBtn}
        >
          <img
            src={trashIcon}
            alt="Trash icon"
            className="taskListSection__buttons__button__icon"
          />
        </button>
        <button
          className="taskListSection__buttons__button"
          onClick={handleEditTask}
          disabled={disabledEditBtn ? false : true}
        >
          <img
            src={editIcon}
            alt="Edit icon"
            className="taskListSection__buttons__button__icon"
          />
        </button>
      </div>
    </section>
  );
};

export default TaskList;
