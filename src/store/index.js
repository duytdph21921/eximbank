import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { createFilter } from 'redux-persist-transform-filter';
import authSlice from '@store/reducers/authSlice';
import globalSlice from '@store/reducers/globalSlice';
import logger from 'redux-logger';
import localStorage from '@utils/storage';

const reducers = combineReducers({
  auth: authSlice,
  global: globalSlice,
});

const persistConfig = {
  key: 'root',
  storage: localStorage,
  stateReconciler: autoMergeLevel2,
  transforms: [
    createFilter('auth', ['userState', 'baseURL', 'baseTagName', 'accessToken']),
    createFilter('global', ['appColor', 'language', 'lstMenuApp']),
  ],
  whiteList: ['auth', 'global'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleWares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 500,
      },
      immutableCheck: {
        warnAfter: 500,
      },
    });

    if (__DEV__) {
      middleWares.push(logger);
    }

    return middleWares;
  },
});

const persisTor = persistStore(store);

setupListeners(store.dispatch);

export { store, persisTor };
