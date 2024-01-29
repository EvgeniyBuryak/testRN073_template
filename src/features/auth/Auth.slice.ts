
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpService from '~/services/http/MainHttpService';

interface AuthState {
  isAuthorized?: boolean;
}

const initialState: AuthState = {
  isAuthorized: undefined,
};

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async () => {
    const response = await HttpService.getServices();
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action) => {
      state.isAuthorized = action.payload;
    },
  }
});

export const { setAuthorizationStatus } = authSlice.actions;
export default authSlice.reducer;
