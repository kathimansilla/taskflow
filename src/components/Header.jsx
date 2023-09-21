/* eslint-disable react/prop-types */

const Header = ( { logo }) => {

    return (
        <header className='header'>
           <img className='header__logo' src={logo} alt="Logo TaskFlow" />
        </header>
    );
};

export default Header;