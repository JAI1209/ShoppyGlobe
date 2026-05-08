// redux/searchSlice.js
// Manages the global search query state

import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
  },
  reducers: {
    // Update the search query string
    setSearchQuery(state, action) {
      state.query = action.payload;
    },

    // Clear the search field
    clearSearch(state) {
      state.query = '';
    },
  },
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;

// Selectors
export const selectSearchQuery = (state) => state.search.query;

export default searchSlice.reducer;
