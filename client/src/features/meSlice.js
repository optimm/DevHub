import { createSlice } from "@reduxjs/toolkit";

const meSlice = createSlice({
  name: "me",
  initialState: {
    isAuthenticated: false,
    myData: {},
  },
  reducers: {
    authenticateMe: (state, action) => {
      if (action?.payload?.isAuthenticated) {
        state.isAuthenticated = true;
        state.myData = { ...action.payload.data };
      } else {
        state.isAuthenticated = false;
        state.myData = {};
      }
    },
  },
});

export const { authenticateMe } = meSlice.actions;

export default meSlice.reducer;
