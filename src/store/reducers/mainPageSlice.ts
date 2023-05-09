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
    setLogin(state, action: PayloadAction<object>) {
      state.auth = action.payload;
    },
    setLogout(state) {
      state.auth = null;
    },
  },
});

export default mainPageSlice.reducer;
