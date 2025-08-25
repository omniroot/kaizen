import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "@/components/ui/provider.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/pages/router.tsx";

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
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
