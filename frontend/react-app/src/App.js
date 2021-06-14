import React, { useState } from "react";
import "./App.css";
import Map from "./components/map/Map";
import Login from "./components/user/Login";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./components/user/Register";
import Navbar from "./components/user/Navbar";
import Dashboard from "./components/user/Dashboard";

// const [token, setToken] = useState('');
//
// const userLogin = (tok) => {
//     setToken(tok);
//     console.log(tok)
// }

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="outer">
          <div className="inner">
            <Switch>
              <Route path="/auth" component={Login} exact />
              <Route path="/api/users/" component={Register} exact />
              <Route path="/dashboard" component={Dashboard} exact />
            </Switch>
          </div>
        </div>
      </div>
    </Router>

    // <>
    //   <Map></Map>
    // </>
  );
};

export default App;
