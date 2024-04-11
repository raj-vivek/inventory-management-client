import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../../utils/getAuthTokenFromCookie";
import getCurrentUserDetails from "../../utils/getCurrentUserDetails";
import logout from "../../utils/logout";

function Navbar() {
  const [dropMenu, setDropMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  console.log("nav");

  console.log(dropMenu);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoggedIn(isLoggedIn());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [loggedIn]);

  const user = getCurrentUserDetails();

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" className="link">
          <div className="left">
            <h1>Ava</h1>
            <span>Lady Shoppee</span>
          </div>
        </Link>
        <div className="right">
          {loggedIn && user ? (
            <div
              className="loggedIn"
              onMouseEnter={() => setDropMenu(true)}
              onMouseLeave={() => setDropMenu(false)}
            >
              <div className="userDetails">Hi, {user.firstName}!</div>
              <div className={dropMenu ? "dropMenu" : "dropMenu hidden"}>
                <span onClick={() => logout()}>logout</span>
              </div>
            </div>
          ) : (
            <>
              <Link to="/register" className="link">
                Register
              </Link>
              <Link to="/login" className="link loginButton">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
