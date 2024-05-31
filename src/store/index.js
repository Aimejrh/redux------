import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlice";
import ThemeSlice from "./slices/ThemeSlice";

const store = configureStore({
  reducer: {
    todos: todoSlice,
    theme: ThemeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
