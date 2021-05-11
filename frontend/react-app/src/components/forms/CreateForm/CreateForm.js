import React, { useState } from "react";
import Row from "../../UI/Row";
import Button from "../../UI/Button";
import styles from "../Form.module.css";
import ReactDOM from "react-dom";
import { useEffect } from "react";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
};

const ModalCreate = (props) => {
  const createEvent = (event) => {
    event.preventDefault();
    console.log(props.eventDetail.id);
  };

  //   const [tags, setTags] = useState([]);

  //   useEffect(() => {
  //     fetch("api/tag-list")
  //       .then((response) => response.json())
  //       .then(
  //         (tags) => {
  //           setTags(tags);
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //   }, []);

  const tags = [
    { id: 1, title: "hello" },
    { id: 2, title: "Gachi" },
  ];

  return (
    <form className={styles["create-form"]} onSubmit={createEvent}>
      <Row>
        <header className={styles.header}>
          <h2>Create Event</h2>
        </header>
        <div className={styles.content}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
          <div>
            {tags.map((tag) => {
              return <p key={tag.id}>#{tag.title}</p>;
            })}
          </div>
          <label htmlFor="number">Number of participants</label>
          <input type="number" id="number" />
          <label htmlFor="start-at">Starts At</label>
          <input type="datetime-local" id="start-at" />
        </div>
        <footer className={styles.actions}>
          <Button type="submit">Create Event</Button>
        </footer>
      </Row>
    </form>
  );
};

const CreateForm = (props) => {
  return (
    <Row className={styles["form-control"]}>
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
