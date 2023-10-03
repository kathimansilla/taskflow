const TaskItem = ({ task, handleSelectedTask, handleCheckedTask }) => {

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
      </div>
    );
};

export default TaskItem;