import { createRoot } from "react-dom/client";
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import "./index.css";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "./components/ui/theme-provider";
import "@fontsource/inter";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="college-bball-theme">
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
