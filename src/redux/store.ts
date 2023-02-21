import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import questions from "./reducers/questions";
import { search } from "./reducers/search";
import { tags } from "./reducers/tags";
export const store = configureStore({
  reducer: {
    tags: tags.reducer,
    questions: questions.reducer,
    search: search.reducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
