import React, { useState } from "react";
import Row from "../../UI/Row";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

const JoinFormBody = (props) => {
  const [data, setData] = useState();

  const showUsersModal = () => {
    setData({ users: props.eventDetail.users });
  };

  const eventHandler = () => {
    setData(null);
  };

  return (
    <Row>
      {data && <Modal onEventHandler={eventHandler} />}
      <p>Headman</p>
      <p>
        <a href="#">{props.eventDetail.headman.firstname}</a>
      </p>
      <Button onClick={showUsersModal}>Show users</Button>
    </Row>
  );
};

export default JoinFormBody;
