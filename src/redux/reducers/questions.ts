import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import { getQuestions } from "../apis/getQuestions";
import { QuestionProps } from "../apis/types/QuestionsProps";

export const fetchQuestions = createAsyncThunk(
  "FETCH_QUESTIONS",
  async ({ q, tags }: { q?: string; tags?: string; page?: number }) => {
    const response = await getQuestions({ q: q, tags: tags });
    return response.data;
  }
);
interface QuestionsState {
  questions: QuestionProps[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: QuestionsState = {
  questions: [],
  loading: "idle",
};

const questions = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.rejected, (state) => {
      state.loading = "failed";
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      // Add user to the state array

      state.questions = action.payload.items;
      state.loading = "succeeded";
    });
    builder.addCase(fetchQuestions.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.questions = [];
      }

      state.loading = "pending";
    });
  },
});
export default questions;
