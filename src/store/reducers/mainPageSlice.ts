import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainPageState {
  example: string;
}

const initialState: MainPageState = {
  example: '',
};

export const mainPageSlice = createSlice({
  name: 'mainPageReducer',
  initialState,
  reducers: {
    exampleReducer(state, action: PayloadAction<string>) {
      state.example = action.payload;
    }
  },
});
