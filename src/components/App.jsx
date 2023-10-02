import { useState, useEffect } from 'react';
import '../styles/App.css';
import Header from './Header';
import Landing from './Landing';
import Form from './Form';
import TaskList from './TaskList';
import Footer from './Footer';
import '../styles/App.css';
import { Route, Routes, Link } from 'react-router-dom';
import logo from '../assets/images/logo-taskflow.svg';
import plusIcon from '../assets/images/square-plus-regular.svg';
import listIcon from '../assets/images/list-solid.svg';
import checkIcon from '../assets/images/square-check-regular.svg';
import trashIcon from '../assets/images/trash-solid.svg';
import editIcon from '../assets/images/edit-square-solid.svg';
import ls from '../services/ls';

function App() {
  // state variables
  const [idTask, setIdTask] = useState(0);
  const [tasksObj, setTasksObj] = useState(ls.get('data', []));
  const [newTask, setNewTask] = useState({ taskName: '' });
  const [emptyInputClass, setEmptyInputClass] = useState('');
  const [taskToEdit, setTaskToEdit] = useState({ taskName: '', edit: false });
  const [noTask, setNoTask] = useState(true);
  const [indexTaskToEdit, setIndexTaskToEdit] = useState();

  //generals functions
  const getElementArray = (taskId) => {
    return tasksObj.find((task) => task.idTask === taskId);
  };

  const getIndexElementArray = (taskId) => {
    return tasksObj.findIndex((task) => task.idTask === taskId);
  };

  //specific functions
  const resetForm = () => {
    setTaskToEdit({ taskName: '', edit: false });
    setNewTask({ taskName: '' });
    setEmptyInputClass('');
      const updateTaskObj = [...tasksObj];
      updateTaskObj[indexTaskToEdit].edit = false;
      updateTaskObj[indexTaskToEdit].isChecked = false;
      setTasksObj(updateTaskObj);
  };

  const editTask = (keyName, value) => {
    const editData = {
      ...taskToEdit,
      [keyName]: value,
    };
    setTaskToEdit(editData);
  };

  const getTaskToEdit = (taskId) => {
    const taskToEditLocal = getElementArray(taskId);
    const IndexTaskToEditLocal = getIndexElementArray(taskId);
    setIndexTaskToEdit(IndexTaskToEditLocal);
    const taskEditTrue = { ...taskToEditLocal, edit: true, isChecked: false };
    setTaskToEdit(taskEditTrue);

    const updateTaskObj = [...tasksObj];
    updateTaskObj[IndexTaskToEditLocal].edit = false;
    updateTaskObj[IndexTaskToEditLocal].isChecked = false;
    setTasksObj(updateTaskObj);
  };

  const newTaskObj = (keyName, value) => {
    const newData = {
      ...newTask,
      [keyName]: value,
      idTask: idTask,
      isCompleted: false,
      edit: false,
      isChecked: false,
    };
    setNewTask(newData);
  };

  /*con esta función se guarda la tarea en el Array de tareas y en localstorage y DDBB y se indica la clase que valida si los inputs están completados o no*/
  const saveTask = () => {
    if (
      (newTask.taskName.trim() === '' || newTask.taskName === undefined) &&
      !taskToEdit.edit
    ) {
      setEmptyInputClass('emptyInput');
    } else if (taskToEdit.edit) {
      if (taskToEdit.taskName === '') {
        setEmptyInputClass('emptyInput');
      } else {
        const taskToEditClone = { ...taskToEdit, edit: false };
        const taskObjClone = [...tasksObj];
        const indexTaskToEdit = getIndexElementArray(taskToEdit.idTask);
        taskObjClone.splice(indexTaskToEdit, 1, taskToEditClone);
        setTasksObj(taskObjClone);
        setEmptyInputClass('');
        setTaskToEdit({ taskName: '' });
        setNewTask({ taskName: '' });
        //save in DDBB
      }
    } else {
      setIdTask(idTask + 1);
      const newTaskWhitId = { ...newTask, idTask: idTask };
      const newTaskToArray = [...tasksObj, newTaskWhitId];
      setTasksObj(newTaskToArray);
      setEmptyInputClass('');
      setNewTask({ taskName: '' });
      setTaskToEdit({ taskName: '' });
      //save in DDBB
    }
  };

  //con esta función se marca la tarea como completada
  const toggleCompletedTask = (idTask) => {
    const completedTaskIndex = getIndexElementArray(idTask);
    if (completedTaskIndex === -1) {
      console.log('error: no se encontró la tarea');
    } else {
      const updateTaskObj = [...tasksObj];
      updateTaskObj[completedTaskIndex].isCompleted =
        !updateTaskObj[completedTaskIndex].isCompleted;
      updateTaskObj[completedTaskIndex].isChecked = false;
      setTasksObj(updateTaskObj);
    }
  };

  //con esta función se modifica la propiedad checked del objeto task
  const toggleCheckedTask = (idTask) => {
    const checkedTaskIndex = getIndexElementArray(idTask);
    const taskObjClone = [...tasksObj];
    taskObjClone[checkedTaskIndex].isChecked =
      !taskObjClone[checkedTaskIndex].isChecked;
    setTasksObj(taskObjClone);
  };

  //useEffect
  useEffect(() => {
    ls.set('data', tasksObj);
    setNoTask(tasksObj.length === 0 ? true : false);
  }, [tasksObj]);

  useEffect(() => {
    if (tasksObj.length === 0) {
      setIdTask(0);
    } else {
      const indexLastTask = tasksObj.length - 1;
      const lastTask = tasksObj[indexLastTask];
      const lastIdTask = lastTask.idTask;
      setIdTask(lastIdTask + 1);
    }
  }, []);

  //Eliminar tarea
  const deleteTask = (taskId) => {
    const cleanTaskObj = tasksObj.filter((task) => task.idTask !== taskId);
    setTasksObj(cleanTaskObj);
    ls.remove(taskId);
  };

  return (
    <>
      <Header logo={logo} resetForm={resetForm} Link={Link} />
      <main>
        <Routes>
          <Route path="/" element={<Landing Link={Link} logo={logo} />} />
          <Route
            path="/NewTask"
            element={
              <Form
                newTaskObj={newTaskObj}
                newTask={newTask}
                saveTask={saveTask}
                emptyInputClass={emptyInputClass}
                taskToEdit={taskToEdit}
                editTask={editTask}
                resetForm={resetForm}
                getIndexElementArray={getIndexElementArray}
              />
            }
          />
          <Route
            path="/TasksList"
            element={
              <TaskList
                tasksObj={tasksObj}
                deleteTask={deleteTask}
                toggleCompletedTask={toggleCompletedTask}
                getTaskToEdit={getTaskToEdit}
                toggleCheckedTask={toggleCheckedTask}
                getIndexElementArray={getIndexElementArray}
                getElementArray={getElementArray}
                checkIcon={checkIcon}
                trashIcon={trashIcon}
                editIcon={editIcon}
                noTask={noTask}
                resetForm={resetForm}
              />
            }
          />
        </Routes>
      </main>
      <Footer
        logo={logo}
        plusIcon={plusIcon}
        Link={Link}
        resetForm={resetForm}
        listIcon={listIcon}
      />
    </>
  );
}

export default App;
