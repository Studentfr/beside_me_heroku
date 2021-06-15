import styles from "./ServiceBox.module.css";

const ServiceBox = (props) => {
  return (
    <div className={`${styles["service-box"]}  ${styles[props.identificator]}`}>
      <div className={styles["service-box__text"]}>
        <h4>{props.header_text}</h4>
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default ServiceBox;
