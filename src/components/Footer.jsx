
// eslint-disable-next-line react/prop-types
const Footer = ( {logo} ) => {

    return (
        <footer className='footer'>
            <img className='footer__logo' src={logo} alt="Logo TaskFlow" />
        </footer>
    );
};

export default Footer;