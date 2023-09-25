'use client';

import { createSelector, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = 'error set';
    },
  },
});

export const { setUserData, setError } = userSlice.actions;

export default userSlice.reducer;

// selectors

export const selectUser = createSelector(
  (state) => state.user,
  (user) => user
);
