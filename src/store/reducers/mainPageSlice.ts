import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainPageStore {
  isLoggedIn: boolean;
}

const initialState: MainPageStore = {
  isLoggedIn: true,
};

export const mainPageSlice = createSlice({
  name: 'mainPageSlice',
  initialState,
  reducers: {
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export default mainPageSlice.reducer;
