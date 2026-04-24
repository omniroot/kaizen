import { IconSun } from "@tabler/icons-react";
import { ThemeSwitcher } from "@/kumi-ui/components/ThemeSwitcher.tsx";
import { HStack, Typo } from "@/kumi-ui/index.ts";
import { kumi } from "@/kumi-ui/kumi.ts";

export const Header = () => {
	// const isDaySelectOpen = useGlobalStore((store) => store.isDaySelectOpen);
	// const setDaySelectOpen = useGlobalStore((store) => store.setDaySelectOpen);

	return (
		<HStack
			// as={"header"}
			className={kumi({ paddingInline: "16px", paddingBlock: "16px" })}
			justify={"space-between"}
			align="center"
		>
			<HStack>
				<IconSun
					strokeWidth={"3px"}
					className={kumi({ width: "24px", height: "24px", marginLeft: "-2px" })}
				/>
				<Typo variant={"title"} size="lg">
					Kaizen
				</Typo>

				{/* <KaizenDivider w={"3px"} minH={"15px"} mr={"-14px"} /> */}

				{/* <Button variant={"ghost"} _icon={{ w: "24px", h: "24px" }}>
					<IconCalendar />
					<Typo>19 Jun</Typo>
				</Button> */}
			</HStack>
			<HStack>
				<ThemeSwitcher />
				{/* <Button variant={"ghost"} _icon={{ w: "24px", h: "24px" }}>
					<IconDatabase />
					<Typo>Import / Export</Typo>
				</Button> */}
			</HStack>
		</HStack>
		// <header className={styles.header}>
		//   <div className={styles.left}>
		//     <IconButton variant={"ghost"}>
		//       <IconList />
		//     </IconButton>
		//   </div>
		//   <div className={styles.center}>
		//     <Button
		//       variant={"ghost"}
		//       gap={"4px"}
		//       p={"12px 24px"}
		//       borderRadius={"full"}
		//       onClick={() => setDaySelectOpen(true)}
		//     >
		//       <Text fontWeight={"bold"} fontSize={"18px"}>
		//         Today
		//       </Text>
		//       <IconChevronDown
		//         style={{
		//           rotate: isDaySelectOpen ? "180deg" : "0deg",
		//           transition: "rotate 200ms",
		//         }}
		//       />
		//     </Button>
		//   </div>
		//   <div className={styles.right}>
		//     <IconButton variant={"ghost"}>
		//       <IconSettings />
		//     </IconButton>
		//   </div>
		// </header>
	);
};
