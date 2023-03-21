import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload;
    },
    removeMessage(state) {
      state.message = "";
    },
  },
});

export const { removeMessage, setMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
