import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditorStore {
  schemaURI: string;
}

const initialState: EditorStore = {
  schemaURI: localStorage.getItem('schemaURI') || 'https://rickandmortyapi.com/graphql',
};

export const EditorSlice = createSlice({
  name: 'EditorSlice',
  initialState,
  reducers: {
    setSchema(state, action: PayloadAction<string>) {
      state.schemaURI = action.payload;
      localStorage.setItem('schemaURI', state.schemaURI);
    },
  },
});

export default EditorSlice.reducer;
