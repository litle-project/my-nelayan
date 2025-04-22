import { configureStore } from "@reduxjs/toolkit";
import snakebar from "./snakebar";

export const store = configureStore({
  reducer: {
    snakebar,
  },
});
