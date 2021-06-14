import React, { useState, useEffect, Fragment } from 'react';

const Dashboard = () => {
  // const [email, setEmail] = useState('');
  // const [firstname, setFirstname] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

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
          <h2>Hello {user.email}!</h2>
          <h3>{user.firstname}</h3>

        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;