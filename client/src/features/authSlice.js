// import create slice from redux toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create async thunk
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/auth/me");
      return res.data.data;
    } catch (err) {
      if (
        err.response?.status === 401 &&
        err.response?.data?.message === "Unauthorized: No token provided"
      ) {
        return null; // no error, no user
      }
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // singout
    signout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    // start signin
    signinStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // signin success
    signinSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    // signin failure
    signinFailure: (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        if (
          action.payload === "Unauthorized" ||
          action.payload === "No token provided"
        ) {
          state.user = null;
          state.loading = false;
          state.error = null; 
        } else {
          // for other errors, show error message
          state.user = null;
          state.loading = false;
          state.error = action.payload;
        }
      });
  },
});

// export actions
export const { signout, signinStart, signinSuccess, signinFailure } =
  authSlice.actions;

// export reducer
export default authSlice.reducer;
