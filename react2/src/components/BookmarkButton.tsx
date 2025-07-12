import './BookmarkButton.css';

const BookmarkButton = ({ isBookmarked, onClick, className = '' }) => {
  return (
    <button 
      className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''} ${className}`}
      onClick={onClick}
      aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
    >
      {isBookmarked ? '★' : '☆'}
    </button>
  );
};

export default BookmarkButton;
