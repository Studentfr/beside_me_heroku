import React, { useState, useEffect } from "react";
import AutoComplete from "../../UI/AutoComplete";

import styles from "./css/CreateFormBody.module.css";

const CreateFormBody = (props) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch("/api/tag-list")
      .then((response) => response.json())
      .then(
        (allTags) => {
          setTags(allTags);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState("");
  const [isParticipant, setIsParticipant] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    resetAllStates();
  }, [props.clear]);

  const resetAllStates = () => {
    setTitle("");
    setParticipants("");
    setIsParticipant(false);
    setTime("");
  };

  const userStateHandler = () => {
    if (isParticipant === false) {
      setIsParticipant(true);
    } else {
      setIsParticipant(false);
    }
    props.onCheckboxChange(!isParticipant);
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
    props.onTitleChange(event.target.value);
  };

  const participantsChangeHandler = (event) => {
    setParticipants(event.target.value);
    props.onParticipantChange(event.target.value);
  };

  const timeChangeHandler = (event) => {
    setTime(event.target.value);
    props.onTimeChange(event.target.value);
  };

  const toLocalISO = (date) => {
    return (
      date.getFullYear().toString() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      date.getDate().toString().padStart(2, 0) +
      "T" +
      date.getHours().toString().padStart(2, 0) +
      ":" +
      date.getMinutes().toString().padStart(2, 0)
    );
  };

  const minTime = () => {
    return toLocalISO(new Date());
  };

  const maxTime = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return toLocalISO(date);
  };

  const tagChangeHandler = (newTagList) => {
    props.onTagsChange(newTagList);
  };

  return (
    <div className={styles.content}>
      <p>{props.error}</p>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        value={title}
        id="title"
        onChange={titleChangeHandler}
      />
      <label htmlFor="tagChoice">Tags</label>
      <AutoComplete
        items={tags}
        onTagChoice={tagChangeHandler}
        placeholder="Write a Tag"
        limit={3}
      />
      <label htmlFor="number">Number of participants</label>
      <input
        type="number"
        value={participants}
        id="number"
        onChange={participantsChangeHandler}
        min="2"
        max="20"
      />
      <label htmlFor="checkBox">Are you participant?</label>
      <input
        id="checkBox"
        type="checkbox"
        value={isParticipant}
        checked={isParticipant ? "checked" : ""}
        onChange={userStateHandler}
      />
      <label htmlFor="start-at">Starts At</label>
      <input
        type="datetime-local"
        id="start-at"
        min={minTime()}
        max={maxTime()}
        onChange={timeChangeHandler}
        value={time}
        required={true}
      />
    </div>
  );
};

export default CreateFormBody;
