import React, {Component} from "react";

import {render} from "@testing-library/react";
import {DomUtil as Cookies} from "leaflet/dist/leaflet-src.esm";

class Login extends Component
{
    state = {
    credentials: {username: '', password: ''}
  }
  login = event => {
    fetch('/auth/', {
      method: 'POST',
      headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json())
    .then(
      data => {
        this.props.userLogin(data.token);
      }
    )
    .catch( error => console.error(error))
  }


  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
  }

    render()
    {
        return (
            <div>
        <h1>Login user </h1>
     <label>
          Username:
          <input type="text" name="username"
           value={this.state.credentials.username}
           onChange={this.inputChanged}/>
        </label>
        <br/>
        <label>
          Password:
          <input type="password" name="password"
           value={this.state.credentials.password}
           onChange={this.inputChanged} />
        </label>
        <br/>
        <button onClick={this.login}>Login</button>


      </div>

        );
    }
}

export default Login;
