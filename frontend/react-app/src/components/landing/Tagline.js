import background from "./img/back.jpg";
import styles from "./Tagline.module.css";

const Tagline = () => {
  return (
    <div className={styles.container}>
      <div className={styles.photo}></div>
      <div className={styles["tag-1"]}>Socialize yourself</div>
      <div className={styles["tag-2"]}>Don't Get Lost</div>
    </div>
  );
};

export default Tagline;
