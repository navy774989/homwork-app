import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getTags } from "../apis/getTags";
import { TagItemProps } from "../apis/types/TagProps";

export const OnTagSelect = createAction<{ itemIdx: number }>("ON_TAG_SELECT");
export const fetchTags = createAsyncThunk("FETCH_TAGS", async () => {
  const response = await getTags();
  return response.data;
});

interface TagsState {
  tags: TagItemProps[];
  selectedTag: TagItemProps | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  tags: [],
  selectedTag: null,
  loading: "idle",
} as TagsState;

// Then, handle actions in your reducers:
const tags = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTags.rejected, () => {});
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags = action.payload.items;
      state.selectedTag = action.payload.items[0];
      state.loading = "succeeded";
    });
    builder.addCase(fetchTags.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(OnTagSelect, (state, action) => {
      if (Array.isArray(state.tags)) {
        state.selectedTag = state.tags[action.payload.itemIdx];
      }
    });
  },
});
export { tags };
