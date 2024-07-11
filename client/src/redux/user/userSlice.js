import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  profileImage: null,
  userQuery: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Success: (state, action) => {
      state.currentUser = action.payload;
    },
    Fail: (state) => {
      state.currentUser = null;
    },
    UploadSuccess: (state, action) => {
      state.profileImage = action.payload;
    },
    UploadFail: (state) => {
      state.profileImage = null;
    },
    DeleteSuccess: (state ) => {
      state.profileImage = null;
      state.currentUser = null;
    },
    SignOutSuccess: (state) => {
      state.profileImage = null;
      state.currentUser = null;
    },
    SetQuery: (state,action)=>{
      state.userQuery = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { Success, Fail, UploadSuccess, UploadFail, DeleteSuccess,SignOutSuccess,SetQuery } =
  userSlice.actions;

export default userSlice.reducer;
