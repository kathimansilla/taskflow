
const Landing = ({ Link, logo }) => {
  return (
    <section className="landing">
      <img className="landing__logo" src={logo} alt="Logo TaskFlow" />
      <h1 className="landing__title">taskflow | Gestor de tareas</h1><Link to="/NewTask" className="landing__link">
        añadir tarea
      </Link>
      <Link to="/TasksList" className="landing__link landing__link--2">
        lista de tareas
      </Link>
      <p className='landing__message'>Sitio en construcción ✨👩🏻‍💻</p>
    </section>
  );
};

export default Landing;
