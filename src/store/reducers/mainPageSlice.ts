import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainPageStore {
  auth: null | object;
}

const initialState: MainPageStore = {
  auth: null,
};

export const mainPageSlice = createSlice({
  name: 'mainPageSlice',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<object | null>) {
      state.auth = action.payload;
    },
  },
});

export default mainPageSlice.reducer;
