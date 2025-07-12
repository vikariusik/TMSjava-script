import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ImageState {
  selectedImage: string | null;
}

const initialState: ImageState = {
  selectedImage: null
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    openImageModal: (state, action: PayloadAction<string>) => {
      state.selectedImage = action.payload;
    },
    closeImageModal: (state) => {
      state.selectedImage = null;
    },
  },
});

export const { openImageModal, closeImageModal } = imageSlice.actions;
export default imageSlice.reducer;