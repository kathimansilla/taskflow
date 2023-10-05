import Button from '../common/Button';
import Modal from '../common/Modal';

const TaskItem = ({ task, handleSelectedTask, handleCheckedTask, menuDotsVertical }) => {

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
        <Button src={menuDotsVertical} alt="Menu dots vertical icon" disabled='false' onClick='' classBtn='item__nameTask__menu' classImg='' />
      </div>
    );
};

export default TaskItem;