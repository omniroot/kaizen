import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "@/router.tsx";
import "./styles/styles.css";
import { tanstackQueryClient } from "@/api/api.ts";
import { KumiUIProvider } from "@/kumi-ui/components/Provider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={tanstackQueryClient}>
			<KumiUIProvider>
				<RouterProvider router={router} />
			</KumiUIProvider>
			{/* <OmnikitProvider defaultTheme="light"> */}
			{/* </OmnikitProvider> */}
		</QueryClientProvider>
	</StrictMode>,
);
