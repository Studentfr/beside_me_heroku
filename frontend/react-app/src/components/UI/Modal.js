import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import styles from "./Modal.module.css";

//TODO Make separate component
const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        {props.toFetch.map((item) => {
          return <p>{item}</p>;
        })}
      </div>
      <footer className={styles.actions}>
        <Button onClick={props.onConfirm}>Ok</Button>
      </footer>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onEventHandler} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          toFetch={props.data}
          onConfirm={props.onEventHandler}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
