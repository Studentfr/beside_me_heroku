import React, { useEffect, useState } from "react";
import Row from "../../UI/Row";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

const JoinFormBody = (props) => {
  const [data, setData] = useState();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    console.log(new Date(props.eventDetail.start_at));
    setDate(new Date(props.eventDetail.start_at));
  }, []);

  const showUsersModal = () => {
    console.log(props.eventDetail.users);
    setData({ users: props.eventDetail.users });
  };

  const eventHandler = () => {
    setData(null);
  };

  return (
    <Row>
      {data && (
        <Modal
          title={"Participant List"}
          data={data.users}
          onEventHandler={eventHandler}
        />
      )}
      <p>Headman</p>
      <p>
        <a href="#">{props.eventDetail.headman.firstname}</a>
      </p>
      <p>Start At: {date.toLocaleString()}</p>
      <Row>
        <Button onClick={showUsersModal}>Show Users</Button>
      </Row>
    </Row>
  );
};

export default JoinFormBody;
