import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "../app/globals.css";
import { AudioSourceProvider } from "./_providers/AudioSourceProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AudioSourceProvider>
      <App />
    </AudioSourceProvider>
  </StrictMode>
);
