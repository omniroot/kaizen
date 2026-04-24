import { Tabs } from "@base-ui/react";
import { IconBook, IconListCheck, IconRepeat } from "@tabler/icons-react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { type FC, useEffect, useState } from "react";
import { HStack, Typo } from "@/kumi-ui/index.ts";
import { kumi } from "@/kumi-ui/kumi.ts";

type Props = {};

export const GlobalTabsSelect: FC<Props> = ({}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [value, setValue] = useState(
		location.pathname.split("/").reverse()[0] ?? "overview",
	);

	useEffect(() => {
		setValue(location.pathname.split("/").reverse()[0] ?? "overview");
	}, [location.pathname]);

	useEffect(() => {
		navigate({ to: `/${value}` });
	}, [value]);

	const tabStyle = kumi({
		borderRadius: "21px",
		width: "100%",
		border: "none",
		minHeight: "100%",
		paddingInline: "16px",
		paddingBlock: "8px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: "4px",
		backgroundColor: "transparent",
		color: "text-low",
		transition: "color 150ms",

		"& svg": {
			width: "20px",
			height: "20px",
		},

		// zIndex: -1,
		"&[data-active]": {
			color: "on-primary",
			// backgroundColor: "primary",
		},
	});

	return (
		<HStack w="100%" align="center">
			{/* {value} */}
			<Tabs.Root
				className={kumi({ width: "100%", height: "fit-content" })}
				value={value}
				onValueChange={(v) => setValue(v)}
				// defaultValue={value}
			>
				<Tabs.List
					className={kumi({
						width: "100%",
						height: "fit-content",
						display: "flex",
						justifyContent: "space-between",
						backgroundColor: "surface-high",
						padding: "4px",
						// paddingBlock: "4px",
						// paddingInline: "2px",
						borderRadius: "21px",
						position: "relative",
						zIndex: 0,
					})}
				>
					<Tabs.Tab className={tabStyle} value="overview">
						<IconBook />
						<Typo>Overview</Typo>
					</Tabs.Tab>
					<Tabs.Tab className={tabStyle} value="habits">
						<IconRepeat />
						<Typo>Habits</Typo>
					</Tabs.Tab>
					<Tabs.Tab className={tabStyle} value="tasks">
						<IconListCheck />
						<Typo>Tasks</Typo>
					</Tabs.Tab>
					<Tabs.Indicator
						className={kumi({
							// display: "none",
							backgroundColor: "primary",
							position: "absolute",
							zIndex: -1,
							top: "50%",
							translate: "calc(var(--active-tab-left) - 4px) -50%",
							width: "var(--active-tab-width)",
							height: "var(--active-tab-height)",
							// height: "40px",
							borderRadius: "21px",
							transition: "translate 150ms, width 150ms, height 150ms",
						})}
					/>
				</Tabs.List>
			</Tabs.Root>
		</HStack>
	);
};
