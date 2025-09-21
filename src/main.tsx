import { router } from "@/pages/router.tsx";
import { OmnikitProvider } from "@/theme/components/provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/styles.css";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: 20000, // Настраиваем задержку перед повторной попыткой (в миллисекундах)
      staleTime: 5 * 60 * 1000, // Время, в течение которого данные считаются свежими
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <OmnikitProvider>
        <RouterProvider router={router} />
      </OmnikitProvider>
    </QueryClientProvider>
  </StrictMode>
);
