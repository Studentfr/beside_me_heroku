import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsAuth(true);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.clear();
    setIsAuth(false);
    window.location.replace("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link className="navbar-brand" to={"/"}>
          Beside Me
        </Link>
      </div>
      <div className={styles.right}>
        <ul className={styles["nav_list"]}>
          {isAuth === true ? (
            <Fragment>
              {" "}
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              {" "}
              <li>
                <Link to="/auth/">Login</Link>
              </li>
              <li>
                <Link to="/api/users/">Register</Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
