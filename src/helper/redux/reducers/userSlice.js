import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  id: null,
  err: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.err = null;
    },
    logoutUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.err = null;
      localStorage.removeItem("user");
    },
    setErr(state, action) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.err = action.payload.err;
    },
  },

 
});

export const { logoutUser, setUser, setErr } = userSlice.actions;
export default userSlice.reducer;
