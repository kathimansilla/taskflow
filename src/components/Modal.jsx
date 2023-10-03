const Modal = ({ hiddenClass, deleteTask, idTaskToDelete, switchHiddenClass, taskNameToDelete, resetForm }) => {
    //functions
    const handleConfirmDelete = () => {
      console.log(idTaskToDelete);
        deleteTask(idTaskToDelete);
        switchHiddenClass();
    };
    const handleCancelDelete = () => {
        switchHiddenClass();
        resetForm();
    };

  return (
    <div className={`modal ${hiddenClass ? 'modal--hidden' : ''}`}>
      <div className='modal__container'>
        <p className='modal__container__title'>¿Quiere eliminar {taskNameToDelete}?</p>
        <div className='modal__container__buttons'>
          <button className='modal__container__buttons__btn modal__container__buttons__btn--1' onClick={handleConfirmDelete}>Eliminar</button>
          <button className='modal__container__buttons__btn' onClick={handleCancelDelete}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
