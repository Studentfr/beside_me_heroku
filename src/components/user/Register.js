import React, { useEffect, useState } from "react";
import AutoComplete from "../UI/AutoComplete";
import { DomUtil as Cookies } from "leaflet/dist/leaflet-src.esm";
import styles from "./Register.module.css";

const Register = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [groups, setGroups] = useState([]);
  const [user_permissions, setUser_permissions] = useState([]);
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);

  const tagChangeHandler = (newTagList) => {
    setSelectedTags(newTagList.map((item) => item.id));
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tag-list")
      .then((response) => response.json())
      .then(
        (allTags) => {
          setTags(allTags);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
       window.location.replace('/dashboard');
    } else {
      setLoading(false);
    }
  }, []);

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        photo: URL.createObjectURL(img)
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      photo: photo,
      groups: groups,
      user_permissions: user_permissions,
      tags: selectedTags,
    };

    fetch("/api/user-create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.clear();
          localStorage.setItem("token", data.token);
          window.localStorage.setItem("id", data.id);
          window.location.replace("/dashboard");
        } else {
          setFirstname("");
          setLastname("");
          setEmail("");
          setPassword("");
          setPhoto(null);
          setGroups([]);
          setUser_permissions([]);
          setTags([]);
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div className={styles.container}>
      {loading === false && <h1 className={styles["h1-text"]}>Register</h1>}
      {errors === true && <h2>Cannot register with provided credentials</h2>}
      <form onSubmit={onSubmit} className={"register-form"}>
        <input
            className={styles["register-form__input"]}
          name="firstname"
          type="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
            placeholder="Firstname"
        />
        <input
            className={styles["register-form__input"]}
          name="lastname"
          type="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
            placeholder="Lastname"
        />
        <input
            className={styles["register-form__input"]}
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
            placeholder="Email"
        />
        <input
            className={styles["register-form__input"]}
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
            placeholder="Password"
        />

        <AutoComplete
          className = {styles["register-form__input"]}
          items={tags}
          onTagChoice={tagChangeHandler}
          placeholder="Write a Tag"
          limit={3}
        />


            <h1>Select Image</h1>
            <input className={styles["register-form__input"]}
                   type="file"
                   name="myImage"
                   onChange={onImageChange} />


                   <button className={styles["register-form__button"]}
                   type="submit" >
                Register
            </button>
      </form>
    </div>
  );
};

export default Register;
