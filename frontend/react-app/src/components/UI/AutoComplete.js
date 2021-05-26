import React, { useState } from "react";
import SelectedTags from "../UI/SelectedTags";

import styles from "./AutoComplete.module.css";

const AutoComplete = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const autoComplete = (event) => {
    const value = event.target.value;
    let locSuggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      locSuggestions = props.items
        .sort((a, b) => (a.title > b.title ? 1 : -1))
        .filter(
          (tag) =>
            regex.test(tag.title) &&
            !selectedTags.some((selectedTag) => selectedTag.id === tag.id)
        );
    }
    setSuggestions(locSuggestions);
    setInputText(value);
  };

  const suggestionSelected = (id) => (event) => {
    const value = event.target.innerHTML;
    const tagObject = { id: id, title: value };
    setInputText("");
    setSuggestions([]);
    setSelectedTags((prevState) => [...prevState, tagObject]);
    props.onTagChoice([...selectedTags, tagObject]);
  };

  const deleteFromSelectedTags = (tag) => {
    setSelectedTags((prevState) =>
      prevState.filter((item) => item.id !== tag.id)
    );
    props.onTagChoice(selectedTags.filter((item) => item.id !== tag.id));
  };

  const renderSuggestions = () => {
    return (
      <ul>
        {suggestions.map((item) => (
          <li key={item.id} onClick={suggestionSelected(item.id)}>
            {item.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles["autocomplete-text"]}>
      <label htmlFor="tagChoice">Tags</label>
      <input
        id="tagChoice"
        type="text"
        placeholder={
          selectedTags.length >= props.limit
            ? "Only 3 tags are available"
            : props.placeholder
        }
        value={inputText}
        onChange={autoComplete}
        disabled={selectedTags.length >= props.limit}
      />
      {suggestions.length != 0 && renderSuggestions()}
      {selectedTags.length != 0 && (
        <SelectedTags
          selectedTags={selectedTags}
          onDelete={deleteFromSelectedTags}
        />
      )}
    </div>
  );
};

export default AutoComplete;
