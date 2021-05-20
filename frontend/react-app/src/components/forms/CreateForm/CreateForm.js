import React, { useState } from "react";
import Row from "../../UI/Row";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import CreateFormHeader from "./CreateFormHeader";
import getCookie from "../getCookie";

import default_styles from "../Form.module.css";
import createForm_styles from "./css/CreateForm.module.css";
import CreateFormBody from "./CreateFormBody";
import CreateFormActions from "./CreateFormActions";

const Backdrop = (props) => {
  return (
    <div className={createForm_styles.backdrop} onClick={props.onConfirm} />
  );
};

const ModalCreate = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    participants: "",
    start_time: "",
    isParticipant: false,
  });

  const resetData = () => {
    setFormData({
      title: "",
      participants: "",
      start_time: "",
      isParticipant: false,
    });
    setClear(clear + 1);
  };

  const [formError, setFormError] = useState(null);
  const [clear, setClear] = useState(0);

  // useEffect(() => {
  //   fetch("api/tag-list")
  //     .then((response) => response.json())
  //     .then(
  //       (tags) => {
  //         setTags(tags);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }, []);
  const proccedEventCreation = () => {
    /*
    {
    "title": "Chess",
    "participants": 2,
    "start_at": "2021-05-08T14:22:08Z",
    "longitude": 40.0,
    "latitude": 50.0,
    "is_expired": false,
    "headman": 5,
    "tags": [1],
    "users": []
}
    */

    const csrf_token = getCookie("csrftoken");

    const sendingData = {
      tags: [1, 2],
      headman: 1,
      title: formData.title,
      participants: 5,
      start_at: formData.start_time.substring(0, 19) + "Z",
      longitude: 54.8968,
      latitude: 69.13245,
      is_expired: false,
      users: [2],
    };
    console.log(JSON.stringify(sendingData));
    return fetch("http://127.0.0.1:8000/api/meeting-create/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrf_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendingData),
    }).then((data) => data.json());
  };

  const createEvent = (event) => {
    event.preventDefault();
    if (formData.title.length <= 5) {
      setFormError("Title length must be > 5");
      return;
    }
    if (parseInt(formData.participants, 10) < 2) {
      setFormError("Participants number must be > 2");
      return;
    }
    if (new Date(formData.start_time) < new Date()) {
      console.log("HELLO");
      return;
    }
    setFormError(null);
    console.log(formData);
    proccedEventCreation();
    resetData();
  };

  const titleHandler = (enteredTitle) => {
    setFormData((prevState) => {
      return { ...prevState, title: enteredTitle };
    });
  };

  const participantHandler = (enteredParticipants) => {
    setFormData((prevState) => {
      return { ...prevState, participants: parseInt(enteredParticipants, 10) };
    });
  };

  const startTimeHandler = (enteredTime) => {
    console.log(new Date(enteredTime).toLocaleString());
    setFormData((prevState) => {
      return { ...prevState, start_time: new Date(enteredTime).toISOString() };
    });
  };

  const isParticipantHandler = (isParticipantChoice) => {
    setFormData((prevState) => {
      return { ...prevState, isParticipant: isParticipantChoice };
    });
  };

  return (
    <form className={createForm_styles["create-form"]} onSubmit={createEvent}>
      <Row>
        <CreateFormHeader />
        <CreateFormBody
          onTitleChange={titleHandler}
          onParticipantChange={participantHandler}
          onTimeChange={startTimeHandler}
          onCheckboxChange={isParticipantHandler}
          error={formError}
          clear={clear}
        />
        <CreateFormActions />
      </Row>
    </form>
  );
};

const CreateForm = (props) => {
  return (
    <Row className={default_styles["form-control"]}>
      <>
        {ReactDOM.createPortal(
          <Backdrop onConfirm={props.onEventHandler} />,
          document.getElementById("backdrop-root")
        )}
        {ReactDOM.createPortal(
          <ModalCreate latlong={props.coordinates} />,
          document.getElementById("overlay-root")
        )}
      </>
    </Row>
  );
};

export default CreateForm;
