import clsx from "clsx";
import styles from "./Checkbox.module.css";
import { useState, type FC } from "react";
import { IconCheck } from "@tabler/icons-react";

interface IProps {
  className?: string;
  defaultChecked?: boolean;
}
export const Checkbox: FC<IProps> = ({ className, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  const _class = clsx(styles.checkbox, className);
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        checked={checked}
        onClick={toggleChecked}
        className={styles.orig}
      />
      <div className={_class} onClick={toggleChecked} data-checked={checked}>
        <IconCheck size={18} className={styles.icon} />
      </div>
    </div>
  );
};
