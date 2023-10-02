/* eslint-disable react/prop-types */

const Header = ({ logo, Link, resetForm }) => {
  const handleLink = (ev) => {
    resetForm();
  };

  return (
    <header className="header">
      <Link to="/" onClick={handleLink} className="header__link">
        <img className="header__link__logo" src={logo} alt="Logo TaskFlow" />
        <h2 className="header__link__title">taskflow | Gestor de tareas</h2>
      </Link>
    </header>
  );
};

export default Header;
