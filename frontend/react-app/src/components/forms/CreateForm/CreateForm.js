import React, { useState } from "react";
import Row from "../../UI/Row";
import ReactDOM from "react-dom";
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
    tags: [],
    start_time: "",
    isParticipant: false,
  });

  const [formError, setFormError] = useState(null);

  const proccedEventCreation = () => {
    const csrf_token = getCookie("csrftoken");

    //Need to delete before testing with token
    localStorage.setItem("id", 2);

    const sendingData = {
      tags: formData.tags,
      headman: parseInt(localStorage.getItem("id")),
      title: formData.title,
      participants: formData.participants,
      start_at: formData.start_time.substring(0, 19) + "Z",
      longitude: props.latlong.lng,
      latitude: props.latlong.lat,
      is_expired: false,
      users: [
        formData.isParticipant ? parseInt(localStorage.getItem("id")) : null,
      ],
    };

    console.log(sendingData);

    //Uncomment to work with the database
    // console.log(JSON.stringify(sendingData));
    return fetch("/api/meeting-create/", {
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
    if (
      parseInt(formData.participants, 10) < 2 ||
      formData.participants === ""
    ) {
      setFormError("Participants number must be > 2");
      return;
    }
    if (new Date(formData.start_time) < new Date()) {
      console.log("HELLO");
      return;
    }
    if (formData.tags.length < 1) {
      setFormError("You must select at least 1 tag");
      return;
    }
    setFormError(null);
    proccedEventCreation();
    props.onConfirm();
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
    setFormData((prevState) => {
      return { ...prevState, start_time: new Date(enteredTime).toISOString() };
    });
  };

  const isParticipantHandler = (isParticipantChoice) => {
    setFormData((prevState) => {
      return { ...prevState, isParticipant: isParticipantChoice };
    });
  };

  const tagsHandler = (newTaglist) => {
    setFormData((prevState) => {
      return { ...prevState, tags: newTaglist.map((item) => item.id) };
    });
  };

  return (
    <form
      autoComplete="off"
      className={createForm_styles["create-form"]}
      onSubmit={createEvent}
    >
      <Row>
        <CreateFormHeader />
        <CreateFormBody
          onTitleChange={titleHandler}
          onParticipantChange={participantHandler}
          onTimeChange={startTimeHandler}
          onCheckboxChange={isParticipantHandler}
          onTagsChange={tagsHandler}
          error={formError}
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
          <ModalCreate
            latlong={props.coordinates}
            onConfirm={props.onEventHandler}
          />,
          document.getElementById("overlay-root")
        )}
      </>
    </Row>
  );
};

export default CreateForm;
