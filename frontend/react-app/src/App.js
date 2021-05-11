import React, {useState} from "react";
import "./App.css";
import Map from "./components/map/Map";
import Login from "./components/user/login";
import Register from "./components/user/register";






const App = () => {


    const [token, setToken] = useState('');

    const userLogin = (tok) => {
        setToken(tok);
        console.log(tok)
    }

  return (
    <div className="App">
      {/*<Map></Map>;*/}
         <Login userLogin={userLogin}/>
         <Register />
    </div>


  );
};

export default App;
