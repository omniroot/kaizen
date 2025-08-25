import { IconHeart, IconCup } from "@tabler/icons-react";
import type { ReactNode } from "react";

interface IKaizenIcon {
  name: string;
  icon: ReactNode;
}

export const kaizenIcons: IKaizenIcon[] = [
  {
    name: "Heart",
    icon: <IconHeart />,
  },
  {
    name: "Cup",
    icon: <IconCup />,
  },
];
