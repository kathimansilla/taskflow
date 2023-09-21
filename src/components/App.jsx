import { useState } from 'react';
import '../styles/App.css';
import Header from './Header';
import Landing from './Landing';
import Form from './Form';
import TaskList from './TaskList';
import Footer from './Footer';
import '../styles/App.css';
import { Route, Routes, Link } from 'react-router-dom';
import logo from '../assets/images/logo-taskflow.svg';



function App() {
  // state variables
  const [tasksObj, setTasksObj] = useState([]);
  const [taskListEmpty, setTaskListEmpty] = useState(true);


  const newTaskObj = (keyName, value) => {
    setTasksObj(
      [{[keyName]: value}]
    );
  };


  /*Para agregar nuevas tareas. Clonar: setTasksObj(...tasksObj, {[taskName], value});*/

  //esta función va a fallar porque no hay taskId aún
  const deleteTask = (taskId) => {
    console.log(taskId);
    const cleanTaskObj = tasksObj.filter(task => task.taskId !== taskId);
    setTasksObj(cleanTaskObj);
    console.log(cleanTaskObj);
  }

  return (
    <>
      <Header logo={logo} />
      <main>
        <Routes>
        <Route path='/' element={<Landing Link={Link} logo={logo} />} />
        <Route path='/NewTask' element={<Form Link={Link} newTaskObj={newTaskObj} />} />
        <Route path='/TasksList' element={<TaskList Link={Link} tasksObj={tasksObj} deleteTask={deleteTask} taskListEmpty={taskListEmpty} />} />
        </Routes>
      </main>
      <Footer logo={logo} />
    </>
  );
}

export default App;
