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
  const [tasksObj, setTasksObj] = useState([]);
  const [newTask, setNewTask] = useState({});

  //functions
  //con esta función se ve un preview
  const newTaskObj = (keyName, value) => {
    const newData = {...newTask, [keyName]: value };
    setNewTask(newData);
    console.log(newTask);
  };

  //con esta función se guarda la tarea en el Array de tareas y en localstorage y DDBB
  const saveTask = () => {
    const newTaskToArray = [...tasksObj, newTask];
    setTasksObj(newTaskToArray);
      //save in DDBB
  };

  useEffect(() => {
    ls.set('data', tasksObj)
  }, [tasksObj]);

  //Por ahora está funcionando con taskName en lugar de taskId
  const deleteTask = (taskId) => {
    console.log(taskId);
    const cleanTaskObj = tasksObj.filter(task => task.taskName !== taskId);
    setTasksObj(cleanTaskObj);
    ls.remove(taskId);
  }

  return (
    <>
      <Header logo={logo} />
      <main>
        <Routes>
        <Route path='/' element={<Landing Link={Link} logo={logo} />} />
        <Route path='/NewTask' element={<Form Link={Link} newTaskObj={newTaskObj} saveTask={saveTask} />} />
        <Route path='/TasksList' element={<TaskList Link={Link} tasksObj={tasksObj} deleteTask={deleteTask} />} />
        </Routes>
      </main>
      <Footer logo={logo} />
    </>
  );
}

export default App;
