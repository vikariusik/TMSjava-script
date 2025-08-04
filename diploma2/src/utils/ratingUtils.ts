/**
 * Утилиты для работы с рейтингами фильмов
 */

/**
 * Возвращает цвет рейтинга в зависимости от его значения
 * @param rating - строка с рейтингом (например, "8.5")
 * @returns HEX цвет для отображения рейтинга
 */
export const getRatingColor = (rating: string): string => {
  const numRating = parseFloat(rating);
  
  if (isNaN(numRating)) {
    return '#6c757d'; // серый для неопределенных значений
  }
  
  if (numRating >= 8) return '#28a745'; // зеленый для высоких рейтингов
  if (numRating >= 6) return '#ffc107'; // желтый для средних рейтингов
  return '#dc3545'; // красный для низких рейтингов
};

/**
 * Форматирует рейтинг для отображения
 * @param rating - строка с рейтингом
 * @param maxRating - максимальное значение рейтинга (по умолчанию 10)
 * @returns отформатированная строка рейтинга
 */
export const formatRating = (rating: string, maxRating: number = 10): string => {
  if (rating === 'N/A' || !rating) {
    return 'Нет рейтинга';
  }
  
  const numRating = parseFloat(rating);
  if (isNaN(numRating)) {
    return rating;
  }
  
  return `${numRating}/${maxRating}`;
};

/**
 * Получает категорию рейтинга
 * @param rating - строка с рейтингом
 * @returns категория рейтинга
 */
export const getRatingCategory = (rating: string): 'excellent' | 'good' | 'average' | 'poor' | 'unknown' => {
  const numRating = parseFloat(rating);
  
  if (isNaN(numRating)) {
    return 'unknown';
  }
  
  if (numRating >= 8) return 'excellent';
  if (numRating >= 6) return 'good';
  if (numRating >= 4) return 'average';
  return 'poor';
};
