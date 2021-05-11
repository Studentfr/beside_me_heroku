import React, {Component} from "react";

import {render} from "@testing-library/react";
import {DomUtil as Cookies} from "leaflet/dist/leaflet-src.esm";

class Register extends Component
{
  //   constructor(props) {
  //   super(props);
  //   this.state = {
  //       firstname:'',
  //       lastname:'',
  //       username: '',
  //       password: '',
  //       photo: null,
  //   };
  //
  //   this.onImageChange = this.onImageChange.bind(this);
  // }

    state = {
    credentials: {firstname:'', lastname:'', username: '', password: '', photo:''}
  }
  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        photo: URL.createObjectURL(img)
      });
      console.log(img)
        console.log(URL.createObjectURL(img))
    }
  };






  register = event => {
    fetch('http://127.0.0.1:8000/api/users/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json())
    .then(
      data => {
        console.log(data.token);
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
        <h1>Register user </h1>
                <label>
          Firstname:
          <input type="text" name="firstname"
           value={this.state.credentials.firstname}
           onChange={this.inputChanged}/>
        </label>
        <br/>
         <label>
          Lastname:
          <input type="text" name="lastname"
           value={this.state.credentials.lastname}
           onChange={this.inputChanged}/>
        </label>
        <br/>
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
        #Image
       <div>
        <div>
          <div>
            <img src={this.state.credentials.photo} />
            <h1>Select Image</h1>
            <input type="file" name="photo"  onChange={ e => {this.onImageChange(); this.inputChanged(e) }} />
          </div>
        </div>
      </div>

        <button onClick={this.register}>Register</button>

      </div>

        );
    }
}

export default Register;
