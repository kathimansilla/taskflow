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
import plusIcon from '../assets/images/plus-solid.svg';
import listIcon from '../assets/images/list-solid.svg';
import ls from '../services/ls';

function App() {
  // state variables
  const [idTask, setIdTask] = useState(0);
  const [tasksObj, setTasksObj] = useState(ls.get('data', []));
  const [newTask, setNewTask] = useState({ taskName: '' });
  const [emptyInputClass, setEmptyInputClass] = useState('');
  const [taskToEdit, setTaskToEdit] = useState({ taskName: '', edit: false });

  //generals functions
  const getElementArray = (taskId) => {
    return tasksObj.find((task) => task.idTask === taskId);
  };

  const getIndexElementArray = (taskId) => {
    return tasksObj.findIndex((task) => task.idTask === taskId);
  };

  //specific functions
  const resetForm = (indexTaskToEdit) => {
    setTaskToEdit({ taskName: '', edit: false });
    setNewTask({ taskName: '' });
    setEmptyInputClass('');

    const updateTaskObj = [...tasksObj];
      updateTaskObj[indexTaskToEdit].edit =
        !updateTaskObj[indexTaskToEdit].edit;
        updateTaskObj[indexTaskToEdit].isChecked =
        !updateTaskObj[indexTaskToEdit].isChecked;
        setTasksObj(updateTaskObj);
        console.log(updateTaskObj);
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
    console.log(taskToEditLocal); 
    const taskEditTrue = { ...taskToEditLocal, edit: true, isChecked: false };
    console.log(taskEditTrue);
    setTaskToEdit(taskEditTrue);

    const updateTaskObj = [...tasksObj];
      updateTaskObj[IndexTaskToEditLocal].edit =
        !updateTaskObj[IndexTaskToEditLocal].edit;
        setTasksObj(updateTaskObj);
        console.log(updateTaskObj);
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
      console.log('estoy en if');
      setEmptyInputClass('emptyInput');
    } else if (taskToEdit.edit) {
      console.log('estoy en if edit');
      if (taskToEdit.taskName === '') {
        console.log('estoy en if edit if empty');
        setEmptyInputClass('emptyInput');
      } else {
        console.log('estoy en if edit else');
        const taskToEditClone = { ...taskToEdit, edit: false };
        const taskObjClone = [...tasksObj];
        const indexTaskToEdit = getIndexElementArray(taskToEdit.idTask);
        taskObjClone.splice(indexTaskToEdit, 1, taskToEditClone);
        setTasksObj(taskObjClone);
        setEmptyInputClass('');
        setTaskToEdit({ taskName: ''});
        setNewTask({ taskName: '' });
        //save in DDBB
      }
    } else {
      console.log('estoy en else');
      setIdTask(idTask + 1);
      const newTaskWhitId = { ...newTask, idTask: idTask };
      const newTaskToArray = [...tasksObj, newTaskWhitId];
      setTasksObj(newTaskToArray);
      setEmptyInputClass('');
      setNewTask({ taskName: '' });
      setTaskToEdit({ taskName: ''});
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
        updateTaskObj[completedTaskIndex].isChecked =
        !updateTaskObj[completedTaskIndex].isChecked;
      setTasksObj(updateTaskObj);
    }
  };

  //con esta función se modifica la propiedad checked del objeto task
  const toggleCheckedTask = (idTask) => {
    console.log('toggleCheckedTask');
    const checkedTaskIndex = getIndexElementArray(idTask);
    const taskObjClone = [ ...tasksObj  ];
    console.log(taskObjClone);
    taskObjClone[checkedTaskIndex].isChecked = !taskObjClone[checkedTaskIndex].isChecked;
    setTasksObj(taskObjClone);
    console.log(taskObjClone);
    console.log(checkedTaskIndex);
    console.log(tasksObj);
  };

  //useEffect
  useEffect(() => {
    ls.set('data', tasksObj);
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
    console.log(taskId);
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
                Link={Link}
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
                Link={Link}
                tasksObj={tasksObj}
                deleteTask={deleteTask}
                toggleCompletedTask={toggleCompletedTask}
                getTaskToEdit={getTaskToEdit}
                toggleCheckedTask={toggleCheckedTask}
                getIndexElementArray={getIndexElementArray}
                getElementArray={getElementArray}
              />
            }
          />
        </Routes>
      </main>
      <Footer logo={logo} plusIcon={plusIcon} Link={Link} resetForm={resetForm} listIcon={listIcon} />
    </>
  );
};

export default App;
