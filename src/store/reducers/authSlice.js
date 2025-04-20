import { postLogin } from '@services/authentication/login.api';
import Const from '@utils/constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';
import { storage } from '@utils/storage';

const initialState = {
  userState: {},
  accessToken: '',
  baseURL: '',
  baseTagName: '',
};
export const login = createAsyncThunk('authSlice/login', async (params) => {
  const response = await postLogin(params);
  return response;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload.accessToken;
    },
    resetAccessToken: (state) => {
      state.accessToken = '';
      Keychain.resetGenericPassword({ service: Const.SERVICE_ACCESS_TOKEN });
    },
    setBaseUrl: (state, { payload }) => {
      state.baseURL = payload;
    },
    setBaseTagName: (state, { payload }) => {
      state.baseTagName = payload;
    },
    updateUserAction: (state, { payload }) => {
      state.userState = payload;
    },
    resetUserAction: (state, { payload }) => {
      state.userState = {
        signIn: false,
        logout: true,
        userToken: null,
        isRemember: payload?.isRemember,
        userData: {
          avatar: '',
          email: '',
          name: '',
          userid: '',
          sessionid: '',
          issuperuser: '',
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      if (payload?.access_token) {
        state.userState = { ...payload.data, signIn: true };
        state.accessToken = payload?.access_token;
        storage.set(Const.KEY_USER_TOKEN, payload?.access_token);
        Keychain.setGenericPassword('accessToken', payload?.access_token, {
          service: Const.SERVICE_ACCESS_TOKEN,
        });
      }
    });
  },
});

export const {
  setAccessToken,
  resetAccessToken,
  setBaseUrl,
  updateUserAction,
  resetUserAction,
  setBaseTagName,
} = authSlice.actions;

export default authSlice.reducer;
