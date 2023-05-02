import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mainPageReducer from './reducers/mainPageSlice';

const rootReducer = combineReducers({
  mainPageReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
