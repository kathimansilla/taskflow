import Modal from '../common/Modal';
import TaskItem from './TaskItem';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskList = ({
  tasksObj,
  deleteTask,
  toggleCompletedTask,
  getTaskToEdit,
  toggleCheckedTask,
  getElementArray,
  checkIcon,
  trashIcon,
  editIcon,
  noTask,
  allChecked,
  allCheckedFunction,
  resetForm,
  resetChecked,
  allCheckedBox,
}) => {
  //state variables
  const [hiddenClass, setHiddenClass] = useState(true);
  const [idTaskToDelete, setIdTaskToDelete] = useState([]);
  const [taskNameToDelete, setTaskNameToDelete] = useState('');
  const [idSelectedTask, setIdSelectedTask] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [disabledEditBtn, setDisabledEditBtn] = useState(true);

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
    if (!allChecked) {
      const arrayIdTask = tasksObj.map((task) => task.idTask);
      setIdSelectedTask(arrayIdTask);
      allCheckedFunction();
    } else {
      setIdSelectedTask([]);
      allCheckedFunction();
    }
  };

  const handleSelectedTask = (ev) => {
    const idClickedTask = [];
    idClickedTask[0] = parseInt(ev.currentTarget.id);
    toggleCheckedTask(idClickedTask);
    const tasksObjClone = [...tasksObj];
    const idCheckedTasks = tasksObjClone
      .filter((task) => task.isChecked === true)
      .map((task) => task.idTask);
    setIdSelectedTask(idCheckedTasks);
    if (idCheckedTasks.length !== tasksObj.length) {
      allCheckedBox();
    }
  };

  /*para que la propiedad checked sea controlable, el input necesita escuchar un evento*/
  const handleCheckedTask = (ev) => {
    const idClickedTask = parseInt(ev.target.id);
    if (idSelectedTask.length === 0) {
      setIdSelectedTask([idClickedTask]);
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
    //Find the task to delete to pass its name to <Modal />
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
  };

  //Components: TaskItem + Modal
  const taskList = tasksObj.map((task) => (
    <li
      key={task.idTask}
      className={`item ${task.isCompleted ? 'completedTask' : ''}`}
    >
      <TaskItem task={task} handleSelectedTask={handleSelectedTask} handleCheckedTask={handleCheckedTask} />
      <Modal
        hiddenClass={hiddenClass}
        deleteTask={deleteTask}
        idTaskToDelete={idTaskToDelete}
        switchHiddenClass={switchHiddenClass}
        taskNameToDelete={taskNameToDelete}
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
              className='item__allcheck'
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
