const Button = ({ onClick, disabled, src, alt }) => {

    return (
        <button
          className="taskListSection__buttons__button"
          onClick={onClick}
          disabled={disabled}
        >
          <img
            src={src}
            alt={alt}
            className="taskListSection__buttons__button__icon"
          />
        </button>
    );
};

export default Button;