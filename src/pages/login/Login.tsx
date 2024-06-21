import { useState } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

import newAxiosRequest from "../../utils/newAxiosRequest";
import "./Login.scss";

// type CustomError = {
//   status: string;
//   message: string;
// };

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const persistLoginAndUserDetails = (response: AxiosResponse) => {
    const authToken = response.headers.authorization.replace("Bearer ", "");
    newAxiosRequest.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${authToken}`;

    // document.cookie = `accessToken=${jwt}; Secure; SameSite=Strict; HttpOnly;`;
    document.cookie = `accessToken=${authToken};`;

    const userObject = { ...response.data };
    const jsonString = JSON.stringify(userObject);
    localStorage.setItem("user", jsonString);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email == "" || password == "") {
      setError("Enter username and/or password");
      return;
    }

    const response = await newAxiosRequest.post("/auth/login", {
      email,
      password,
    });

    if (response.status === 200) {
      persistLoginAndUserDetails(response);
      navigate("/");
    } else {
      // Handle error, maybe set an error state or display a message
      console.error("Login failed:", response.data);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p>{error}</p>
      </div>
    </div>
  );
}

export default Login;
