import styles from "./SelectedTags.module.css";

const SelectedTags = (props) => {
  return (
    <div className={styles["selected-items__flex"]}>
      {props.selectedTags.map((item) => (
        <div
          className={styles["selected-items__item"]}
          onClick={() => props.onDelete(item)}
        >
          {item.title}
          <div className={styles["selected-items__svg"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedTags;
