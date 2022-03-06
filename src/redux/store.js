import { configureStore } from "@reduxjs/toolkit";
import { studentsSlice } from "./slices/studentsSlice";
import { booksSlice } from "./slices/booksSlice";

export const store = configureStore({
  reducer: {
    students: studentsSlice.reducer,
    books: booksSlice.reducer,
  },
});
