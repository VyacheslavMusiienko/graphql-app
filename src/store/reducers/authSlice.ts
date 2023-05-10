import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserCredential } from 'firebase/auth';

interface IAuthStore {
  user: null | UserCredential | User;
}

const initialState: IAuthStore = {
  user: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserCredential | null | User>) {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;
