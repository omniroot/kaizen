import { Outlet } from "@tanstack/react-router";
import { GlobalTabsSelect } from "@/components/GlobalTabsSelect.tsx";
import { VStack } from "@/kumi-ui/index.ts";
import { kumi } from "@/kumi-ui/kumi.ts";

export const HomePage = () => {
	return (
		<VStack
			className={kumi({
				// width: "100%",
				gap: "16px",
				transition: "width 200ms, padding 200ms",
				"@media screen and (min-width:961px)": {
					width: "480px",
				},
				"@media screen and (max-width:960px)": {
					width: "80%",
					// paddingInline: "8px",
				},
				"@media screen and (max-width:460px)": {
					width: "100%",
					paddingInline: "16px",
				},
			})}
		>
			<GlobalTabsSelect />
			<Outlet />
		</VStack>
	);
};
