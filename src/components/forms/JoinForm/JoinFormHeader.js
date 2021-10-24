import React from "react";
import styles from "./JoinFormHeader.module.css";

const JoinFormHeader = (props) => {
  return (
    <>
      <h3>{props.title}</h3>
      <div className={styles["flex-row"]}>
        {props.tags.map((tag) => {
          return (
            <div key={tag.id} className={styles.tag}>
              #{tag.title}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default JoinFormHeader;
