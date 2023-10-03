import { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import '../styles/App.scss';
//components and services
import Header from './layout/Header';
import Landing from './layout/Landing';
import Form from './layout/Form';
import TaskList from './task/TaskList';
import Footer from './layout/Footer';
import ls from '../services/ls';
//images
import logoBlack from '../assets/images/logo-taskflow.svg';
import logoWhite from '../assets/images/logo-taskflowWhite.svg';
import plusIcon from '../assets/images/square-plus-regular.svg';
import listIcon from '../assets/images/list-solid.svg';
import checkIcon from '../assets/images/square-check-regular.svg';
import trashIcon from '../assets/images/trash-solid.svg';
import editIcon from '../assets/images/edit-square-solid.svg';

function App() {
  // state variables
  const [idTask, setIdTask] = useState(0);
  const [tasksObj, setTasksObj] = useState(ls.get('data', []));
  const [newTask, setNewTask] = useState({ taskName: '' });
  const [emptyInputClass, setEmptyInputClass] = useState('');
  const [taskToEdit, setTaskToEdit] = useState({ taskName: '', edit: false });
  const [noTask, setNoTask] = useState(true);
  const [allChecked, setAllChecked] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  //general functions
  const getElementArray = (taskId) => {
    return tasksObj.find((task) => task.idTask === taskId);
  };

  const getIndexElementArray = (taskId) => {
    return tasksObj.findIndex((task) => task.idTask === taskId);
  };

  //specific functions
  const allCheckedFunction = () => {
    setAllChecked(!allChecked);
    if (allChecked) {
      const tasksObjUpdate = tasksObj.map((task) => ({
        ...task,
        isChecked: false,
      }));
      setTasksObj(tasksObjUpdate);
    } else {
      const tasksObjUpdate = tasksObj.map((task) => ({
        ...task,
        isChecked: true,
      }));
      setTasksObj(tasksObjUpdate);
    }
  };

  const allCheckedBox = () => {
    setAllChecked(false);
  };

  const resetChecked = () => {
    const tasksObjClone = tasksObj.map((task) => ({
      ...task,
      isChecked: false,
    }));
    setTasksObj(tasksObjClone);
    setAllChecked(false);
  };

  const resetForm = () => {
    setTaskToEdit({ taskName: '', edit: false });
    setNewTask({ taskName: '' });
    setEmptyInputClass('');
    setAllChecked(false);
    const tasksObjUpdate = tasksObj.map((task) => ({
      ...task,
      isChecked: false,
    }));
    setTasksObj(tasksObjUpdate);
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

  /*This function saves the task in the tasks array, local storage, and the database (not yet), and sets the class that validates whether the inputs are completed or not*/
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
        setSuccessMsg('¡Editado con éxito!');
        setTimeout(() => {
          setSuccessMsg('');
        }, 1000);
      }
    } else {
      setIdTask(idTask + 1);
      const newTaskWhitId = { ...newTask, idTask: idTask };
      const newTaskToArray = [...tasksObj, newTaskWhitId];
      setTasksObj(newTaskToArray);
      setEmptyInputClass('');
      setNewTask({ taskName: '' });
      setTaskToEdit({ taskName: '' });
      setSuccessMsg('¡Guardado con éxito!');
      setTimeout(() => {
        setSuccessMsg('');
      }, 1000);
    }
  };

  //This function marks the task as completed
  const toggleCompletedTask = (arrayIdTask) => {
    setAllChecked(false);
    if (!arrayIdTask) {
      console.log('error: no se encontró la tarea');
    } else {
      const tasksObjClone = tasksObj.map((task) => {
        if (arrayIdTask.includes(task.idTask)) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
            isChecked: false,
          };
        }
        return task;
      });
      setTasksObj(tasksObjClone);
    }
  };

  //This function modifies the 'checked' property of the 'task' object.
  const toggleCheckedTask = (arrayIdTask) => {
    const checkedTaskIndex = getIndexElementArray(arrayIdTask[0]);
    const taskObjClone = [...tasksObj];
    taskObjClone[checkedTaskIndex].isChecked =
      !taskObjClone[checkedTaskIndex].isChecked;
    setTasksObj(taskObjClone);
  };

  //Remove a task
  const deleteTask = (arrayTaskId) => {
    const cleanTaskObj = [...tasksObj];
    const tasksObjUpdate = cleanTaskObj.filter(
      (task) => !arrayTaskId.includes(task.idTask)
    );
    setTasksObj(tasksObjUpdate);
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

  return (
    <>
      <Header logoBlack={logoBlack} resetForm={resetForm} Link={Link} />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Landing Link={Link} logoWhite={logoWhite} />}
          />
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
                successMsg={successMsg}
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
                allChecked={allChecked}
                allCheckedFunction={allCheckedFunction}
                resetChecked={resetChecked}
                allCheckedBox={allCheckedBox}
              />
            }
          />
        </Routes>
      </main>
      <Footer
        logoBlack={logoBlack}
        plusIcon={plusIcon}
        Link={Link}
        resetForm={resetForm}
        listIcon={listIcon}
      />
    </>
  );
}

export default App;
