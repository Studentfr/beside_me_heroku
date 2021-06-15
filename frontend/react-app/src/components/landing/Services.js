import styles from "./Services.module.css";
import ServiceBox from "./ServiceBox";

const Services = () => {
  return (
    <div className={styles.container}>
      <div className={styles["grid-inter"]}>
        <ServiceBox
          identificator="access"
          header_text="Accessible"
          text="Everywhere, anytime, for everybody"
        />
      </div>
      <div className={styles["grid-inter"]}>
        <ServiceBox
          identificator="comm"
          header_text="Growing Comminity"
          text="Invite and be invited"
        />
      </div>
      <div className={styles["grid-inter"]}>
        <ServiceBox
          identificator="impact"
          header_text="Social Impact"
          text="Socialize, grow, and have fun"
        />
      </div>
    </div>
  );
};

export default Services;
