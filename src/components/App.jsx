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
import ls from '../services/ls';

function App() {
  // state variables
  const [idTask, setIdTask] = useState(0);
  const [tasksObj, setTasksObj] = useState([]);
  const [newTask, setNewTask] = useState({ taskName: '' });
  const [emptyInputClass, setEmptyInputClass] = useState('');
  const [taskToEdit, setTaskToEdit] = useState({ taskName: '', edit: false });

  //functions
  const editTask = (keyName, value) => {
    const editData = {
      ...taskToEdit,
      [keyName]: value,
    };
    setTaskToEdit(editData);
    console.log(editData);
  };

  const getTaskToEdit = (taskId) => {
    const taskToEditLocal = tasksObj.find((task) => task.idTask === taskId);
    const taskEditTrue = { ...taskToEditLocal, edit: true };
    setTaskToEdit(taskEditTrue);
  };


  const newTaskObj = (keyName, value) => {
    const newData = {
      ...newTask,
      [keyName]: value,
      idTask: idTask,
      isCompleted: false,
      edit: false,
    };
    setNewTask(newData);
  };

  /*con esta función se guarda la tarea en el Array de tareas y en localstorage y DDBB y se indica la clase que valida si los inputs están completados o no*/
  const saveTask = () => {
    if ((newTask.taskName === '' || newTask.taskName === undefined) && !taskToEdit.edit) {
      setEmptyInputClass('emptyInput');
    } else if (taskToEdit.edit) {
      const taskObjClone = [...tasksObj];
      const indexTaskToEdit = taskObjClone.findIndex((task) => task.idTask === taskToEdit.idTask);
      taskObjClone.splice(indexTaskToEdit, 1, taskToEdit);
      setTasksObj(taskObjClone);
      setEmptyInputClass('');
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
    const completedTaskIndex = tasksObj.findIndex(
      (task) => task.idTask === idTask
    );
    if (completedTaskIndex === -1) {
      console.log('error: no se encontró la tarea');
    } else {
      const updateTaskObj = [...tasksObj];
      updateTaskObj[completedTaskIndex].isCompleted =
        !updateTaskObj[completedTaskIndex].isCompleted;
      setTasksObj(updateTaskObj);
    }
  };

  //useEffect
  useEffect(() => {
    ls.set('data', tasksObj);
  }, [tasksObj]);

  //Eliminar tarea
  const deleteTask = (taskId) => {
    console.log(taskId);
    const cleanTaskObj = tasksObj.filter((task) => task.idTask !== taskId);
    setTasksObj(cleanTaskObj);
    ls.remove(taskId);
  };

  return (
    <>
      <Header logo={logo} />
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
              />
            }
          />
        </Routes>
      </main>
      <Footer logo={logo} />
    </>
  );
}

export default App;
