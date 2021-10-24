import React, { useState } from "react";
import Row from "../../UI/Row";
import JoinFormHeader from "./JoinFormHeader";
import JoinFormBody from "./JoinFormBody";
import Button from "../../UI/Button";
import getCookie from "../getCookie";

import styles from "../Form.module.css";
import {Link} from "react-router-dom";

const JoinForm = (props) => {
  const [eventDetail, setEventDetail] = useState(props.eventDetail);
  const participants = eventDetail.users.map((user) => user.id);

  const [joined, setJoined] = useState(
    participants.includes(parseInt(localStorage.getItem("id")))
  );

  const joinEvent = async (event) => {
    event.preventDefault();
    const csrf_token = getCookie("csrftoken");
    const firstname = await fetch(
      `/api/user-detail/${localStorage.getItem("id")}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data.Users.firstname;
      });
    console.log(firstname);
    return fetch(
      `/api/join-meeting/?meeting_id=${eventDetail.id}&user_id=${parseInt(
        localStorage.getItem("id")
      )}`,
      {
        method: "POST",
        headers: {
          "X-CSRFToken": csrf_token,
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      eventDetail.users.push({
        id: parseInt(localStorage.getItem("id")),
        firstname: firstname,
      });
      setEventDetail(eventDetail);
      setJoined(true);
    });
  };

  const leaveEvent = async (event) => {
    event.preventDefault();
    const csrf_token = getCookie("csrftoken");
    return fetch(
      `/api/leave-meeting/?meeting_id=${eventDetail.id}&user_id=${parseInt(
        localStorage.getItem("id")
      )}`,
      {
        method: "POST",
        headers: {
          "X-CSRFToken": csrf_token,
          "Content-Type": "application/json",
        },
      }
    ).then((data) => {
      let index;
      eventDetail.users.forEach((element) => {
        if (element.id === parseInt(localStorage.getItem("id"))) {
          index = eventDetail.users.indexOf(element);
        }
      });
      eventDetail.users.splice(index, 1);
      setEventDetail(eventDetail);
      setJoined(false);
    });
  };

  return (
    <Row className={styles["form-control"]}>
      <form>
        <JoinFormHeader title={eventDetail.title} tags={eventDetail.tags} />

        <JoinFormBody eventDetail={eventDetail}></JoinFormBody>

        <Row>
          {localStorage.getItem("token") !== null && !joined && (
            <Button onClick={joinEvent} className={styles["btn-full-width"]}>
              Join Event
            </Button>
          )}
          {localStorage.getItem("token") !== null && joined && (
            <Button onClick={leaveEvent}>Leave Meeting</Button>
          )}
          {localStorage.getItem("token") === null && (
            <Button>Please, Login!</Button>
          )}
        </Row>
      </form>
    </Row>
  );
};

export default JoinForm;
