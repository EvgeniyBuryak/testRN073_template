
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpService from '~/services/http/MainHttpService';

interface AuthState {
  isAuthorized?: boolean;
  offerSpecial?: TOfferSpecial[];
}

const initialState: AuthState = {
  isAuthorized: undefined,
  offerSpecial: undefined,
};

export const receiveOfferSpecial = createAsyncThunk(
  'auth/receiveOfferSpecial',
  async () => {
    const response: TOfferSpecial[] = await HttpService.receiveOfferSpecial();
    return response;
  }
);

export const sendFrontTest = createAsyncThunk(
  'auth/sendFrontTest',
  async () => {
    const response: TFrontTest = await HttpService.sendFrontTest();
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action) => {
      state.isAuthorized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(receiveOfferSpecial.fulfilled, (state, action) => {
      state.offerSpecial = action.payload;
    })
  },
});

export const { setAuthorizationStatus } = authSlice.actions;
export default authSlice.reducer;
