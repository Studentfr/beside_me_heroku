import React from "react";
import Row from "../../UI/Row";
import JoinFormHeader from "./JoinFormHeader";
import JoinFormBody from "./JoinFormBody";
import Button from "../../UI/Button";
import styles from "./JoinFrom.module.css";

const JoinForm = (props) => {
  const joinEvent = (event) => {
    event.preventDefault();
    console.log(props.eventDetail.id);
  };

  return (
    <Row className={styles["form-control"]}>
      <form onSubmit={joinEvent}>
        <JoinFormHeader
          title={props.eventDetail.title}
          tags={props.eventDetail.tags}
        />
        <JoinFormBody eventDetail={props.eventDetail}></JoinFormBody>
        <Button type="submit">Join Event</Button>
      </form>
    </Row>
  );
};

export default JoinForm;
