import Button from '../common/Button';
import Modal from '../common/Modal';
import { useState } from 'react';

const TaskItem = ({ task, handleSelectedTask, handleCheckedTask, menuDotsVertical }) => {
  //state variable
  const [hiddenClassMenu, setHiddenClassMenu] = useState(true);
  const classMenuTask = 'classMenuTask';

  //functions
  const handleClickMenuTask = (ev) => {
    ev.preventDefault();
    setHiddenClassMenu(false);
  };

  const handleCloseMenuTask = (ev) => {
    ev.preventDefault();
    setHiddenClassMenu(true);
  };

  const phrasesObj = [
    {phrase: 'Importante y Urgente',
    event: handleCloseMenuTask,
    classModifier: ''},
    {phrase: 'Urgente',
    event: handleCloseMenuTask,
    classModifier: ''},
    {phrase: 'Mover ⬆',
    event: handleCloseMenuTask,
    classModifier: ''},
    {phrase: 'Mover ⬇',
    event: handleCloseMenuTask,
    classModifier: ''}
  ];

    return (
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
        <Button src={menuDotsVertical} alt="Menu dots vertical icon" disabled={false} onClick={handleClickMenuTask} classBtn='item__nameTask__menu' classImg='' />
        <Modal hiddenClass={hiddenClassMenu} hiddenTag={true} phrasesObj={phrasesObj} classMenuTask={classMenuTask} />
      </div>
    );
};

export default TaskItem;