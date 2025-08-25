import { HStack, Link } from "@chakra-ui/react";
import { IconHome, IconList, type ReactNode } from "@tabler/icons-react";

interface ILink {
  icon: ReactNode;
  name: string;
  path: string;
}

const links = [
  { icon: <IconHome />, name: "Home", path: "/" },
  { icon: <IconList />, name: "Tasks", path: "/tasks" },
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
  // const [isCurrent] = useRoute(item.path);

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
      asChild
    >
      <Link href={item.path}>{item.icon}</Link>
    </HStack>
  );
};
