// Тестирование функции обработки ошибок
import { getErrorMessage, shouldShowRetryButton } from '../utils/errorHandling';

// Примеры различных типов ошибок для тестирования
const testErrors = [
  // OMDB API ошибки
  { data: { Error: 'Movie not found!' } },
  { data: 'Movie not found!' },
  { data: { Error: 'Too many results.' } },
  { data: { Error: 'Request limit exceeded' } },
  
  // HTTP ошибки
  { status: 404 },
  { status: 401 },
  { status: 429 },
  { status: 500 },
  
  // Сетевые ошибки
  { message: 'Network Error' },
  { message: 'fetch failed' },
  
  // Строковые ошибки
  'Movie not found!',
  'Фильмы не найдены',
  
  // Неизвестные ошибки
  { unknown: 'error' },
  null,
  undefined
];

// Функция для демонстрации обработки ошибок
export const demonstrateErrorHandling = () => {
  console.log('=== Демонстрация обработки ошибок ===\n');
  
  testErrors.forEach((error, index) => {
    const friendlyMessage = getErrorMessage(error);
    const showRetry = shouldShowRetryButton(error);
    console.log(`Ошибка ${index + 1}:`, error);
    console.log(`Сообщение для пользователя: "${friendlyMessage}"`);
    console.log(`Показать кнопку "Попробовать снова": ${showRetry ? 'ДА' : 'НЕТ'}\n`);
  });
};

// Вызовите эту функцию в консоли браузера для тестирования:
// demonstrateErrorHandling();
