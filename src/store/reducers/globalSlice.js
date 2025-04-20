/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Color } from '@theme/colors';

const initialState = {
  isLoading: false,
  isConnected: true,
  language: 'vn',
  appColor: {
    base_color: Color.base_color,
  },
  dialogWarning: {
    isShowModalWarn: false,
    isSigout: false,
    titleHeader: '',
    keyHeader: '',
    keyMessage: '',
    contentMessage: '',
    isShowCancel: true,
    isShowSubmit: true,
    keyCancel: '',
    keySubmit: '',
  },
  paramsTestInforScreen: {
    id: '',
    dataInformation: '',
    dataResult: '',
  },
  paramsTestInClassInforScreen: {
    testFormId: '',
    classContentId: '',
    classUserId: '',
    dataInformation: '',
    dataResult: '',
    classId: '',
  },
  paramsSurveyScreen: {
    content: '',
    dataSurvey: '',
  },
  lstMenuApp: {},
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateLoadingAction: (state, { payload }) => {
      state.isLoading = payload;
    },
    updateNetWorkingAction: (state, { payload }) => {
      state.isConnected = payload;
    },
    updateShowDialogWarnAction: (state, { payload }) => {
      state.dialogWarning = payload;
    },
    updateLanguageAction: (state, { payload }) => {
      state.language = payload ?? 'vn';
    },
    updateAppColorAction: (state, { payload }) => {
      state.appColor = payload;
    },
    updateParamTestInforScreen: (state, { payload }) => {
      state.paramsTestInforScreen = payload;
    },
    updateParamTestInClassInforScreen: (state, { payload }) => {
      state.paramsTestInClassInforScreen = payload;
    },
    updateParamsSurveyScreenAction: (state, { payload }) => {
      state.paramsSurveyScreen = payload;
    },
    updateListMenuApp: (state, { payload }) => {
      state.lstMenuApp = payload;
    },
    logoutAction: (state, { payload }) => {
      state = {
        ...initialState,
        isLoading: false,
        isConnected: true,
        language: payload.language ?? 'vn',
        appColor: payload.appColor,
      };
    },
  },
  extraReducers: () => {},
});

export const {
  updateLoadingAction,
  updateNetWorkingAction,
  updateShowDialogWarnAction,
  updateLanguageAction,
  updateAppColorAction,
  updateParamTestInforScreen,
  updateParamTestInClassInforScreen,
  updateParamsSurveyScreenAction,
  updateListMenuApp,
  logoutAction,
} = globalSlice.actions;

export default globalSlice.reducer;
