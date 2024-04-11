import "./Register.scss";

function Register() {
  return (
    <div className="register">
      <div className="container">
        <h2>Register</h2>

        <form action="">
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" />
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </form>
      </div>
    </div>
  );
}

export default Register;
