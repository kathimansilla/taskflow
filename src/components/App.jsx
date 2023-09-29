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
  const [newTask, setNewTask] = useState({});
  const [emptyInputClass, setEmptyInputClass] = useState('');

  //functions
  const newTaskObj = (keyName, value) => {
    setIdTask(idTask + 1);
    const newData = {
      ...newTask,
      [keyName]: value,
      idTask: idTask,
      isCompleted: false,
    };
    setNewTask(newData);
  };

  /*con esta función se guarda la tarea en el Array de tareas y en localstorage y DDBB y se indica la clase que valida si los inputs están completados o no*/
  const saveTask = () => {
    console.log(newTask);
    if (newTask.taskName === '' || newTask.taskName === undefined) {
      setEmptyInputClass('emptyInput');
    } else {
      const newTaskToArray = [...tasksObj, newTask];
      setTasksObj(newTaskToArray);
      setEmptyInputClass('');
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

  //Por ahora está funcionando con taskName en lugar de taskId
  const deleteTask = (taskId) => {
    console.log(taskId);
    const cleanTaskObj = tasksObj.filter((task) => task.taskName !== taskId);
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
              <Form Link={Link} newTaskObj={newTaskObj} saveTask={saveTask} emptyInputClass={emptyInputClass} />
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
