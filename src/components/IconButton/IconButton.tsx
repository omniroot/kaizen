import { type ReactNode } from "@tabler/icons-react";
import type { FC } from "react";
import styles from "./IconButton.module.css";

interface IProps {
  children: ReactNode;
}
export const IconButton: FC<IProps> = ({ children }) => {
  return <button className={styles.icon_button}>{children}</button>;
};
