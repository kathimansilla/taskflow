/* eslint-disable react/prop-types */

const Header = ({ logoBlack, Link, resetForm }) => {
  const handleLink = () => {
    resetForm();
  };

  return (
    <header className="header">
      <Link to="/" onClick={handleLink} className="header__link">
        <img className="header__link__logo" src={logoBlack} alt="Logo TaskFlow" />
        <h2 className="header__link__title">taskflow | Gestor de tareas</h2>
      </Link>
    </header>
  );
};

export default Header;
