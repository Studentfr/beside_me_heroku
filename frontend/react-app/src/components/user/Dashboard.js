import React, { useState, useEffect, Fragment } from 'react';
import styles from "../user/Dashboard.module.css";
import {Link} from "react-router-dom";

const Dashboard = () => {
  // const [email, setEmail] = useState('');
  // const [firstname, setFirstname] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [own, setOwned] = useState({});
  const [joint, setJoined] = useState({});

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('');
    } else {
      fetch(`/api/user-detail/${localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUser(data.Users)
          setOwned(data.Owned_meetings)
          setJoined(data.Joined_meetings)
          setLoading(false);
        });

    }
  }, []);

  return (
    <div>
      {loading === false && (

        <Fragment>
          <div className={styles["fragment"]}>
            <div className={styles["centrality"]}>
          <Link to="/dashboard"><h1 className={styles["h1"]}>Dashboard</h1></Link>
            <div className={styles["info"]}>
           <Link to="/dashboard">
             <img className={styles["photo"]}
                src={"https://drainbrain.com/app/uploads/2017/04/profile-icon-png-898.png"}></img></Link>

              <div className={styles["main-info"]}>
              <h3 className={styles["h3"]}>Hello {user.firstname}!</h3>
              <h3>Your email: {user.email}</h3>
            </div>
            </div>

            <h2>My owned events:</h2>
            <div className={styles["container"]}>
            {own.map((item, i) => {
             return <div className={styles["child"]}>
               <p key={i}><h4>{item.title}</h4>

                 <h4>Participants:</h4>
                 <ul>
                {item.users.map((item2, j) => {
                  return <li key={j}>{item2.firstname}</li>
                })}</ul>
                 <h4>Starting time:</h4>
               {new Date(item.start_at).toLocaleString()}</p>
             </div>
            })}
          </div>

          <h2>My joined events:</h2>
          <div className={styles["container"]}>
            {joint.map((item, i) => {
              return <div className={styles["child"]}>
                <p key={i}><h4>{item.title}</h4>
              <h4>Participants number:</h4> {item.participants}
              <h4>Starting time:</h4> <br/>
              {new Date(item.start_at).toLocaleString()}</p>
              </div>
            })}
            </div>
          </div>
            </div>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;