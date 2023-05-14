import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserCredential } from 'firebase/auth';

interface IAuthStore {
  user: null | UserCredential | User;
  loading: boolean;
}

const initialState: IAuthStore = {
  user: null,
  loading: true,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserCredential | null | User>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export default authSlice.reducer;
