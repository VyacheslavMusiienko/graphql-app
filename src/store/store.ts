import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mainPageReducer from './reducers/mainPageSlice';

const rootReducer = combineReducers({
  mainPageReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['mainPageSlice/setLogin'],
          // Ignore these field paths in all actions
          ignoredActionPaths: ['payload.timestamp'],
          // Ignore these paths in the state
          ignoredPaths: ['mainPageReducer.auth'],
        },
      }),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
