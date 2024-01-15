import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    selectedBrandFilters: [],
    selectedModelFilters: [],
  },
  reducers: {
    setBrandFilters: (state, action) => {
      state.selectedBrandFilters = action.payload;
    },
    setModelFilters: (state, action) => {
      state.selectedModelFilters = action.payload;
    },
  },
});

export const { setBrandFilters, setModelFilters } = filtersSlice.actions;
export const selectFilters = (state) => state.filters;
export default filtersSlice.reducer;
