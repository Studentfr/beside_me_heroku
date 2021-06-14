import React, { useState, useEffect } from 'react';
import "../../index.css"
import {DomUtil as Cookies} from "leaflet/dist/leaflet-src.esm";
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      // window.location.replace('/dashboard');
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      username: username,
      password: password
    };

    fetch('/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.token) {

          localStorage.clear();
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.user_id);
          window.location.replace('/dashboard');

        } else {
          setUsername('');
          setPassword('');
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div>
      {loading === false && <h1>Login</h1>}
      {errors === true && <h2>Cannot log in with provided credentials</h2>}
      {loading === false && (
        <form onSubmit={onSubmit}>
          <div className="form-group">
          <label htmlFor='username' >Email</label> <br />
          <input
            name='username'
            type='username'
            value={username}
            required
            onChange={e => setUsername(e.target.value)}
            className="form-control"  placeholder="Enter email"
          />{' '}
          </div>
          <br />
          <div className="form-group">
          <label htmlFor='password'>Password:</label> <br />
          <input
            name='password'
            type='password'
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            className="form-control"  placeholder="Enter password"
          />{' '}
          </div>
          <br />
          <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

          <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
        </form>
      )}
    </div>
  );
};

export default Login;