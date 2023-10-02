// eslint-disable-next-line react/prop-types
const Footer = ({ logo, Link, resetForm, plusIcon, listIcon }) => {

    const handleLink = (ev) => {
        resetForm();
      };
  
      return (
    <footer className="footer">
      <Link to="/NewTask" className="footer__link">
      <img className="footer__link__iconPlus" src={plusIcon} alt="Plus icon" />
      </Link>
      <Link to="/TasksList" className="footer__link">
      <img className="footer__link__iconPlus" src={listIcon} alt="List icon" />
      </Link>
      <Link to="/" onClick={handleLink} className="footer__link">
        <img className="footer__link__logo" src={logo} alt="Logo TaskFlow" />
      </Link>
    </footer>
  );
};

export default Footer;
