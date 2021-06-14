import React, { useState, useEffect } from "react";
import { DomUtil as Cookies } from "leaflet/dist/leaflet-src.esm";
import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      window.location.replace("/dashboard");
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    fetch("/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.clear();
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.user_id);
          window.location.replace("/dashboard");
        } else {
          setUsername("");
          setPassword("");
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div className={styles.container}>
      {loading === false && <h1 className={styles["h1-text"]}>Welcome</h1>}
      {errors === true && <h2>Cannot log in with provided credentials</h2>}
      {loading === false && (
        <form onSubmit={onSubmit} className={"login-form"}>
          <input
            className={styles["login-form__input"]}
            type="text"
            name="username"
            type="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email"
          />
          <input
            className={styles["login-form__input"]}
            name="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className={styles["login-form__button"]}
            type="submit"
            id="login-button"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
