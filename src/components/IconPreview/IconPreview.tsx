import { kaizenIcons } from "@/assets/icons.tsx";
import type { FC } from "react";

interface IProps {
  name: string;
}
export const IconPreview: FC<IProps> = ({ name }) => {
  const Icon = kaizenIcons.filter((icon) => icon.name === name)[0].icon;

  if (!Icon) return null;
  return Icon;
};
