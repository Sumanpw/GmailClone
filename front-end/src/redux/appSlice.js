import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    open: false,
    user: null, // User is initially null, set when authenticated
    emails: [],
    selectedEmail: null,
    searchText: "",
    logoutSuccess: false, // Track logout success state
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setEmails: (state, action) => {
      state.emails = action.payload;
    },
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    logoutUser: (state) => {
      state.user = null; // Clear user data on logout
      state.logoutSuccess = true; // Mark that logout was successful
    },
    resetLogoutSuccess: (state) => {
      state.logoutSuccess = false; // Reset the success message after a short delay
    },
  },
});

export const {
  setOpen,
  setAuthUser,
  setEmails,
  setSelectedEmail,
  setSearchText,
  logoutUser,
  resetLogoutSuccess,
} = appSlice.actions;

export default appSlice.reducer;
