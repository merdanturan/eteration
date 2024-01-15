import { createSlice } from '@reduxjs/toolkit';

const sortSlice = createSlice({
  name: 'sort',
  initialState: 'dateAsc',
  reducers: {
    setSortValue: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSortValue } = sortSlice.actions;
export const selectSortValue = (state) => state.sort;
export default sortSlice.reducer;
