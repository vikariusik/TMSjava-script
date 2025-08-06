// Утилита для обработки ошибок API
export const getErrorMessage = (error: any): string => {
  // Если это RTK Query ошибка
  if (error?.data) {
    if (typeof error.data === 'string') {
      // Обрабатываем специфичные ошибки OMDB API
      if (error.data.includes('Movie not found!')) {
        return 'По вашему запросу ничего не найдено. Попробуйте изменить поисковый запрос.';
      }
      if (error.data.includes('Too many results')) {
        return 'Слишком много результатов. Уточните поисковый запрос.';
      }
      if (error.data.includes('Request limit exceeded')) {
        return 'Превышен лимит запросов. Попробуйте позже.';
      }
      return error.data;
    }
    
    if (error.data.Error) {
      const errorMsg = error.data.Error;
      if (errorMsg.includes('Movie not found!')) {
        return 'По вашему запросу ничего не найдено. Попробуйте изменить поисковый запрос.';
      }
      if (errorMsg.includes('Too many results')) {
        return 'Слишком много результатов. Уточните поисковый запрос.';
      }
      if (errorMsg.includes('Request limit exceeded')) {
        return 'Превышен лимит запросов. Попробуйте позже.';
      }
      return errorMsg;
    }
  }

  // Если это сетевая ошибка
  if (error?.status) {
    switch (error.status) {
      case 400:
        return 'Неверный запрос. Проверьте поисковые параметры.';
      case 401:
        return 'Ошибка авторизации API. Проверьте API ключ.';
      case 403:
        return 'Доступ запрещён. Проверьте права доступа к API.';
      case 404:
        return 'По вашему запросу ничего не найдено.';
      case 429:
        return 'Превышен лимит запросов. Попробуйте позже.';
      case 500:
        return 'Внутренняя ошибка сервера. Попробуйте позже.';
      case 503:
        return 'Сервис временно недоступен. Попробуйте позже.';
      default:
        return `Ошибка сети (${error.status}). Проверьте подключение к интернету.`;
    }
  }

  // Если это стандартная ошибка JavaScript
  if (error?.message) {
    const message = error.message;
    if (message.includes('Movie not found!') || message.includes('Фильмы не найдены')) {
      return 'По вашему запросу ничего не найдено. Попробуйте изменить поисковый запрос.';
    }
    if (message.includes('Network Error') || message.includes('fetch')) {
      return 'Ошибка сети. Проверьте подключение к интернету.';
    }
    return message;
  }

  // Если ошибка в виде строки
  if (typeof error === 'string') {
    if (error.includes('Movie not found!')) {
      return 'По вашему запросу ничего не найдено. Попробуйте изменить поисковый запрос.';
    }
    return error;
  }

  // Дефолтное сообщение
  return 'Произошла неожиданная ошибка. Попробуйте ещё раз.';
};

// Функция для определения, нужно ли показывать кнопку "Попробовать снова"
export const shouldShowRetryButton = (error: any): boolean => {
  // Проверяем различные варианты ошибки "Movie not found"
  if (error?.data) {
    if (typeof error.data === 'string' && error.data.includes('Movie not found!')) {
      return false;
    }
    if (error.data.Error && error.data.Error.includes('Movie not found!')) {
      return false;
    }
  }
  
  if (error?.message && (error.message.includes('Movie not found!') || error.message.includes('Фильмы не найдены'))) {
    return false;
  }
  
  if (typeof error === 'string' && error.includes('Movie not found!')) {
    return false;
  }

  // Проверяем 404 ошибки (тоже означают "не найдено")
  if (error?.status === 404) {
    return false;
  }

  // Проверяем по тексту сообщения об ошибке
  const errorMessage = getErrorMessage(error);
  if (errorMessage.includes('не найдено') || errorMessage.includes('не найден')) {
    return false;
  }

  // Для всех остальных ошибок показываем кнопку
  return true;
};

// Функция для определения иконки ошибки
export const getErrorIcon = (message: string): string => {
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
