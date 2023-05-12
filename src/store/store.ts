import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mainPageReducer from './reducers/mainPageSlice';
import EditorReducer from './reducers/EditorSlice';

const rootReducer = combineReducers({
  mainPageReducer,
  EditorReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
