import { shouldShowRetryButton } from '../utils/errorHandling';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  originalError?: any; // Добавляем оригинальную ошибку для анализа
  onRetry?: () => void;
  onClose?: () => void;
}

const getErrorIcon = (message: string): string => {
  if (message.includes('не найдено') || message.includes('не найден')) {
    return '🔍';
  }
  if (message.includes('сеть') || message.includes('подключение')) {
    return '🌐';
  }
  if (message.includes('лимит') || message.includes('превышен')) {
    return '⏰';
  }
  if (message.includes('доступ') || message.includes('авторизация')) {
    return '🔒';
  }
  return '⚠️';
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, originalError, onRetry, onClose }) => {
  const showRetryButton = originalError ? shouldShowRetryButton(originalError) : true;

  return (
    <div className="error-message">
      <div className="error-content">
        <div className="error-icon">{getErrorIcon(message)}</div>
        <p className="error-text">{message}</p>
        <div className="error-actions">
          {showRetryButton && onRetry && (
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
