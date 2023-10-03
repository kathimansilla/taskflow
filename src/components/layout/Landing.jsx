const Landing = ({ logoWhite }) => {
  return (
    <section className="landing">
      <img className="landing__logo" src={logoWhite} alt="Logo TaskFlow" />
      <h1 className="landing__title">taskflow | Gestor de tareas</h1>
      <p className="landing__message">Sitio en construcción ✨👩🏻‍💻</p>
    </section>
  );
};

export default Landing;
