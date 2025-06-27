import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ImageState {
  selectedImage: string | null;
  isModalOpen: boolean;
}

const initialState: ImageState = {
  selectedImage: null,
  isModalOpen: false,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    openImageModal: (state, action: PayloadAction<string>) => {
      state.selectedImage = action.payload;
      state.isModalOpen = true;
    },
    closeImageModal: (state) => {
      state.selectedImage = null;
      state.isModalOpen = false;
    },
  },
});

export const { openImageModal, closeImageModal } = imageSlice.actions;
export default imageSlice.reducer;