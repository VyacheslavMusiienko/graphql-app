import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthStore {
  auth: null | object;
}

const initialState: IAuthStore = {
  auth: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
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

export default authSlice.reducer;
