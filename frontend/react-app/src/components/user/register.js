import React, { useEffect, useState } from "react";
import AutoComplete from "../UI/AutoComplete";
import { DomUtil as Cookies } from "leaflet/dist/leaflet-src.esm";

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
      // window.location.replace('/dashboard');
    } else {
      setLoading(false);
    }
  }, []);

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
    <div>
      {loading === false && <h1>Register</h1>}
      {errors === true && <h2>Cannot register with provided credentials</h2>}
      <form onSubmit={onSubmit}>
        <label htmlFor="firstname">Firstname</label> <br />
        <input
          name="firstname"
          type="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />{" "}
        <br />
        <label htmlFor="lastname">Lastname</label> <br />
        <input
          name="lastname"
          type="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />{" "}
        <br />
        <label htmlFor="email">Email address:</label> <br />
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />{" "}
        <br />
        <label htmlFor="password">Password:</label> <br />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />{" "}
        <br />
        <label>Select tag:</label>
        <AutoComplete
          items={tags}
          onTagChoice={tagChangeHandler}
          placeholder="Write a Tag"
          limit={3}
        />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
