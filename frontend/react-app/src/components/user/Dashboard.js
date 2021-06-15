import React, { useState, useEffect, Fragment } from 'react';

const Dashboard = () => {
  // const [email, setEmail] = useState('');
  // const [firstname, setFirstname] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [own, setOwn] = useState({});
  const [joint, setJoint] = useState({});

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
          setOwn(data.Owned_meetings)
          setJoint(data.Joined_meetings)
          // setEmail(data.Users.email);
          // setFirstname(data.Users.firstname)
          setLoading(false);
        });

    }
  }, []);

  return (
    <div>
      {loading === false && (
        <Fragment>
          <h1>Dashboard</h1>
          <h3>Hello {user.firstname}!</h3>
          <h3>Your email: {user.email}</h3>
            <h3>My owned events:</h3>
            {own.map((item, i) => {
              return <p key={i}>{item.title}<br/>
              Participants:
                {item.users.map((item2, j) => {
                  return <li key={j}>{item2.firstname}</li>
                })}
              Starting time: {new Date(item.start_at).toLocaleString()}</p>
            })}
            <h3>My joined events:</h3>
            {joint.map((item, i) => {
              return <p key={i}>{item.title}<br/>
              Participants number: {item.participants}<br/>
              Starting time: {new Date(item.start_at).toLocaleString()}</p>
            })}
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;