import React, {Component} from "react";

import {render} from "@testing-library/react";
import {DomUtil as Cookies} from "leaflet/dist/leaflet-src.esm";
import AutoComplete from "../UI/AutoComplete";

class Register extends Component
{


    state = {
    credentials: {firstname:'', lastname:'', email: '', password: '', photo: null, groups: [], user_permissions: [], tags: []}
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
    fetch('/api/users/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    // .then( data => data.json())
    // .then(
    //   data => {
    //     console.log(data.token);
        .then(res => res.json())
        .then(data => {
            if (data.key) {
                localStorage.clear();
                localStorage.setItem('token', data.key);
                window.location.replace('/dashboard');
            }
        }
    )
    .catch( error => console.error(error))
  }
  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
  }
  //   tagChangeHandler = (newTagList) => {
  //   props.onTagsChange(newTagList);
  // };

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
          Email:
          <input type="text" name="email"
           value={this.state.credentials.email}
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
            <input type="file" name="photo"  value={this.state.credentials.photo} onChange={this.onImageChange} />
          </div>
        </div>
      </div>
                <br/>
                <label>

                    Select tag:

                </label>
                <AutoComplete
                 items={[{id:1, title:"ggbet"},{id:2, title:"Daxak"}]}

                    placeholder="Write a Tag"
                 limit={3}
                />
                <br/>
        <button onClick={this.register}>Register</button>

      </div>

        );
    }
}

export default Register;
