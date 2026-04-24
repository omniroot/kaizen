import { kaizenIcons } from "@/assets/icons.tsx";
import { IconPreview } from "@/components/IconPreview/IconPreview.tsx";
import { Tooltip } from "@/components/ui/tooltip.tsx";
import {
  CloseButton,
  Drawer,
  HStack,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react";
import { type FC } from "react";

interface IProps {
  value: string;
  onChange: (newValue: string) => void;
  selectedColor?: string;
  w?: string;
  h?: string;
}

export const IconPicker: FC<IProps> = ({
  value,
  onChange,
  selectedColor,
  w = "32px",
  h = "32px",
}) => {
  const onImageClick = (newIcon: string) => {
    onChange(newIcon);
  };

  return (
    <Drawer.Root placement={"bottom"}>
      <Drawer.Trigger asChild>
        <IconButton
          w={w}
          h={h}
          bg={selectedColor}
          color={"black"}
          borderRadius={"12px"}
        >
          <IconPreview name={value} />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop zIndex={"1000000"} backdropFilter={"blur(5px)"} />
        <Drawer.Positioner zIndex={"2000000"}>
          <Drawer.Content
            bg={"surface"}
            borderRadius={"24px"}
            boxShadow={"none"}
            animationDuration={"400ms"}
          >
            <Drawer.Header justifyContent={"center"}>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Create
              </Text>
              <Drawer.CloseTrigger asChild>
                <CloseButton />
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body p={"12px"}>
              {/* <tabler */}
              <HStack w="100%" wrap={"wrap"}>
                {kaizenIcons.map(({ icon, name }) => {
                  const isSelected = name === value;
                  return (
                    <Tooltip content={name}>
                      <HStack
                        w={"52px"}
                        h={"52px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        borderRadius={"18px"}
                        bg={"surface_container"}
                        borderWidth={isSelected ? "2px" : "0px"}
                        borderColor={selectedColor}
                        onClick={() => onImageClick(name)}
                        cursor={"pointer"}
                        transition={"border 200ms"}
                      >
                        {icon}
                      </HStack>
                    </Tooltip>
                  );
                })}
              </HStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
