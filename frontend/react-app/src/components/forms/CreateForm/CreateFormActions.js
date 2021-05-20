import React from "react";
import Button from "../../UI/Button";

import styles from "./css/CreateFormActions.module.css";

const CreateFormActions = () => {
  return (
    <footer className={styles.actions}>
      <Button type="submit">Create Event</Button>
    </footer>
  );
};

export default CreateFormActions;
