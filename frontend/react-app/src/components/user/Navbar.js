import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true);
    }
  }, []);

  const handleLogout = e => {
    e.preventDefault();

     localStorage.clear();
      setIsAuth(false);
      window.location.replace('/');
  };

  return (
       <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/auth/"}>Beside Me</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">

        {isAuth === true ? (
          <Fragment>
            {' '}
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <Link to='/' onClick={handleLogout}>Logout</Link>
            </li>
               <li>
              <Link to='/event_map' >Map</Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            {' '}
            <li>
              <Link to='/auth/'>Login</Link>
            </li>
            <li>
              <Link to='/api/users/'>Register</Link>
            </li>
          </Fragment>
        )}
      </ul>


          </div>
        </div>
      </nav>
    // <nav>
    //
    //   <ul>
    //     {isAuth === true ? (
    //       <Fragment>
    //         {' '}
    //         <li>
    //           <Link to='/dashboard'>Dashboard</Link>
    //         </li>
    //         <li>
    //           <Link to='/' onClick={handleLogout}>Logout</Link>
    //         </li>
    //       </Fragment>
    //     ) : (
    //       <Fragment>
    //         {' '}
    //         <li>
    //           <Link to='/auth/'>Login</Link>
    //         </li>
    //         <li>
    //           <Link to='/api/users/'>Register</Link>
    //         </li>
    //       </Fragment>
    //     )}
    //   </ul>
    // </nav>
  );
};

export default Navbar;