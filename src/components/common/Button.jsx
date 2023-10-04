const Button = ({ onClick, disabled, src, alt, classBtn, classImg }) => {

    return (
        <button
          className={classBtn}
          onClick={onClick}
          disabled={disabled}
        >
          <img
            src={src}
            alt={alt}
            className={classImg}
          />
        </button>
    );
};

export default Button;