const Modal = ({
  hiddenClass,
  taskNameToDelete,
  hiddenTag,
  phrasesObj,
}) => {
  //hiddenTag: if this is True, <p> is hidden, and if it's false, <button> is hidden

  //buttons to render
  const buttons = phrasesObj.map((phrase) => (
    <li ker={phrase.phrase}>
      <button
        className={`modal__container__buttons__btn ${phrase.classModifier} ${
          hiddenTag ? '' : 'tag--hidden'
        }`}
        onClick={phrase.event}
      >
        {phrase.phrase}
      </button>
    </li>
  ));

  return (
    <div className={`modal ${hiddenClass ? 'modal--hidden' : ''}`}>
      <div className="modal__container">
        <p
          className={`modal__container__title ${
            hiddenTag ? 'tag--hidden' : ''
          }`}
        >
          ¿Quiere eliminar {taskNameToDelete}?
        </p>
        <ul className="modal__container__buttons">{buttons}</ul>
      </div>
    </div>
  );
};

export default Modal;
