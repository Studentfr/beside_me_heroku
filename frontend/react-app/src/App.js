import React, {useState} from "react";
import "./App.css";
import Map from "./components/map/Map";
import Login from "./components/user/login";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from "./components/user/register";
import Navbar from "./components/user/Navbar";
import Dashboard from "./components/user/Dashboard";






const App = () => {


    // const [token, setToken] = useState('');
    //
    // const userLogin = (tok) => {
    //     setToken(tok);
    //     console.log(tok)
    // }

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/auth/' component={Login} exact />
          <Route path='/api/users/' component={Register} exact />
          {/*<Route path='/logout' component={Logout} exact />*/}
          <Route path='/dashboard' component={Dashboard} exact />
        </Switch>
      </Router>
    </div>
    // <div className="App">
    //   {/*<Map></Map>;*/}
    //      <Login userLogin={userLogin}/>
    //      <Register />
    // </div>


  );
};

export default App;
