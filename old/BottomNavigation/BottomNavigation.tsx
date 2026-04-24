import { HStack } from "@chakra-ui/react";
import {
  IconHome,
  IconList,
  IconUser,
  type ReactNode,
} from "@tabler/icons-react";
import { Link, useLocation } from "@tanstack/react-router";

interface ILink {
  icon: ReactNode;
  name: string;
  path: string;
}

const links = [
  { icon: <IconHome />, name: "Today", path: "/" },
  { icon: <IconList />, name: "Tasks", path: "/tasks" },
  { icon: <IconUser />, name: "Profile", path: "/profile" },
];

export const BottomNavigation = () => {
  return (
    <HStack w={"100%"}>
      {links.map((link) => {
        return <NavItem item={link} />;
      })}
    </HStack>
  );
};

const NavItem = ({ item }: { item: ILink }) => {
  const isCurrent = useLocation().pathname === item.path;

  return (
    <HStack
      // color={isCurrent ? "text" : "subtext"}
      bg={{ _hover: "surface_container" }}
      w={"100%"}
      h={"100%"}
      p={"12px"}
      borderRadius={"12px"}
      transition={"background 200ms, color 200ms"}
      justifyContent={"center"}
      cursor={"pointer"}
      textDecor={"none"}
      asChild
    >
      <Link to={item.path}>
        {item.icon} {isCurrent && item.name}
      </Link>
    </HStack>
  );
};
