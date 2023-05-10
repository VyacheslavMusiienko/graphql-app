import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';

const rootReducer = combineReducers({
  authReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['authSlice/setLogin'],
          // Ignore these field paths in all actions
          ignoredActionPaths: ['payload.timestamp'],
          // Ignore these paths in the state
          ignoredPaths: ['authReducer.auth'],
        },
      }),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
