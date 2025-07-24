import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, onClose }) => {
  return (
    <div className="error-message">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <p className="error-text">{message}</p>
        <div className="error-actions">
          {onRetry && (
            <button 
              onClick={onRetry} 
              className="error-btn error-retry"
            >
              Попробовать снова
            </button>
          )}
          {onClose && (
            <button 
              onClick={onClose} 
              className="error-btn error-close"
            >
              Закрыть
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
