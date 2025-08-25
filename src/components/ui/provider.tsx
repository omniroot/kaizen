"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { theme } from "~/theme/index.ts";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={theme}>
      <ColorModeProvider {...props} defaultTheme="dark" />
    </ChakraProvider>
  );
}
