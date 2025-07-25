# Movie Search App

React + TypeScript + Vite приложение для поиска фильмов с использованием OMDB API.

## Функциональность

- **Поиск фильмов** - поиск по названию с поддержкой пагинации
- **Детальная страница фильма** - подробная информация о фильме с постером, рейтингами и описанием
- **Фильтрация** - фильтр по типу (фильм, сериал, эпизод, игра) и году выпуска
- **Респонсивный дизайн** - адаптивная верстка для всех устройств

## Технологии

- **Frontend**: React 18, TypeScript, React Router
- **Сборка**: Vite
- **API**: OMDB API (The Open Movie Database)
- **Стилизация**: Vanilla CSS с CSS Modules

## Установка и запуск

1. Клонируйте репозиторий
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите проект в режиме разработки:
   ```bash
   npm run dev
   ```
4. Откройте http://localhost:5173 в браузере

## Сборка для продакшена

```bash
npm run build
```

## API

Приложение использует [OMDB API](http://www.omdbapi.com/) для получения информации о фильмах.
API ключ: `99ff31e8`

## Структура проекта

```
src/
├── components/          # React компоненты
│   ├── SearchBar/      # Компонент поиска
│   ├── Filters/        # Компонент фильтров
│   ├── MovieCard/      # Карточка фильма
│   ├── Pagination/     # Пагинация
│   ├── Loading/        # Индикатор загрузки
│   └── ErrorMessage/   # Компонент ошибки
├── pages/              # Страницы приложения
│   ├── SearchPage/     # Главная страница поиска
│   └── MovieDetailsPage/ # Страница деталей фильма
├── hooks/              # Пользовательские хуки
│   ├── useMovieSearch/ # Хук для поиска фильмов (Redux-совместимый)
│   ├── useMovieDetails/ # Хук для деталей фильма (RTK Query)
│   └── redux.ts        # Типизированные Redux хуки
├── store/              # Redux Store
│   ├── api/           # RTK Query API
│   │   └── omdbApi.ts # OMDB API с Axios интеграцией
│   ├── slices/        # Redux Slices
│   │   └── searchSlice.ts # Состояние поиска
│   └── index.ts       # Конфигурация store
├── types/              # TypeScript типы
│   └── movie.ts        # Типы для фильмов и API
└── App.tsx             # Главный компонент
```
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
