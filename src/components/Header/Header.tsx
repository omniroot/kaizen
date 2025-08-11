import { IconSettings } from "@tabler/icons-react";
import styles from "./Header.module.css";
import { IconButton } from "../IconButton/IconButton.tsx";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}></div>
      <div className={styles.center}>
        <span>Today</span>
      </div>
      <div className={styles.right}>
        <IconButton>
          <IconSettings />
        </IconButton>
      </div>
    </header>
  );
};
