import { createSlice } from '@reduxjs/toolkit';

const initialState = { name: '', number: '' };

const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    changeFilter: (state, action) => {
      const { name, number } = action.payload;
      state.name = name;
      state.number = number;
    },
  },
});

export const { changeFilter } = filtersSlice.actions;
export const selectNameFilter = (state) => state.filters.name;
export const selectNumberFilter = (state) => state.filters.number;
export default filtersSlice.reducer;