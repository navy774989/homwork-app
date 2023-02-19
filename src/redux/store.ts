import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import questions from "./reducers/questions";
import { tags } from "./reducers/tags";
export const store = configureStore({
  reducer: {
    tags: tags.reducer,
    questions: questions.reducer,
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
