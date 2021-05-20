import React, { useState, useEffect, Fragment } from 'react';

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('');
    } else {
      fetch('/api/user-list/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setEmail(data.email);
          setLoading(false);
        });

    }
  }, []);

  return (
    <div>
      {loading === false && (
        <Fragment>
          <h1>Dashboard</h1>
          <h2>Hello {email}!</h2>

        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;