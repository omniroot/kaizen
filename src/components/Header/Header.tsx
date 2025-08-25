import { useGlobalStore } from "@/stores/global.store.tsx";
import { Button, IconButton, Text } from "@chakra-ui/react";
import { IconChevronDown, IconList, IconSettings } from "@tabler/icons-react";
import styles from "./Header.module.css";

export const Header = () => {
  const isDaySelectOpen = useGlobalStore((store) => store.isDaySelectOpen);
  const setDaySelectOpen = useGlobalStore((store) => store.setDaySelectOpen);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <IconButton variant={"ghost"}>
          <IconList />
        </IconButton>
      </div>
      <div className={styles.center}>
        <Button
          w="100%"
          variant={"ghost"}
          size={"sm"}
          gap={"4px"}
          p={"12px 8px"}
          borderRadius={"12px"}
          onClick={() => setDaySelectOpen(true)}
          bg={{ _hover: "surface_container" }}
        >
          <Text fontWeight={"bold"} fontSize={"18px"}>
            Today
          </Text>
          <IconChevronDown
            style={{
              rotate: isDaySelectOpen ? "180deg" : "0deg",
              transition: "rotate 200ms",
            }}
          />
        </Button>
      </div>
      <div className={styles.right}>
        <IconButton variant={"ghost"}>
          <IconSettings />
        </IconButton>
      </div>
    </header>
  );
};
