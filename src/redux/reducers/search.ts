import { createAction, createSlice } from "@reduxjs/toolkit";
export const setQuery = createAction<string>("SET_QUERY");
interface SearchState {
  query: string;
}

const initialState = {
  query: "",
} as SearchState;

// Then, handle actions in your reducers:
const search = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setQuery, (state, action) => {
      state.query = action.payload;
    });
  },
});
export { search };
