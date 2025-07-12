import React from 'react';
import { closeImageModal } from '../store/imageSlice';
import './ImageModal.css';
import { useAppDispatch, useAppSelector } from '../store/store';

const ImageModal: React.FC = () => {
  const { selectedImage} = useAppSelector((state) => state.image);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeImageModal());
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!selectedImage) {
    return null;
  }

  return (
    <div className="image-modal-backdrop" onClick={handleBackdropClick}>
      <div className="image-modal">
        <button className="image-modal-close" onClick={handleClose}>
          ×
        </button>
        <img src={selectedImage} alt="Preview" className="image-modal-image" />
      </div>
    </div>
  );
};

export default ImageModal;